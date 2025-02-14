document.addEventListener("DOMContentLoaded", function () {
    connectWebSocket();
    loadOrders();

    let clearOrdersButton = document.querySelector(".clear-orders");
    if (clearOrdersButton) {
        clearOrdersButton.addEventListener("click", function () {
            localStorage.removeItem("orders");
            loadOrders();
        });
    }
});

// Глобальная переменная для WebSocket
let socket;

// Функция подключения к WebSocket
function connectWebSocket() {
    socket = new WebSocket("wss://pmk-eagles.shop:8080");

    socket.onopen = function () {
        console.log("✅ Подключено к WebSocket серверу");
        socket.send(JSON.stringify({ type: "get_orders" })); // Запрашиваем заказы у сервера
    };

    socket.onmessage = function (event) {
        try {
            let data = JSON.parse(event.data);
            console.log("📩 Получены данные с сервера:", data);

            if (data.type === "init") {
                localStorage.setItem("orders", JSON.stringify(data.orders));
                loadOrders();
            } else if (data.type === "new_order") {
                let orders = JSON.parse(localStorage.getItem("orders")) || [];
                orders.push(data.order);
                localStorage.setItem("orders", JSON.stringify(orders));
                loadOrders(); // Обновляем заказы на странице
            }
        } catch (error) {
            console.error("❌ Ошибка обработки данных WebSocket:", error);
        }
    };

    socket.onerror = function (error) {
        console.error("⚠️ Ошибка WebSocket:", error);
    };

    socket.onclose = function () {
        console.log("❌ Соединение с WebSocket сервером закрыто.");
        setTimeout(connectWebSocket, 5000); // Переподключение через 5 секунд
    };
}

// Функция загрузки заказов
function loadOrders() {
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    let ordersList = document.getElementById("orders-list");

    if (!ordersList) {
        console.error("❌ Ошибка: элемент #orders-list не найден!");
        return;
    }

    ordersList.innerHTML = "";
    if (orders.length === 0) {
        ordersList.innerHTML = "<p style='color: white;'>Заказов пока нет...</p>";
        return;
    }

    orders.forEach((order, index) => {
        let orderDiv = document.createElement("div");
        orderDiv.classList.add("order");

        let itemsHTML = order.items.map(item =>
            `<p>${item.name} – ${item.quantity} шт.</p>`
        ).join("");

        let totalPrice = order.total ? `${order.total} $` : "Сумма не указана";

        orderDiv.innerHTML = `
            <strong>Заказ №${index + 1}</strong> (${order.date})<br>
            ${itemsHTML}
            <p><strong>Общая сумма заказа:</strong> ${totalPrice}</p>
        `;

        ordersList.appendChild(orderDiv);
    });
}
