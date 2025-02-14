const fs = require("fs");
const https = require("https");
const WebSocket = require("ws");

// **Настройки сервера**
const FILE_PATH = "orders.json";
const SSL_CERT_PATH = "/etc/letsencrypt/live/pmk-eagles.shop/fullchain.pem";
const SSL_KEY_PATH = "/etc/letsencrypt/live/pmk-eagles.shop/privkey.pem";
const PORT = 8080;

// **Проверяем наличие SSL сертификатов**
if (!fs.existsSync(SSL_CERT_PATH) || !fs.existsSync(SSL_KEY_PATH)) {
    console.error("❌ Ошибка: SSL сертификаты не найдены!");
    process.exit(1);
}

// **Создаём HTTPS сервер**
const server = https.createServer({
    cert: fs.readFileSync(SSL_CERT_PATH),
    key: fs.readFileSync(SSL_KEY_PATH),
});

// **Функция загрузки заказов из JSON-файла**
function loadOrders() {
    if (fs.existsSync(FILE_PATH)) {
        try {
            return JSON.parse(fs.readFileSync(FILE_PATH, "utf8"));
        } catch (err) {
            console.error("❌ Ошибка загрузки orders.json:", err);
            return [];
        }
    }
    return [];
}

// **Функция сохранения заказов в JSON-файл**
function saveOrders(newOrders) {
    try {
        fs.writeFileSync(FILE_PATH, JSON.stringify(newOrders, null, 2));
    } catch (err) {
        console.error("❌ Ошибка сохранения orders.json:", err);
    }
}

// **Загружаем заказы при запуске сервера**
let orders = loadOrders();

// **Создаём WebSocket сервер (через HTTPS)**
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
    console.log("🔗 Новый клиент подключился!");

    ws.on("message", (message) => {
        try {
            let data = JSON.parse(message);
            console.log("📩 Получено сообщение от клиента:", data);

            if (data.type === "new_order") {
                console.log("📦 Новый заказ получен:", data.order);

                // ✅ Проверяем, есть ли товары в заказе
                if (!data.order.items || !Array.isArray(data.order.items) || data.order.items.length === 0) {
                    console.warn("⚠ Ошибка: Заказ не содержит товаров!");
                    return;
                }

                // ✅ Пересчитываем итоговую сумму заказа
                let totalSum = 0;
                data.order.items.forEach((item) => {
                    let itemPrice = item.totalPrice || (priceList[item.name]?.unitPrice || 0) * item.quantity;
                    totalSum += itemPrice;
                });

                data.order.total = totalSum.toFixed(2); // Форматируем сумму в 2 знака после запятой
                orders.push(data.order);
                saveOrders(orders);

                console.log("✅ Итоговая сумма заказа:", data.order.total);

                // ✅ Проверяем, рассылаются ли данные
                console.log("📡 Рассылка обновленного списка заказов...");
                broadcastOrders();
            }
        } catch (error) {
            console.error("❌ Ошибка обработки сообщения:", error);
        }
    });
});


// **Функция рассылки всех заказов всем клиентам**
function broadcastOrders() {
    broadcastMessage({ type: "init", orders });
}

// **Функция для отправки сообщений всем клиентам**
function broadcastMessage(message) {
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(message));
        }
    });
}

// **Запуск HTTPS WebSocket сервера**
server.listen(PORT, () => {
    console.log(`✅ WebSocket сервер работает на wss://pmk-eagles.shop:${PORT}`);
});
