const fs = require("fs");
const https = require("https");
const express = require("express");
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

/**
 * Проверка доступности SSH-соединения перед выполнением команд
 */
function checkSSHConnection(callback) {
    const checkCmd = `ssh -o BatchMode=yes -o ConnectTimeout=5 -o StrictHostKeyChecking=no ${REMOTE_USER}@${REMOTE_SERVER} exit`;
    exec(checkCmd, (error) => {
        if (error) {
            console.error("❌ Ошибка SSH-соединения. Проверьте доступ по SSH:", error);
            callback(false);
        } else {
            console.log("✅ SSH-соединение успешно установлено!");
            callback(true);
        }
    });
}

/**
 * Эндпоинт для очистки заказов на удалённом сервере через SSH
 */
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
                return res.status(500).json({ success: false, message: "Ошибка очистки заказов" });
            }
            console.log(`✅ Заказы успешно удалены. Вывод: ${stdout}`);
            res.json({ success: true, message: "Заказы удалены на сервере" });
        });
    });
});

/**
 * Запуск HTTPS API сервера
 */
const serverOptions = {
    key: fs.readFileSync(SSL_KEY_PATH),
    cert: fs.readFileSync(SSL_CERT_PATH),
};

const httpsServer = https.createServer(serverOptions, app);

httpsServer.listen(PORT_API, () => {
    console.log(`✅ HTTPS API сервер запущен на https://${REMOTE_SERVER}:${PORT_API}`);
});

/**
 * Очистка заказов при старте API
 */
exec(`echo '[]' > ${ORDERS_PATH}`, (error) => {
    if (error) {
        console.error("❌ Ошибка при очистке orders.json:", error);
    } else {
        console.log("✅ orders.json очищен при запуске API!");
    }
});
