document.addEventListener("DOMContentLoaded", function () {
    loadOrders();

    let clearOrdersButton = document.querySelector(".clear-orders");
    if (clearOrdersButton) {
        clearOrdersButton.addEventListener("click", function () {
            localStorage.removeItem("orders"); // Очищаем заказы, полученные через WebSocket
            localStorage.removeItem("sentOrders"); // Очищаем локальные заказы пользователя
            loadOrders(); // Обновляем отображение
        });
    }
});

// Подключение к WebSocket серверу
const socket = new WebSocket("ws://localhost:8080");

socket.onopen = function () {
    console.log("✅ Подключено к WebSocket серверу");
};

// Обработка входящих сообщений от сервера
socket.onmessage = function (event) {
    let data = JSON.parse(event.data);

    if (data.type === "init") {
        localStorage.setItem("orders", JSON.stringify(data.orders));
    } else if (data.type === "new_order") {
        let orders = JSON.parse(localStorage.getItem("orders")) || [];
        orders.push(data.order);
        localStorage.setItem("orders", JSON.stringify(orders));
    }

    loadOrders(); // Перерисовываем заказы
};

function loadOrders() {
    let sentOrders = JSON.parse(localStorage.getItem("sentOrders")) || []; // Заказы пользователя
    let receivedOrders = JSON.parse(localStorage.getItem("orders")) || []; // Заказы через WebSocket
    let allOrders = [...sentOrders, ...receivedOrders]; // Объединяем заказы

    let ordersList = document.getElementById("orders-list");
    if (!ordersList) {
        console.error("❌ Элемент #orders-list не найден!");
        return;
    }

    ordersList.innerHTML = "";
    if (allOrders.length === 0) {
        ordersList.innerHTML = "<p style='color: white;'>Заказов пока нет...</p>";
        return;
    }

    allOrders.forEach((order, index) => {
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
