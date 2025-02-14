document.addEventListener("DOMContentLoaded", function () {
    connectWebSocket();
    loadOrders();

    let clearOrdersButton = document.querySelector(".clear-orders");
    if (clearOrdersButton) {
        clearOrdersButton.addEventListener("click", function () {
            if (socket && socket.readyState === WebSocket.OPEN) {
                console.log("📡 Отправка `clear_orders` на сервер...");
                socket.send(JSON.stringify({ type: "clear_orders" }));

                // Ожидание ответа от сервера (если не приходит — очищаем локально)
                let clearOrdersTimeout = setTimeout(() => {
                    console.warn("⏳ Сервер не ответил, очистка заказов локально.");
                    localStorage.removeItem("orders");
                    loadOrders();
                }, 5000); // Ждём 5 секунд

                // Обработка ответа сервера
                socket.onmessage = function (event) {
                    try {
                        let data = JSON.parse(event.data);
                        console.log("📩 Получены данные от сервера:", data);

                        if (data.type === "orders_cleared") {
                            console.log("🗑 Все заказы были удалены сервером");
                            clearTimeout(clearOrdersTimeout);
                            localStorage.removeItem("orders");
                            loadOrders();
                        }
                    } catch (error) {
                        console.error("❌ Ошибка обработки данных WebSocket:", error);
                    }
                };
            } else {
                console.warn("⚠ WebSocket не подключен! Очистка невозможна.");
                localStorage.removeItem("orders");
                loadOrders();
                alert("✅ Все заказы удалены локально.");
            }
        });
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
        </div>
    `).join("") : "<p style='color: white;'>Заказов пока нет...</p>";
}
