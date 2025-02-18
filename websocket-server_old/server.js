const fs = require("fs");
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
function saveOrdersToFile() {
  fs.writeFile(FILE_PATH, JSON.stringify(orders, null, 2), "utf8", (err) => {
    if (err) {
      console.error("❌ Ошибка записи в orders.json:", err);
    } else {
      console.log("✅ Заказы сохранены в orders.json.");
    }
  });
}

// 🔹 Обработка сообщений от клиентов
function processClientMessage(ws, message) {
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

        console.log("📦 Новый заказ получен.");
        orders.push(parsedMessage.order);
        saveOrdersToFile();

        // 🔹 Оповещаем всех подключённых клиентов о новом заказе
        broadcastToClients({ type: "init", orders });
        break;

    case "get_orders":
    console.log("📋 Запрос заказов от клиента...");
    console.log("📦 Текущий список заказов на сервере:", JSON.stringify(orders, null, 2)); // 🔍 Лог для проверки
    ws.send(JSON.stringify({ type: "init", orders }));
    break;


      case "clear_orders":
        console.log("🗑 Очистка всех заказов...");
        orders = [];
        saveOrdersToFile();

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
  ws.send(JSON.stringify({ type: "init", orders }));

  ws.on("message", (message) => processClientMessage(ws, message));
  ws.on("close", () => console.log("❌ Клиент отключился."));
  ws.on("error", (error) => console.error("❌ Ошибка WebSocket:", error));
});

// 🔹 Запуск сервера
server.listen(PORT, () => {
  console.log(`✅ WebSocket сервер работает на wss://pmk-eagles.shop:${PORT}`);
});
