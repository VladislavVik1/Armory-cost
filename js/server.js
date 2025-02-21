const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const apiPort = 3000;  // API
const wsPort = 8080;   // WebSocket

app.use(cors({
    origin: [
        "https://vladislavvik1.github.io",
        "https://vladislavvik1.github.io/Armory-cost",
        "https://pmk-eagles.shop"
    ],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// 📌 Храним заказы в памяти (если надо — добавим БД)
let orders = [];

// 📌 API для получения заказов
app.get("/api/orders", (req, res) => {
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

// 📌 Запускаем API сервер на порту 3000
app.listen(apiPort, () => {
    console.log(`✅ API запущен на http://localhost:${apiPort}`);
});

// 📌 WebSocket сервер
const wsServer = http.createServer();
const io = new Server(wsServer, {
    cors: {
        origin: [
            "https://vladislavvik1.github.io",
            "https://vladislavvik1.github.io/Armory-cost",
            "https://pmk-eagles.shop"
        ],
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log("🔌 Клиент подключился");

    // Отправляем все заказы при подключении
    socket.emit("allOrders", orders);

    socket.on("clearOrders", () => {
        console.log("⚠ Все заказы удалены!");
        orders = [];
        io.emit("allOrders", orders);
    });

    socket.on("disconnect", () => {
        console.log("❌ Клиент отключился");
    });
});

// 📌 Запускаем WebSocket сервер
wsServer.listen(wsPort, () => {
    console.log(`✅ WebSocket сервер запущен на ws://localhost:${wsPort}`);
});
