const fs = require('fs');
const https = require('https');
const WebSocket = require('ws');

const FILE_PATH = "orders.json";
const SSL_CERT_PATH = "/etc/letsencrypt/live/pmk-eagles.shop/fullchain.pem";
const SSL_KEY_PATH = "/etc/letsencrypt/live/pmk-eagles.shop/privkey.pem";
const PORT = 8080;

// **Проверяем сертификаты**
if (!fs.existsSync(SSL_CERT_PATH) || !fs.existsSync(SSL_KEY_PATH)) {
    console.error("❌ Ошибка: SSL сертификаты не найдены!");
    process.exit(1);
}

// **Создаём HTTPS сервер**
const server = https.createServer({
    cert: fs.readFileSync(SSL_CERT_PATH),
    key: fs.readFileSync(SSL_KEY_PATH),
});

// **Загружаем заказы из файла**
let orders = [];
if (fs.existsSync(FILE_PATH)) {
    try {
        orders = JSON.parse(fs.readFileSync(FILE_PATH, "utf8"));
    } catch (err) {
        console.error("❌ Ошибка загрузки orders.json:", err);
        orders = [];
    }
}

// **Создаём WebSocket сервер**
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
    console.log("🔗 Новый клиент подключён!");

    ws.send(JSON.stringify({ type: "init", orders }));

    ws.on("message", (message) => {
        try {
            let data = JSON.parse(message);
            
            if (data.type === "new_order") {
                console.log("📩 Получен новый заказ:", data.order);
                orders.push(data.order);
                fs.writeFileSync(FILE_PATH, JSON.stringify(orders, null, 2));
                broadcastOrders();
            } else if (data.type === "clear_orders") {
                console.log("🗑 Очистка заказов запрошена!");
                orders = [];
                fs.writeFileSync(FILE_PATH, JSON.stringify([], null, 2));

                wss.clients.forEach(client => {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify({ type: "orders_cleared" }));
                    }
                });

                console.log("✅ Все заказы очищены!");
            }
        } catch (error) {
            console.error("❌ Ошибка обработки заказа:", error);
        }
    });

    ws.on("close", () => {
        console.log("❌ Клиент отключился.");
    });
});

server.listen(PORT, () => {
    console.log(`✅ WebSocket сервер работает на wss://pmk-eagles.shop:${PORT}`);
});