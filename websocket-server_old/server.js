const fs = require("fs");
const https = require("https");
const WebSocket = require("ws");

const PORT = 8080;
const FILE_PATH = "./orders.json";

// Создаем HTTPS-сервер с SSL-сертификатами
const server = https.createServer({
  cert: fs.readFileSync("/etc/letsencrypt/live/pmk-eagles.shop/fullchain.pem"),
  key: fs.readFileSync("/etc/letsencrypt/live/pmk-eagles.shop/privkey.pem"),
});

const wss = new WebSocket.Server({ server });

// Загружаем заказы из файла при запуске
let orders = [];
if (fs.existsSync(FILE_PATH)) {
  try {
    const fileData = fs.readFileSync(FILE_PATH, "utf8").trim();
    orders = fileData ? JSON.parse(fileData) : [];
  } catch (error) {
    console.error("❌ Ошибка чтения orders.json:", error);
    orders = [];
  }
}

/**
 * Функция безопасного парсинга JSON.
 * Если данные пустые или некорректные, возвращает null.
 */
function safeJSONParse(data) {
  try {
    if (data == null) {
      throw new Error("Data is null or undefined");
    }
    if (Buffer.isBuffer(data)) {
      data = data.toString("utf8");
    }
    if (typeof data !== "string") {
      data = String(data);
    }
    if (!data.trim()) {
      throw new Error("Data is empty or whitespace");
    }
    return JSON.parse(data);
  } catch (error) {
    console.error("safeJSONParse error:", error.message);
    return null;
  }
}

/**
 * Функция отправки ошибки клиенту.
 */
function sendError(ws, errorMessage) {
  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({ type: "error", message: errorMessage }));
  }
}

/**
 * Функция обработки входящих сообщений от клиента.
 */
function processClientMessage(ws, message) {
  if (Buffer.isBuffer(message)) {
    message = message.toString("utf8");
  }
  
  console.log(`📩 Received message (length ${message.length}): "${message}"`);
  
  if (!message || message.trim() === "") {
    console.warn("⚠ Received an empty message, ignoring.");
    return;
  }
  
  const parsedMessage = safeJSONParse(message);
  if (parsedMessage === null) {
    sendError(ws, "Invalid JSON data");
    return;
  }
  console.log("✅ Parsed message:", parsedMessage);

  switch (parsedMessage.type) {
    case "new_order":
      orders.push(parsedMessage.order);
      fs.writeFileSync(FILE_PATH, JSON.stringify(orders, null, 2));
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ type: "new_order", order: parsedMessage.order }));
        }
      });
      console.log("📦 New order processed and saved");
      break;

    case "clear_orders":
      console.log("🗑 Received clear_orders command");
      orders = [];
      fs.writeFileSync(FILE_PATH, JSON.stringify(orders, null, 2));
      ws.send(JSON.stringify({ type: "orders_cleared" }));
      console.log("✅ orders_cleared confirmation sent");
      break;

    case "get_orders":
      ws.send(JSON.stringify({ type: "init", orders }));
      break;

    default:
      sendError(ws, "Unknown message type");
      break;
  }
}

// Обработка соединений
wss.on("connection", (ws) => {
  console.log("🔗 Новый клиент подключён!");
  
  ws.send(JSON.stringify({ type: "init", orders }));
  
  ws.on("message", (message) => {
    processClientMessage(ws, message);
  });
  
  ws.on("close", () => {
    console.log("❌ Клиент отключился.");
  });
});

// Запуск сервера
server.listen(PORT, () => {
  console.log(`✅ WebSocket сервер работает на wss://pmk-eagles.shop:${PORT}`);
});
