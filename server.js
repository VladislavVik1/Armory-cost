const fs = require('fs');
const https = require('https');
const WebSocket = require('ws');

// Настройки сервера
const PORT = 8080;
const FILE_PATH = "orders.json"; // Файл для хранения заказов

// Загружаем SSL-сертификаты
const server = https.createServer({
    cert: fs.readFileSync('/etc/letsencrypt/live/pmk-eagles.shop/fullchain.pem'),
    key: fs.readFileSync('/etc/letsencrypt/live/pmk-eagles.shop/privkey.pem')
});

// Создаём WebSocket-сервер поверх HTTPS
const wss = new WebSocket.Server({ server });

// Загружаем заказы из файла при запуске сервера
let orders = [];
if (fs.existsSync(FILE_PATH)) {
    orders = JSON.parse(fs.readFileSync(FILE_PATH, "utf8"));
}

ws.on("message", (message) => {
      console.log("📩 Получено сообщение от клиента:", message);
    try {
        let order = JSON.parse(message);
        
        if (order.type === "new_order") {
            // Добавляем заказ в массив
            orders.push(order.order);

            // Сохраняем в файл
            fs.writeFileSync(FILE_PATH, JSON.stringify(orders, null, 2));

            // Рассылаем новый заказ всем клиентам
            wss.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify({ type: "new_order", order: order.order }));
                }
            });

            console.log("📦 Новый заказ получен и сохранён!");
        } 
        
        // ✨ Добавляем обработку команды "clear_orders"
        else if (order.type === "clear_orders") {
            console.log("🗑 Получена команда очистки заказов!");

            // Очищаем массив заказов
            
            orders = [];

            // Очищаем файл
            console.log("📂 Проверяем путь к файлу:", FILE_PATH);
            if (!fs.existsSync(FILE_PATH)) {
             console.error("❌ Файл orders.json НЕ найден!");
                } else {
                    console.log("✅ Файл найден. Записываем данные...");
                 fs.writeFileSync(FILE_PATH, JSON.stringify(orders, null, 2));
                }



            // Уведомляем всех клиентов, что заказы очищены
            wss.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify({ type: "orders_cleared" }));
                }
            });

            console.log("✅ Заказы очищены и сохранены.");
        }
    } catch (error) {
        console.error("❌ Ошибка обработки заказа:", error);
    }
});


// Запускаем сервер
server.listen(PORT, () => {
    console.log(`✅ WebSocket сервер работает на wss://pmk-eagles.shop:${PORT}`);
});