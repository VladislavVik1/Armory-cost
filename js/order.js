document.addEventListener("DOMContentLoaded", function () {
    const ordersContainer = document.getElementById("orders-container");
    const clearOrdersBtn = document.querySelector(".clear-orders");

    if (!ordersContainer) {
        console.error("❌ Ошибка: элемент #orders-container не найден!");
        return;
    }

    let orders = localStorage.getItem("orders") ? JSON.parse(localStorage.getItem("orders")) : [];

    if (orders.length === 0) {
        ordersContainer.innerHTML = "<p>📭 Заказов пока нет...</p>";
        return;
    }

    orders.forEach((order, index) => {
        let orderElement = document.createElement("div");
        orderElement.classList.add("order");

        let itemsList = order.items.map(item => 
            `<li>${item.name} - ${item.quantity} шт</li>`
        ).join("");

        orderElement.innerHTML = `
            <h3>📝 Заказ #${index + 1}</h3>
            <ul>${itemsList}</ul>
            <p><strong>💰 Общая сумма:</strong> ${order.totalPrice.toFixed(2)} $</p>
            <p><strong>💬 Комментарий:</strong> ${order.comment}</p>
            <hr>
        `;

        ordersContainer.appendChild(orderElement);
    });

    if (clearOrdersBtn) {
        clearOrdersBtn.addEventListener("click", function () {
            if (confirm("Вы уверены, что хотите удалить все заказы? 🚨")) {
                localStorage.removeItem("orders");
                ordersContainer.innerHTML = "<p>📭 Заказов пока нет...</p>";
            }
        });
    }
});
