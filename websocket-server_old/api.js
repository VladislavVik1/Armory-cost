const fs = require("fs");
const https = require("https");
const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");

const app = express();
const PORT_API = 3000;
const ORDERS_PATH = "/home/dakraman1232/websocket-server_old/orders.json";

// Пути к SSL-сертификатам
const SSL_CERT_PATH = "/etc/letsencrypt/live/pmk-eagles.shop/fullchain.pem";
const SSL_KEY_PATH = "/etc/letsencrypt/live/pmk-eagles.shop/privkey.pem";

// Данные удалённого сервера
const REMOTE_SERVER = "pmk-eagles.shop";
const REMOTE_USER = "dakraman1232";

<<<<<<< HEAD
// ✅ Настройки CORS
const corsOptions = {
    origin: ["https://vladislavvik1.github.io", "http://127.0.0.1:5500"],
    methods: ["GET", "POST", "OPTIONS", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
};
app.use(cors(corsOptions));
=======
// ✅ Включаем CORS для всех доменов
const corsOptions = {
    origin: "https://vladislavvik1.github.io",  // Или укажите конкретные сайты: ["https://vladislavvik1.github.io", "http://127.0.0.1:5500"]
    methods: "GET, POST, OPTIONS, DELETE",
    allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    credentials: false
};
app.use(cors(corsOptions));

// Middleware для CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://vladislavvik1.github.io");  // Или конкретный домен
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    
    if (req.method === "OPTIONS") {
        return res.status(204).send();  // Отвечаем на preflight-запросы
    }
    next();
});


// ✅ Middleware для CORS + Preflight-запросы
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

    if (req.method === "OPTIONS") {
        return res.sendStatus(204); // **Исправлено: правильный ответ для preflight-запросов**
    }
    next();
});
>>>>>>> parent of 674557e (1)

// ✅ Логирование всех запросов
app.use((req, res, next) => {
    console.log(`📡 ${req.method} → ${req.url}`);
    next();
});

<<<<<<< HEAD
// ✅ Функция безопасного парсинга JSON
function safeJSONParse(data) {
    try {
        if (!data || typeof data !== "string" || data.trim() === "") {
            throw new Error("Данные пустые или некорректные");
        }
        return JSON.parse(data);
    } catch (error) {
        console.error("❌ Ошибка парсинга JSON:", error.message);
        return null;
    }
}

// ✅ API: Получение заказов
app.get("/get-orders", (req, res) => { // 🔹 Исправлен маршрут (была ошибка)
    if (!fs.existsSync(ORDERS_PATH)) {
        console.warn("⚠ Файл orders.json не найден, создаём новый.");
        fs.writeFileSync(ORDERS_PATH, "[]", "utf8");
    }

    fs.readFile(ORDERS_PATH, "utf8", (err, data) => {
        if (err) {
            console.error("❌ Ошибка чтения orders.json:", err.message);
            return res.status(500).json({ success: false, message: "Ошибка загрузки заказов" });
        }

        const orders = safeJSONParse(data);
        if (!orders) {
            return res.status(500).json({ success: false, message: "Ошибка обработки данных заказов" });
        }

        res.json({ success: true, orders });
    });
});

// ✅ API: Очистка заказов через SSH
app.get("/clear-orders-remote", (req, res) => {
    console.log("🔄 Запрос на очистку заказов через SSH...");

    // ✅ Команда SSH для очистки заказов
    const sshCommand = `ssh -T -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null ${REMOTE_USER}@${REMOTE_SERVER} "echo '[]' | sudo tee ${ORDERS_PATH} > /dev/null"`;

    exec(sshCommand, (error, stdout, stderr) => {
        if (error) {
            console.error("❌ Ошибка при удалении заказов:", error.message);
            return res.status(500).json({ success: false, message: "Ошибка очистки заказов" });
        }
        console.log(`✅ Заказы успешно удалены.`);
        res.json({ success: true, message: "Заказы удалены на сервере" });
=======
// ✅ Проверка SSH-доступа
function checkSSHConnection(callback) {
    const checkCmd = `ssh -o BatchMode=yes -o ConnectTimeout=5 -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null ${REMOTE_USER}@${REMOTE_SERVER} exit`;
    exec(checkCmd, (error) => {
        if (error) {
            console.error("❌ Ошибка SSH-соединения:", error.message);
            callback(false);
        } else {
            console.log("✅ SSH-соединение установлено!");
            callback(true);
        }
    });
}

// ✅ Очистка заказов через SSH
app.get("/clear-orders-remote", (req, res) => {
    checkSSHConnection((isConnected) => {
        if (!isConnected) {
            return res.status(500).json({ success: false, message: "Ошибка SSH-соединения" });
        }

        const remoteCommand = `echo '[]' > ${ORDERS_PATH}`;
        const sshCommand = `ssh -o BatchMode=yes -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null ${REMOTE_USER}@${REMOTE_SERVER} "${remoteCommand}"`;

        exec(sshCommand, (error, stdout, stderr) => {
            if (error) {
                console.error("❌ Ошибка при удалении заказов:", error.message);
                return res.status(500).json({ success: false, message: "Ошибка очистки заказов" });
            }
            console.log(`✅ Заказы успешно удалены. Вывод: ${stdout}`);
            res.json({ success: true, message: "Заказы удалены на сервере" });
        });
>>>>>>> parent of 674557e (1)
    });
});

// ✅ Глобальный обработчик ошибок Express
app.use((err, req, res, next) => {
    console.error("❌ Ошибка на сервере:", err.message);
    res.status(500).json({ success: false, message: "Внутренняя ошибка сервера" });
});

// ✅ Запуск сервера (HTTPS или HTTP)
if (fs.existsSync(SSL_KEY_PATH) && fs.existsSync(SSL_CERT_PATH)) {
    const serverOptions = {
        key: fs.readFileSync(SSL_KEY_PATH),
        cert: fs.readFileSync(SSL_CERT_PATH),
    };

    const httpsServer = https.createServer(serverOptions, app);
    httpsServer.listen(PORT_API, "0.0.0.0", () => {
        console.log(`✅ HTTPS API сервер запущен на https://${REMOTE_SERVER}:${PORT_API}`);
    });
} else {
<<<<<<< HEAD
    app.listen(PORT_API, () => {
        console.warn(`⚠ SSL-сертификаты не найдены! Запуск без HTTPS.`);
=======
    app.listen(PORT_API, "0.0.0.0", () => {
>>>>>>> parent of 674557e (1)
        console.log(`✅ HTTP API сервер запущен на http://${REMOTE_SERVER}:${PORT_API}`);
    });
}
