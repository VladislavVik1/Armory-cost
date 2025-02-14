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

// **Функция загрузки заказов**
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

// **Функция сохранения заказов**
function saveOrders(newOrders) {
    try {
        fs.writeFileSync(FILE_PATH, JSON.stringify(newOrders, null, 2));
    } catch (err) {
        console.error("❌ Ошибка сохранения orders.json:", err);
    }
}

// **Загружаем заказы из файла**
let orders = loadOrders();

// **Создаём WebSocket сервер**
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
                console.log("🗑 Очистка заказов запрошена!");
                orders = []; // Очищаем локальный массив заказов
                saveOrders([]); // Удаляем заказы из файла

                // Рассылаем всем клиентам сообщение, что заказы очищены
                wss.clients.forEach(client => {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify({ type: "orders_cleared" }));
                    }
                });

                console.log("✅ Все заказы удалены на сервере!");
            }
        } catch (error) {
            console.error("❌ Ошибка обработки заказа:", error);
        }
    });

    ws.on("close", () => {
        console.log("❌ Клиент отключился.");
    });
});

// **Функция рассылки заказов всем клиентам**
function broadcastOrders() {
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ type: "init", orders }));
        }
    });
}

// **Запуск сервера**
server.listen(PORT, () => {
    console.log(`✅ WebSocket сервер работает на wss://pmk-eagles.shop:${PORT}`);
});
