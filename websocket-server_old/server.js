const fs = require("fs");
const fsp = fs.promises;
const https = require("https");
const express = require("express");
const WebSocket = require("ws");
const path = require("path");

// 🔹 Настройки сервера и файлов
const PORT = 8080;
const CERT_PATH = "/etc/letsencrypt/live/pmk-eagles.shop/fullchain.pem";
const KEY_PATH = "/etc/letsencrypt/live/pmk-eagles.shop/privkey.pem";
const FILE_PATH = "/home/dakraman1232/websocket-server_old/orders.json";

// 🔹 Проверяем наличие SSL-сертификатов (синхронно)
if (!fs.existsSync(CERT_PATH) || !fs.existsSync(KEY_PATH)) {
  console.error("❌ Ошибка: SSL-сертификаты не найдены!");
  process.exit(1);
}

// 🔹 Создаём Express-приложение и подключаем парсинг JSON
const app = express();
app.use(express.json());

// 🔹 Функция для обеспечения существования каталога
async function ensureDirectoryExists(dir) {
  try {
    await fsp.mkdir(dir, { recursive: true });
    console.log(`✅ Каталог ${dir} существует или создан.`);
  } catch (err) {
    console.error(`❌ Ошибка создания каталога ${dir}:`, err);
  }
}

// 🔹 Функция для обеспечения существования файла orders.json
async function ensureOrdersFileExists() {
  try {
    await fsp.access(FILE_PATH);
  } catch (err) {
    if (err.code === 'ENOENT') {
      await fsp.writeFile(FILE_PATH, "[]", "utf8");
      console.log("ℹ Файл заказов не найден, создан новый пустой файл.");
    } else {
      console.error("❌ Ошибка доступа к orders.json:", err);
    }
  }
}

// 🔹 Глобальная переменная для хранения заказов
let orders = [];

// 🔹 Загружаем заказы из файла при старте сервера
(async () => {
  const dirPath = path.dirname(FILE_PATH);
  await ensureDirectoryExists(dirPath);
  await ensureOrdersFileExists();

  try {
    const data = await fsp.readFile(FILE_PATH, "utf8");
    orders = JSON.parse(data);
    if (!Array.isArray(orders)) {
      orders = [];
    }
    console.log("✅ Загружены заказы из файла:", orders);
  } catch (err) {
    console.error("❌ Ошибка загрузки заказов:", err);
    orders = [];
  }
})();

// 🔹 HTTP‑эндпоинт для приёма нового заказа (POST /get-orders)
app.post("/get-orders", async (req, res) => {
  const newOrder = req.body;
  console.log("📩 Получен новый заказ:", newOrder);

  if (!newOrder || !newOrder.order || !Array.isArray(newOrder.order.items)) {
    return res.status(400).json({ success: false, message: "Некорректные данные" });
  }

  // Добавляем заказ в глобальный массив
  orders.push(newOrder.order);

  try {
    await fsp.writeFile(FILE_PATH, JSON.stringify(orders, null, 2), "utf8");
    console.log("✅ Заказ сохранён!");
    res.json({ success: true, message: "Заказ принят!" });
  } catch (err) {
    console.error("❌ Ошибка записи в orders.json:", err);
    res.status(500).json({ success: false, message: "Ошибка сохранения заказа" });
  }
});

// 🔹 Создаём HTTPS‑сервер с использованием Express-приложения
const server = https.createServer(
  {
    cert: fs.readFileSync(CERT_PATH),
    key: fs.readFileSync(KEY_PATH),
  },
  app
);

// 🔹 Создаём WebSocket‑сервер на базе HTTPS‑сервера
const wss = new WebSocket.Server({ server });

// 🔹 Функция безопасного парсинга JSON
function safeJSONParse(data) {
  try {
    return JSON.parse(data);
  } catch (error) {
    console.error("❌ Ошибка парсинга JSON:", error.message);
    return null;
  }
}

// 🔹 Функция сохранения заказов в файл (перезаписываем весь массив)
async function saveOrdersToFile(ordersToSave) {
  console.log("📝 Сохранение заказов в файл:", ordersToSave);
  try {
    await fsp.writeFile(FILE_PATH, JSON.stringify(ordersToSave, null, 2), "utf8");
    console.log("✅ Заказы успешно сохранены в orders.json.");
  } catch (err) {
    console.error("❌ Ошибка записи в orders.json:", err);
  }
}

// 🔹 Обработка сообщений от клиентов по WebSocket
async function processClientMessage(ws, message) {
  try {
   
    console.log(`📩 Получено сообщение: "${message}"`);
    const parsedMessage = safeJSONParse(message);
    if (!parsedMessage || typeof parsedMessage !== "object") {
      ws.send(JSON.stringify({ type: "error", message: "Invalid JSON" }));
      return;
    }

    switch (parsedMessage.type) {
      case "new_order":
        if (
          !parsedMessage.order ||
          typeof parsedMessage.order !== "object" ||
          !Array.isArray(parsedMessage.order.items)
        ) {
          ws.send(JSON.stringify({ type: "error", message: "Invalid order data" }));
          console.error("❌ Ошибка: некорректный заказ!", parsedMessage);
          return;
        }

        console.log("📦 Новый заказ получен:", parsedMessage.order);
        orders.push(parsedMessage.order);
        await saveOrdersToFile(orders);
        broadcastToClients({ type: "init", orders });
        break;

      case "get_orders":
        console.log("📋 Запрос заказов от клиента...");
        try {
          const data = await fsp.readFile(FILE_PATH, "utf8");
          let loadedOrders = JSON.parse(data);
          if (!Array.isArray(loadedOrders)) {
            loadedOrders = [];
          }
          console.log("📦 Отправляем заказы клиенту:", JSON.stringify(loadedOrders, null, 2));
          ws.send(JSON.stringify({ type: "init", orders: loadedOrders }));
        } catch (err) {
          console.error("❌ Ошибка чтения orders.json:", err);
          ws.send(JSON.stringify({ type: "error", message: "Ошибка загрузки заказов" }));
        }
        break;

      case "clear_orders":
        console.log("🗑 Очистка всех заказов...");
        orders = [];
        await saveOrdersToFile(orders);
        broadcastToClients({ type: "orders_cleared" });
        break;

      default:
        ws.send(JSON.stringify({ type: "error", message: "Unknown message type" }));
    }
     if (!message || typeof message !== "string" || message.trim() === "") {
      console.warn("⚠ Получено пустое сообщение, игнорируем.");
      return;
    }

  } catch (error) {
    console.error("❌ Ошибка обработки сообщения:", error.message);
  }
}

// 🔹 Функция рассылки сообщений всем подключённым клиентам
function broadcastToClients(data) {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
}

// 🔹 Обработка подключений WebSocket
wss.on("connection", (ws, req) => {
  console.log("🔗 Новый клиент подключён!");
  const origin = req.headers.origin || "неизвестный";
  console.log(`🌐 Origin клиента: ${origin}`);

  // Отправляем клиенту текущие заказы
  console.log("📤 Отправка заказов клиенту:", orders);
  ws.send(JSON.stringify({ type: "init", orders }));

  ws.on("message", (message) => processClientMessage(ws, message));
  ws.on("close", () => console.log("❌ Клиент отключился."));
  ws.on("error", (error) => console.error("❌ Ошибка WebSocket:", error));
});

// 🔹 Запуск HTTPS-сервера (для HTTP и WebSocket)
server.listen(PORT, () => {
  console.log(`✅ WebSocket сервер работает на wss://pmk-eagles.shop:${PORT}`);
});
