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
    res.header("Access-Control-Allow-Origin", "*");  // Или конкретный домен
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

// ✅ Логирование всех запросов
app.use((req, res, next) => {
    console.log(`📡 ${req.method} → ${req.url}`);
    next();
});

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
    });
});

// ✅ Глобальный обработчик ошибок Express
app.use((err, req, res, next) => {
    console.error("❌ Ошибка на сервере:", err.message);
    res.status(500).json({ success: false, message: "Внутренняя ошибка сервера" });
});

// ✅ Загружаем SSL-сертификаты (и проверяем их наличие)
let serverOptions;
try {
    if (fs.existsSync(SSL_KEY_PATH) && fs.existsSync(SSL_CERT_PATH)) {
        serverOptions = {
            key: fs.readFileSync(SSL_KEY_PATH),
            cert: fs.readFileSync(SSL_CERT_PATH),
        };
    } else {
        console.error("❌ Ошибка: SSL-сертификаты не найдены! Запуск только на HTTP.");
        serverOptions = null;
    }
} catch (error) {
    console.error("❌ Ошибка загрузки SSL-сертификатов:", error.message);
    serverOptions = null;
}

// ✅ Запуск HTTPS API сервера
if (serverOptions) {
    const httpsServer = https.createServer(serverOptions, app);
    httpsServer.listen(PORT_API, "0.0.0.0", () => {
        console.log(`✅ HTTPS API сервер запущен на https://${REMOTE_SERVER}:${PORT_API}`);
    });
} else {
    app.listen(PORT_API, "0.0.0.0", () => {
        console.log(`✅ HTTP API сервер запущен на http://${REMOTE_SERVER}:${PORT_API}`);
    });
}

// ✅ Очистка заказов при запуске API
if (fs.existsSync(ORDERS_PATH)) {
    exec(`echo '[]' > ${ORDERS_PATH}`, (error) => {
        if (error) {
            console.error("❌ Ошибка при очистке orders.json:", error.message);
        } else {
            console.log("✅ orders.json очищен при запуске API!");
        }
    });
} else {
    console.warn("⚠ Файл orders.json не найден, создаём новый.");
    fs.writeFileSync(ORDERS_PATH, "[]");
}
