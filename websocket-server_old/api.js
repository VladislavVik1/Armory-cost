const express = require("express");
const { exec } = require("child_process");
const fs = require("fs");
const app = express();

const PORT_API = 3000;
const REMOTE_SERVER = "pmk-eagles.shop";
const REMOTE_USER = "dakraman1232";
const ORDERS_PATH = "/home/dakraman1232/websocket-server_old/orders.json";

// Опции для HTTPS-сервера
const options = {
  cert: fs.readFileSync("/etc/letsencrypt/live/pmk-eagles.shop/fullchain.pem"),
  key: fs.readFileSync("/etc/letsencrypt/live/pmk-eagles.shop/privkey.pem")
};

// Функция проверки доступности SSH-соединения (неинтерактивный режим, таймаут 5 сек)
function checkSSHConnection(callback) {
  const checkCmd = `ssh -o BatchMode=yes -o ConnectTimeout=5 -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null ${REMOTE_USER}@${REMOTE_SERVER} exit`;
  exec(checkCmd, (error) => {
    if (error) {
      console.error("❌ Ошибка SSH-соединения. Проверьте доступ по SSH:");
      console.error(error);
      callback(false);
    } else {
      console.log("✅ SSH-соединение успешно установлено!");
      callback(true);
    }
  });
}

// Эндпоинт для удаления заказов на удалённом сервере через SSH
app.get("/clear-orders-remote", (req, res) => {
  checkSSHConnection((isConnected) => {
    if (!isConnected) {
      return res.status(500).json({ success: false, message: "Ошибка SSH-соединения" });
    }
    const remoteCommand = `echo '[]' > ${ORDERS_PATH}`;
    const sshCommand = `ssh -o BatchMode=yes -o ConnectTimeout=10 -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null ${REMOTE_USER}@${REMOTE_SERVER} "${remoteCommand}"`;
    
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

// Запуск HTTPS API сервера
https.createServer(options, app).listen(PORT_API, "0.0.0.0", () => {
  console.log(`✅ Express API сервер запущен на https://${REMOTE_SERVER}:${PORT_API}`);
});

// Очистка заказов при старте API
exec(`echo '[]' > ${ORDERS_PATH}`, (error) => {
  if (error) {
    console.error("❌ Ошибка при очистке orders.json:", error);
  } else {
    console.log("✅ orders.json очищен при запуске API!");
  }
});
