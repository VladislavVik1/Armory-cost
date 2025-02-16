const fs = require("fs");
const https = require("https");
const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");

const app = express();
const PORT_API = 3000;

// Пути к SSL-сертификатам
const SSL_CERT_PATH = "/etc/letsencrypt/live/pmk-eagles.shop/fullchain.pem";
const SSL_KEY_PATH = "/etc/letsencrypt/live/pmk-eagles.shop/privkey.pem";

// Данные удалённого сервера
const REMOTE_SERVER = "pmk-eagles.shop";
const REMOTE_USER = "dakraman1232";
const ORDERS_PATH = "/home/dakraman1232/websocket-server_old/orders.json";

// ✅ Включаем CORS для всех маршрутов
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

// ✅ Добавляем middleware для CORS-заголовков
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    if (req.method === "OPTIONS") {
        return res.sendStatus(204);
    }
    next();
});

// ✅ Проверка SSH-доступа
function checkSSHConnection(callback) {
    const checkCmd = `ssh -o BatchMode=yes -o ConnectTimeout=5 -o StrictHostKeyChecking=no ${REMOTE_USER}@${REMOTE_SERVER} exit`;
    exec(checkCmd, (error) => {
        if (error) {
            console.error("❌ Ошибка SSH-соединения:", error);
            callback(false);
        } else {
            console.log("✅ SSH-соединение успешно установлено!");
            callback(true);
        }
    });
}

// ✅ Эндпоинт очистки заказов через SSH
app.get("/clear-orders-remote", (req, res) => {
    checkSSHConnection((isConnected) => {
        if (!isConnected) {
            return res.status(500).json({ success: false, message: "Ошибка SSH-соединения" });
        }

        const remoteCommand = `echo '[]' > ${ORDERS_PATH}`;
        const sshCommand = `ssh -o BatchMode=yes -o StrictHostKeyChecking=no ${REMOTE_USER}@${REMOTE_SERVER} "${remoteCommand}"`;

        exec(sshCommand, (error, stdout, stderr) => {
            if (error) {
                console.error("❌ Ошибка при удалении заказов на сервере:", error);
                console.error("🔸 stderr:", stderr);
                return res.status(500).json({ success: false, message: "Ошибка очистки заказов" });
            }
            console.log(`✅ Заказы успешно удалены. Вывод: ${stdout}`);
            res.json({ success: true, message: "Заказы удалены на сервере" });
        });
    });
});

// ✅ Глобальный обработчик ошибок Express
app.use((err, req, res, next) => {
    console.error("❌ Ошибка на сервере:", err);
    res.status(500).json({ success: false, message: "Внутренняя ошибка сервера" });
});

// ✅ Загружаем SSL-сертификаты
let serverOptions;
try {
    serverOptions = {
        key: fs.readFileSync(SSL_KEY_PATH),
        cert: fs.readFileSync(SSL_CERT_PATH),
    };
} catch (error) {
    console.error("❌ Ошибка загрузки SSL-сертификатов:", error);
    process.exit(1);
}

// ✅ Запуск HTTPS API сервера
const httpsServer = https.createServer(serverOptions, app);

httpsServer.listen(PORT_API, () => {
    console.log(`✅ HTTPS API сервер запущен на https://${REMOTE_SERVER}:${PORT_API}`);
});

// ✅ Очистка заказов при старте API
exec(`echo '[]' > ${ORDERS_PATH}`, (error) => {
    if (error) {
        console.error("❌ Ошибка при очистке orders.json:", error);
    } else {
        console.log("✅ orders.json очищен при запуске API!");
    }
});
