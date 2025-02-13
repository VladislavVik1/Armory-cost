const WebSocket = require("ws");
const fs = require("fs");

const PORT = 8080;
const FILE_PATH = "orders.json"; // Файл для хранения заказов

const server = new WebSocket.Server({ port: PORT });

// Загружаем заказы из файла при запуске сервера
let orders = [];
if (fs.existsSync(FILE_PATH)) {
    orders = JSON.parse(fs.readFileSync(FILE_PATH, "utf8"));
}

server.on("connection", (ws) => {
    console.log("🔗 Новый клиент подключен!");

    // Отправляем текущие заказы новому клиенту
    ws.send(JSON.stringify({ type: "init", orders }));

    // Обрабатываем входящие сообщения
    ws.on("message", (message) => {
        try {
            let order = JSON.parse(message);
            if (order.type === "new_order") {
                // Добавляем заказ в массив
                orders.push(order.order);

                // Сохраняем в файл
                fs.writeFileSync(FILE_PATH, JSON.stringify(orders, null, 2));

                // Рассылаем заказ всем подключенным клиентам
                server.clients.forEach((client) => {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify({ type: "new_order", order: order.order }));
                    }
                });

                console.log("📦 Новый заказ получен и сохранен!");
            }
        } catch (error) {
            console.error("❌ Ошибка обработки заказа:", error);
        }
    });

    ws.on("close", () => {
        console.log("❌ Клиент отключился.");
    });
});

console.log(`✅ WebSocket сервер запущен на порту ${PORT}`);