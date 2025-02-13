document.addEventListener("DOMContentLoaded", function () {
    loadOrders(); // Загружаем заказы при загрузке страницы

    // Находим кнопку очистки заказов
    let clearOrdersButton = document.querySelector(".clear-orders");
    if (clearOrdersButton) {
        clearOrdersButton.addEventListener("click", function () {
            localStorage.removeItem("sentOrders"); // Удаляем заказы из localStorage
            loadOrders(); // Перезагружаем список заказов
        });
    }
});

function loadOrders() {
    let sentOrders = JSON.parse(localStorage.getItem("sentOrders")) || [];
    let ordersList = document.getElementById("orders-list");

    ordersList.innerHTML = ""; // Очищаем контейнер заказов

    if (sentOrders.length === 0) {
        ordersList.innerHTML = "<p>Заказов пока нет...</p>";
        return;
    }

    sentOrders.forEach((order, index) => {
        let orderDiv = document.createElement("div");
        orderDiv.classList.add("order");

        let itemsHTML = order.items.map(item =>
            `<p>${item.name} – ${item.quantity} шт.</p>`
        ).join("");

        orderDiv.innerHTML = `
            <strong>Заказ №${index + 1}</strong> (${order.date})<br>
            ${itemsHTML}
            <p><strong>Комментарий:</strong> ${order.comment ? order.comment : "Без комментария"}</p>
        `;

        ordersList.appendChild(orderDiv);
    });
}