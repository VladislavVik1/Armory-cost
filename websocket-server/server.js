const fs = require('fs');
const https = require('https');
const WebSocket = require('ws');

const PORT = 8080;
const FILE_PATH = "orders.json"; // Файл для хранения заказов

// Загружаем SSL-сертификаты
const sslOptions = {
    cert: fs.readFileSync('/etc/letsencrypt/live/pmk-eagles.shop/fullchain.pem'),
    key: fs.readFileSync('/etc/letsencrypt/live/pmk-eagles.shop/privkey.pem')
};

// Создаём HTTPS-сервер
const server = https.createServer(sslOptions);

// Создаём WebSocket-сервер поверх HTTPS
const wss = new WebSocket.Server({ server });

// Загружаем заказы из файла при запуске сервера
let orders = [];
if (fs.existsSync(FILE_PATH)) {
    try {
        orders = JSON.parse(fs.readFileSync(FILE_PATH, "utf8"));
    } catch (error) {
        console.error("❌ Ошибка чтения orders.json:", error);
        orders = []; // Если ошибка — создаём пустой массив
    }
}

// Обрабатываем подключения клиентов
wss.on("connection", (ws) => {
    console.log("🔗 Новый клиент подключён!");

    // Отправляем текущие заказы новому клиенту
    ws.send(JSON.stringify({ type: "init", orders }));

    // Обрабатываем входящие сообщения
    ws.on("message", (message) => {
        try {
            let data = JSON.parse(message);
            if (data.type === "new_order") {
                // Добавляем заказ в массив
                orders.push(data.order);

                // Сохраняем в файл
                fs.writeFileSync(FILE_PATH, JSON.stringify(orders, null, 2));

                // Рассылаем новый заказ всем клиентам
                wss.clients.forEach((client) => {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify({ type: "new_order", order: data.order }));
                    }
                });

                console.log("📦 Новый заказ получен и сохранён!");
            }
        } catch (error) {
            console.error("❌ Ошибка обработки заказа:", error);
        }
    });

    ws.on("close", () => {
        console.log("❌ Клиент отключился.");
    });
});

// Запускаем сервер
server.listen(PORT, () => {
    console.log(`✅ WebSocket сервер запущен на wss://pmk-eagles.shop:${PORT}`);
});

// Обработка ошибок сервера
server.on("error", (error) => {
    console.error("❌ Ошибка сервера:", error);
});
