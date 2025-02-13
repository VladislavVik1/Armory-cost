document.addEventListener("DOMContentLoaded", function () {
    loadOrders(); 

    let clearOrdersButton = document.querySelector(".clear-orders");
    if (clearOrdersButton) {
        clearOrdersButton.addEventListener("click", function () {
            localStorage.removeItem("sentOrders");
            loadOrders();
        });
    }
});

function loadOrders() {
    let sentOrders = JSON.parse(localStorage.getItem("sentOrders")) || [];
    let ordersList = document.getElementById("orders-list");

    ordersList.innerHTML = "";

    if (sentOrders.length === 0) {
        ordersList.innerHTML = "<p>Заказов пока нет...</p>";
        return;
    }

    sentOrders.forEach((order, index) => {
        let orderDiv = document.createElement("div");
        orderDiv.classList.add("order");

        let itemsHTML = order.items.map(item =>
            `<p>${item.name} – ${item.quantity} шт.</p>` // Убрали цену
        ).join("");

        let totalPrice = order.total ? `${order.total} $` : "Сумма не указана";

        orderDiv.innerHTML = `
            <strong>Заказ №${index + 1}</strong> (${order.date})<br>
            ${itemsHTML}
            <p><strong>Комментарий:</strong> ${order.comment ? order.comment : "Без комментария"}</p>
            <p><strong>Общая сумма заказа:</strong> ${totalPrice}</p>
        `;

        ordersList.appendChild(orderDiv);
    });
}

document.addEventListener("DOMContentLoaded", loadOrders);