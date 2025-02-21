const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["https://vladislavvik1.github.io", "https://pmk-eagles.shop"],
        methods: ["GET", "POST"]
    }
});

const PORT = 3000;
const WS_PORT = 8080;

// 📌 Храним заказы в памяти (если надо – добавим БД)
let orders = [];

app.use(cors({
    origin: ["https://vladislavvik1.github.io", "https://pmk-eagles.shop"],
    methods: "GET, POST",
    allowedHeaders: "Content-Type, Authorization"
}));
app.use(express.json());

// 📌 API для получения заказов
app.get("/api/orders", (req, res) => {
    console.log("📌 Отправляем заказы:", orders);
    res.json({ message: "API работает!", orders });
});

// 📌 API для создания нового заказа
app.post("/api/orders", (req, res) => {
    const newOrder = {
        id: orders.length + 1,
        items: req.body.items || [],
        totalPrice: req.body.totalPrice || 0,
        comment: req.body.comment || "Без комментария",
        createdAt: new Date().toISOString()
    };

    orders.push(newOrder);
    console.log("📌 Новый заказ:", newOrder);

    // 🔹 Отправляем заказ всем клиентам через WebSocket
    io.emit("newOrder", newOrder);

    res.status(201).json({ message: "Заказ успешно создан", order: newOrder });
});

// 📌 Запускаем API сервер
server.listen(PORT, () => {
    console.log(`✅ API запущен на http://localhost:${PORT}`);
});

// 📌 WebSocket сервер
const wsServer = http.createServer();
const ioWs = new Server(wsServer, {
    cors: {
        origin: ["https://vladislavvik1.github.io", "https://pmk-eagles.shop"],
        methods: ["GET", "POST"]
    }
});

ioWs.on("connection", (socket) => {
    console.log("🔌 WebSocket клиент подключился");

    // Отправляем все заказы при подключении
    socket.emit("allOrders", orders);

    socket.on("clearOrders", () => {
        console.log("⚠ Все заказы удалены!");
        orders = [];
        ioWs.emit("allOrders", orders);
    });

    socket.on("disconnect", () => {
        console.log("❌ Клиент отключился");
    });
});

// 📌 Запускаем WebSocket сервер
wsServer.listen(WS_PORT, () => {
    console.log(`✅ WebSocket сервер запущен на ws://localhost:${WS_PORT}`);
});
