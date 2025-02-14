const fs = require("fs");
const https = require("https");
const WebSocket = require("ws");

// **Настройки сервера**
const FILE_PATH = "orders.json";
const SSL_CERT_PATH = "/etc/letsencrypt/live/pmk-eagles.shop/fullchain.pem";
const SSL_KEY_PATH = "/etc/letsencrypt/live/pmk-eagles.shop/privkey.pem";
const PORT = 8080;

// **Проверяем, существуют ли SSL сертификаты**
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
    console.log("🔗 Новый клиент подключён!");

    // Отправка текущих заказов новому клиенту
    ws.send(JSON.stringify({ type: "init", orders }));

    ws.on("message", (message) => {
        try {
            let data = JSON.parse(message);

            if (data.type === "new_order") {
                console.log("📩 Получен новый заказ:", data.order);
                orders.push(data.order);
                saveOrders(orders);
                broadcastOrders();
            } else if (data.type === "clear_orders") {
                console.log("🗑 Запрос на очистку заказов получен!");

                // Очищаем заказы в памяти и файле
                orders = [];
                saveOrders([]);

                // Рассылаем всем клиентам, что заказы очищены
                broadcastMessage({ type: "orders_cleared" });

                console.log("✅ Все заказы удалены на сервере!");
            }
        } catch (error) {
            console.error("❌ Ошибка обработки сообщения:", error);
        }
    });

    ws.on("close", () => {
        console.log("❌ Клиент отключился.");
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
