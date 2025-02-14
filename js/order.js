// order.js

document.addEventListener("DOMContentLoaded", function () {
    connectWebSocket();
    loadOrders();

    // Обработчик для кнопки очистки заказов
    const clearOrdersButton = document.querySelector(".clear-orders");
    if (clearOrdersButton) {
        clearOrdersButton.addEventListener("click", function () {
            if (socket && socket.readyState === WebSocket.OPEN) {
                console.log("📡 Отправка `clear_orders` на сервер...");
                socket.send(JSON.stringify({ type: "clear_orders" }));
                
                // Если сервер не ответит в течение 5 секунд — очистка локально
                const clearOrdersTimeout = setTimeout(() => {
                    console.warn("⏳ Сервер не ответил, очистка заказов локально.");
                    localStorage.removeItem("orders");
                    loadOrders();
                }, 5000);
            } else {
                console.warn("⚠ WebSocket не подключен! Очистка невозможна.");
                localStorage.removeItem("orders");
                loadOrders();
                alert("✅ Все заказы удалены локально.");
            }
        });
    } else {
        console.warn("❗ Кнопка очистки заказов (.clear-orders) не найдена.");
    }
});

// Глобальная переменная WebSocket
let socket;

function connectWebSocket() {
    socket = new WebSocket("wss://pmk-eagles.shop:8080");

    socket.onopen = function () {
        console.log("✅ Подключено к WebSocket серверу");
        socket.send(JSON.stringify({ type: "get_orders" }));
    };

    socket.onmessage = function (event) {
        try {
            let data = JSON.parse(event.data);
            console.log("📩 Получены данные с сервера:", data);

            if (data.type === "init") {
                localStorage.setItem("orders", JSON.stringify(data.orders || []));
                loadOrders();
            } else if (data.type === "new_order") {
                let orders = JSON.parse(localStorage.getItem("orders")) || [];
                orders.push(data.order);
                localStorage.setItem("orders", JSON.stringify(orders));
                loadOrders();
            } else if (data.type === "orders_cleared") {
                console.log("🗑 Все заказы удалены сервером");
                localStorage.removeItem("orders");
                loadOrders();
            }
        } catch (error) {
            console.error("❌ Ошибка обработки данных WebSocket:", error);
        }
    };

    socket.onerror = function (error) {
        console.error("⚠️ Ошибка WebSocket:", error);
    };

    socket.onclose = function () {
        console.log("❌ Соединение с WebSocket сервером закрыто. Переподключение...");
        setTimeout(connectWebSocket, 5000);
    };
}

function loadOrders() {
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    const ordersList = document.getElementById("orders-list");
    if (!ordersList) {
        console.error("❌ Ошибка: элемент #orders-list не найден!");
        return;
    }

    if (orders.length === 0) {
        ordersList.innerHTML = "<p style='color: white;'>Заказов пока нет...</p>";
    } else {
        ordersList.innerHTML = orders.map((order, index) => `
            <div class="order">
                <strong>Заказ №${index + 1}</strong> (${order.date})<br>
                ${order.items.map(item => `<p>${item.name} – ${item.quantity} шт.</p>`).join("")}
                <p><strong>Общая сумма заказа:</strong> ${order.total} $</p>
            </div>
        `).join("");
    }

    console.log(`✅ Обновлен список заказов: ${orders.length} заказ(ов) загружено.`);
}
