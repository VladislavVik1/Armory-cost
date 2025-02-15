const fs = require("fs");
const https = require("https");
const WebSocket = require("ws");

// **Настройки сервера**
const FILE_PATH = "orders.json";
const SSL_CERT_PATH = "/etc/letsencrypt/live/pmk-eagles.shop/fullchain.pem";
const SSL_KEY_PATH = "/etc/letsencrypt/live/pmk-eagles.shop/privkey.pem";
const PORT = 8080;

// **Создаём HTTPS сервер**
const server = https.createServer({
    cert: fs.readFileSync(SSL_CERT_PATH),
    key: fs.readFileSync(SSL_KEY_PATH),
});

// **Функция загрузки заказов**
function loadOrders() {
    try {
        if (!fs.existsSync(FILE_PATH)) {
            fs.writeFileSync(FILE_PATH, "[]");
            return [];
        }

        let data = fs.readFileSync(FILE_PATH, "utf8").trim();
        return data ? JSON.parse(data) : [];
    } catch (err) {
        console.error("❌ Ошибка загрузки orders.json:", err);
        return [];
    }
}

// **Функция сохранения заказов**
function saveOrders(newOrders) {
    try {
        fs.writeFileSync(FILE_PATH, JSON.stringify(newOrders, null, 2));
    } catch (err) {
        console.error("❌ Ошибка сохранения orders.json:", err);
    }
}

// **Функция очистки заказов**
function clearOrdersOnServer() {
    console.log("🗑 Очистка хранилища заказов на сервере...");
    try {
        fs.writeFileSync(FILE_PATH, "[]", { encoding: "utf8", flag: "w" });
        orders = [];
        console.log("✅ Все заказы очищены!");

        // 📢 Рассылка клиентам информации о том, что заказы удалены
        broadcastMessage({ type: "orders_cleared" });
    } catch (err) {
        console.error("❌ Ошибка очистки orders.json:", err);
    }
}

// **Загружаем заказы при запуске сервера**
let orders = loadOrders();

// **Создаём WebSocket сервер**
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
                console.log("📦 Новый заказ:", JSON.stringify(data.order, null, 2));

                let totalSum = 0;
                data.order.items.forEach((item) => {
                    let itemTotal = item.totalPrice || 0;
                    totalSum += itemTotal;
                });

                data.order.total = totalSum.toFixed(2);
                orders.push(data.order);
                saveOrders(orders);

                console.log("✅ Итоговая сумма заказа:", data.order.total);

                // Подтверждение клиенту
                ws.send(JSON.stringify({ type: "order_received", total: data.order.total }));

                // 📢 Рассылаем обновленный список заказов
                broadcastOrders();
            }

            if (data.type === "clear_orders") {
                console.log("🗑 Запрос на очистку всех заказов получен!");
                clearOrdersOnServer();
            }

        } catch (error) {
            console.error("❌ Ошибка обработки сообщения:", error);
        }
    });

    // **Обработка ошибок WebSocket**
    ws.on("error", (err) => {
        console.error("⚠️ Ошибка WebSocket:", err);
    });
});

// **Функция рассылки всех заказов**
function broadcastOrders() {
    let message = JSON.stringify({ type: "init", orders });
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    });
}

// **Функция для отправки сообщений всем клиентам**
function broadcastMessage(message) {
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(message));
        }
    });
}

// **Запуск сервера**
server.listen(PORT, () => {
    console.log(`✅ WebSocket сервер работает на wss://pmk-eagles.shop:${PORT}`);
});
