document.addEventListener("DOMContentLoaded", function () {
    connectWebSocket();
    loadOrders();

    let clearOrdersButton = document.querySelector(".clear-orders");
    if (clearOrdersButton) {
        clearOrdersButton.addEventListener("click", clearOrders);
    } else {
        console.warn("❗ Кнопка очистки заказов `.clear-orders` не найдена.");
    }
});

// **Глобальная переменная WebSocket**
let socket;

function connectWebSocket() {
    socket = new WebSocket("wss://pmk-eagles.shop:8080");

    socket.onopen = function () {
        console.log("✅ Подключено к WebSocket серверу");
        socket.send(JSON.stringify({ type: "get_orders" })); // Запрос заказов у сервера
    };

    socket.onmessage = function (event) {
        try {
            let data = JSON.parse(event.data);
            console.log("📩 Получены данные от сервера:", data);

            if (data.type === "init" && Array.isArray(data.orders)) {
                console.log("📥 Заказы успешно загружены с сервера");
                localStorage.setItem("orders", JSON.stringify(data.orders));
                loadOrders();
            } else if (data.type === "orders_cleared") {
                console.log("🗑 Все заказы были удалены сервером");
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
        console.log("❌ Соединение с WebSocket закрыто. Переподключение...");
        setTimeout(connectWebSocket, 5000);
    };
}

// **Функция очистки всех заказов**
function clearOrders() {
    if (socket && socket.readyState === WebSocket.OPEN) {
        console.log("📡 Отправка `clear_orders` на сервер...");
        socket.send(JSON.stringify({ type: "clear_orders" }));

        let clearOrdersTimeout = setTimeout(() => {
            console.warn("⏳ Сервер не ответил, очистка заказов локально.");
            localStorage.removeItem("orders");
            loadOrders();
        }, 5000);

        function handleClearOrdersResponse(event) {
            try {
                let data = JSON.parse(event.data);
                console.log("📩 Ответ сервера на очистку заказов:", data);

                if (data.type === "orders_cleared") {
                    console.log("🗑 Все заказы успешно удалены сервером");
                    clearTimeout(clearOrdersTimeout);
                    localStorage.removeItem("orders");
                    loadOrders();
                    socket.removeEventListener("message", handleClearOrdersResponse);
                }
            } catch (error) {
                console.error("❌ Ошибка обработки данных WebSocket:", error);
            }
        }

        socket.addEventListener("message", handleClearOrdersResponse);
    } else {
        console.warn("⚠ WebSocket не подключен! Очистка невозможна.");
        localStorage.removeItem("orders");
        loadOrders();
        alert("✅ Все заказы удалены локально.");
    }
}

// **Функция загрузки заказов**
function loadOrders() {
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    let ordersList = document.getElementById("orders-list");

    if (!ordersList) {
        console.error("❌ Ошибка: элемент #orders-list не найден!");
        return;
    }

    ordersList.innerHTML = orders.length ? orders.map((order, index) => `
        <div class="order">
            <strong>Заказ №${index + 1}</strong> (${order.date})<br>
            ${order.items.map(item => `<p>${item.name} – ${item.quantity} шт.</p>`).join("")}
            <p><strong>Общая сумма заказа:</strong> ${order.total} $</p>
            <p><strong>Комментарий:</strong> ${order.comment || "Без комментария"}</p>
        </div>
    `).join("") : "<p style='color: white;'>Заказов пока нет...</p>";
}
