const fs = require("fs");
const https = require("https");
const WebSocket = require("ws");

// **Настройки сервера**
const FILE_PATH = "orders.json";
const SSL_CERT_PATH = "/etc/letsencrypt/live/pmk-eagles.shop/fullchain.pem";
const SSL_KEY_PATH = "/etc/letsencrypt/live/pmk-eagles.shop/privkey.pem";
const PORT = 8080;

// **Проверяем наличие SSL-сертификатов**
if (!fs.existsSync(SSL_CERT_PATH) || !fs.existsSync(SSL_KEY_PATH)) {
    console.error("❌ Ошибка: SSL сертификаты не найдены! Сервер не запущен.");
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
            const fileData = fs.readFileSync(FILE_PATH, "utf8");
            return JSON.parse(fileData);
        } catch (err) {
            console.error("❌ Ошибка загрузки orders.json:", err);
            return [];
        }
    } else {
        return [];
    }
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
    console.log("🔗 Новый клиент подключён!");

    // Отправка текущих заказов новому клиенту
    ws.send(JSON.stringify({ type: "init", orders }));

    ws.on("message", (message) => {
        try {
            let data = JSON.parse(message);
            console.log("📩 Получено сообщение от клиента:", data);

            if (data.type === "new_order") {
                console.log("📦 Новый заказ:", data.order);
                orders.push(data.order);
                saveOrders(orders);
                broadcastOrders();
            } else if (data.type === "clear_orders") {
                console.log("🗑 Запрос на очистку заказов получен!");

                // Очищаем заказы
                orders = [];
                saveOrders([]);

                // Рассылаем всем клиентам, что заказы очищены
                broadcastMessage({ type: "orders_cleared" });

                console.log("✅ Все заказы успешно удалены!");
            }
        } catch (error) {
            console.error("❌ Ошибка обработки сообщения:", error);
        }
    });

    ws.on("close", () => {
        console.log("❌ Клиент отключился.");
    });
});

// **Функция рассылки обновленного списка заказов всем клиентам**
function broadcastOrders() {
    broadcastMessage({ type: "init", orders });
}

// **Функция отправки сообщения всем подключенным клиентам**
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
