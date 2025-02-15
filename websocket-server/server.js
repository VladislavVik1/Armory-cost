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

    // Отправляем клиенту текущие заказы
    ws.send(JSON.stringify({ type: "init", orders }));

    ws.on("message", (message) => {
        try {
            let data = JSON.parse(message);
            console.log("📩 Получено сообщение от клиента:", JSON.stringify(data, null, 2));

            if (data.type === "new_order") {
                console.log("📦 Новый заказ получен:", JSON.stringify(data.order, null, 2));

                // ✅ Проверяем наличие totalPrice у всех товаров
                let totalSum = data.order.items.reduce((sum, item) => {
                    let itemTotal = parseFloat(item.totalPrice) || 0; // Убедимся, что это число
                    return sum + itemTotal;
                }, 0);

                data.order.total = totalSum.toFixed(2); // Сохранение итоговой суммы

                console.log("✅ Итоговая сумма заказа (исправлена):", data.order.total);

                orders.push(data.order);
                saveOrders(orders);

                // 📡 Рассылка обновленного списка заказов
                broadcastOrders();
            }
        } catch (error) {
            console.error("❌ Ошибка обработки сообщения:", error);
        }
    });
});


// ✅ Теперь `broadcastOrders` отправляет заказы ВСЕМ клиентам!
function broadcastOrders() {
    let message = JSON.stringify({ type: "init", orders });
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    });
}




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
