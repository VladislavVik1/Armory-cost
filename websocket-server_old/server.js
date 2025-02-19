const fs = require("fs").promises;
const https = require("https");
const WebSocket = require("ws");

// 🔹 Настройки сервера
const PORT = 8080;
const CERT_PATH = "/etc/letsencrypt/live/pmk-eagles.shop/fullchain.pem";
const KEY_PATH = "/etc/letsencrypt/live/pmk-eagles.shop/privkey.pem";
const FILE_PATH = "/home/dakraman1232/websocket-server_old/orders.json";

// 🔹 Проверяем наличие SSL-сертификатов перед запуском
if (!fs.existsSync(CERT_PATH) || !fs.existsSync(KEY_PATH)) {
  console.error("❌ Ошибка: SSL-сертификаты не найдены!");
  process.exit(1);
}

// 🔹 Создаём HTTPS-сервер
const server = https.createServer({
  cert: fs.readFileSync(CERT_PATH),
  key: fs.readFileSync(KEY_PATH),
});

// 🔹 Создаём WebSocket-сервер
const wss = new WebSocket.Server({ server });

// 🔹 Загружаем заказы из файла (безопасно)
app.post("/get-orders", (req, res) => {
    let newOrder = req.body;
    console.log("📩 Получен новый заказ:", newOrder);

    if (!newOrder || !newOrder.order || !Array.isArray(newOrder.order.items)) {
        return res.status(400).json({ success: false, message: "Некорректные данные" });
    }

    // Загружаем текущие заказы
    let orders = [];
    if (fs.existsSync(ORDERS_PATH)) {
        orders = JSON.parse(fs.readFileSync(ORDERS_PATH, "utf8")) || [];
    }

    // Добавляем новый заказ
    orders.push(newOrder.order);
    fs.writeFileSync(ORDERS_PATH, JSON.stringify(orders, null, 2), "utf8");

    console.log("✅ Заказ сохранён!");
    res.json({ success: true, message: "Заказ принят!" });
});


// 🔹 Функция безопасного парсинга JSON
function safeJSONParse(data) {
  try {
    return JSON.parse(data);
  } catch (error) {
    console.error("❌ Ошибка парсинга JSON:", error.message);
    return null;
  }
}

// 🔹 Функция сохранения заказов в файл
// Функция сохранения заказов в файл
function saveOrdersToFile(orders) {
    console.log("📝 Сохранение заказов в файл:", orders);

    fs.readFile(FILE_PATH, "utf8", (err, data) => {
        let existingOrders = [];

        if (!err && data) {
            try {
                existingOrders = JSON.parse(data);
                if (!Array.isArray(existingOrders)) {
                    existingOrders = [];
                }
            } catch (parseError) {
                console.error("⚠ Ошибка парсинга orders.json, создаём новый файл:", parseError);
                existingOrders = [];
            }
        } else if (err && err.code !== "ENOENT") {
            console.error("❌ Ошибка чтения файла orders.json:", err);
            return;
        }

        // Добавляем новый заказ
        existingOrders.push(...orders);

        console.log("📦 Итоговый массив заказов перед записью:", JSON.stringify(existingOrders, null, 2));

        // Записываем данные обратно в файл
        fs.writeFile(FILE_PATH, JSON.stringify(existingOrders, null, 2), "utf8", (writeErr) => {
            if (writeErr) {
                console.error("❌ Ошибка записи в orders.json:", writeErr);
            } else {
                console.log("✅ Заказы успешно сохранены в orders.json.");
            }
        });
    });
}




// 🔹 Обработка сообщений от клиентов
async function processClientMessage(ws, message) {
  try {
    if (!message || typeof message !== "string" || message.trim() === "") {
      console.warn("⚠ Получено пустое сообщение, игнорируем.");
      return;
    }

    console.log(`📩 Получено сообщение: "${message}"`);
    const parsedMessage = safeJSONParse(message);
    if (!parsedMessage || typeof parsedMessage !== "object") {
      ws.send(JSON.stringify({ type: "error", message: "Invalid JSON" }));
      return;
    }

    switch (parsedMessage.type) {
      case "new_order":
        if (!parsedMessage.order || typeof parsedMessage.order !== "object" || !Array.isArray(parsedMessage.order.items)) {
          ws.send(JSON.stringify({ type: "error", message: "Invalid order data" }));
          console.error("❌ Ошибка: некорректный заказ!", parsedMessage);
          return;
        }

        console.log("📦 Новый заказ получен:", parsedMessage.order);

        // ✅ Добавляем заказ в массив
        orders.push(parsedMessage.order);
        await saveOrdersToFile(orders); // ✅ Теперь ждём, пока заказы сохранятся

        // 🔹 Оповещаем всех клиентов о новом заказе
        broadcastToClients({ type: "init", orders });
        break;

      case "get_orders":
    console.log("📋 Запрос заказов от клиента...");

    fs.readFile(FILE_PATH, "utf8", (err, data) => {
        if (err) {
            console.error("❌ Ошибка чтения orders.json:", err);
            ws.send(JSON.stringify({ type: "error", message: "Ошибка загрузки заказов" }));
            return;
        }

        let loadedOrders = [];
        try {
            loadedOrders = JSON.parse(data);
            if (!Array.isArray(loadedOrders)) {
                loadedOrders = [];
            }
        } catch (parseError) {
            console.error("⚠ Ошибка парсинга orders.json:", parseError);
        }

        console.log("📦 Отправляем заказы клиенту:", JSON.stringify(loadedOrders, null, 2));
        ws.send(JSON.stringify({ type: "init", orders: loadedOrders }));
    });
    break;


      case "clear_orders":
        console.log("🗑 Очистка всех заказов...");
        orders = [];
        await saveOrdersToFile(orders);

        // 🔹 Оповещаем всех клиентов об очистке
        broadcastToClients({ type: "orders_cleared" });
        break;

      default:
        ws.send(JSON.stringify({ type: "error", message: "Unknown message type" }));
    }
  } catch (error) {
    console.error("❌ Ошибка обработки сообщения:", error.message);
  }
}



// 🔹 Функция рассылки сообщений всем подключённым клиентам
function broadcastToClients(data) {
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
}

// 🔹 Обработка подключений WebSocket
wss.on("connection", (ws, req) => {
  console.log("🔗 Новый клиент подключён!");

  // Опционально проверяем Origin
  const origin = req.headers.origin || "неизвестный";
  console.log(`🌐 Origin клиента: ${origin}`);

  // Отправляем клиенту текущие заказы
  console.log("📤 Отправка заказов клиенту:", orders);
ws.send(JSON.stringify({ type: "init", orders }));

  ws.on("message", (message) => processClientMessage(ws, message));
  ws.on("close", () => console.log("❌ Клиент отключился."));
  ws.on("error", (error) => console.error("❌ Ошибка WebSocket:", error));
});

// 🔹 Запуск сервера
server.listen(PORT, () => {
  console.log(`✅ WebSocket сервер работает на wss://pmk-eagles.shop:${PORT}`);
});
