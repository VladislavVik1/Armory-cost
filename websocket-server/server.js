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

// **Очистка хранилища заказов**
function clearOrdersOnServer() {
    console.log("🗑 Очистка хранилища заказов на сервере...");
    fs.writeFileSync(FILE_PATH, "[]"); // Перезаписываем файл пустым массивом
    console.log("✅ Хранилище заказов очищено!");
}

// **Загружаем заказы при запуске**
let orders = loadOrders();

// **Создаём WebSocket сервер**
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
    console.log("🔗 Новый клиент подключился!");

    // Отправляем клиенту текущие заказы
    ws.send(JSON.stringify({ type: "init", orders: orders }));

    ws.on("message", (message) => {
        try {
            let data = JSON.parse(message);
            console.log("📩 Получено сообщение от клиента:", JSON.stringify(data, null, 2));

            if (data.type === "new_order") {
                console.log("📦 Новый заказ получен:", JSON.stringify(data.order, null, 2));

                let totalSum = data.order.items.reduce((sum, item) => sum + parseFloat(item.totalPrice || 0), 0);
                data.order.total = totalSum.toFixed(2);

                orders.push(data.order);
                saveOrders(orders);

                console.log("✅ Итоговая сумма заказа:", data.order.total);
                broadcastOrders();
            } 
            else if (data.type === "clear_orders") {
                console.log("🗑 Получен запрос на очистку заказов!");

                // **Очищаем хранилище заказов**
                clearOrdersOnServer();
                orders = [];

                console.log("✅ Все заказы успешно удалены!");

                // Отправляем подтверждение клиенту
                ws.send(JSON.stringify({ type: "orders_cleared" }));

                // Рассылаем обновленный список заказов
                broadcastOrders();
            }
        } catch (error) {
            console.error("❌ Ошибка обработки сообщения:", error);
        }
    });
});

// **Функция рассылки всех заказов**
function broadcastOrders() {
    let message = JSON.stringify({ type: "init", orders: orders });
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    });
}

// **Запуск WebSocket сервера**
server.listen(PORT, () => {
    console.log(`✅ WebSocket сервер работает на wss://pmk-eagles.shop:${PORT}`);
});
