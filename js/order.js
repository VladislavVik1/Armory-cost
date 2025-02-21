document.addEventListener("DOMContentLoaded", function () {
    const ordersContainer = document.getElementById("orders-container");
    const clearOrdersBtn = document.querySelector(".clear-orders");

    if (!ordersContainer) {
        console.error("❌ Ошибка: элемент #orders-container не найден!");
        return;
    }

    // 📌 Функция для отображения заказов
    function renderOrders(orders) {
        ordersContainer.innerHTML = ""; // Очищаем контейнер перед рендерингом

        if (!Array.isArray(orders) || orders.length === 0) {
            ordersContainer.innerHTML = "<p>📭 Заказов пока нет...</p>";
            return;
        }

        orders.forEach((order, index) => {
            let orderElement = document.createElement("div");
            orderElement.classList.add("order");

            let itemsList = order.items && Array.isArray(order.items) 
                ? order.items.map(item => `<li>${item.name} - ${item.quantity} шт</li>`).join("")
                : "<li>❌ Ошибка в данных заказа</li>";

            orderElement.innerHTML = `
                <h3>📝 Заказ #${index + 1}</h3>
                <ul>${itemsList}</ul>
                <p><strong>💰 Общая сумма:</strong> ${order.totalPrice ? order.totalPrice.toFixed(2) : "Неизвестно"} $</p>
                <p><strong>💬 Комментарий:</strong> ${order.comment || "Нет комментария"}</p>
                <hr>
            `;

            ordersContainer.appendChild(orderElement);
        });
    }

    // 📌 Подключаем WebSocket к серверу
    const socket = io("https://pmk-eagles.shop:8080");


    // 🔹 Получаем все заказы при подключении
    socket.on("allOrders", (orders) => {
        console.log("📌 Получены все заказы:", orders);
        renderOrders(orders);
    });

    // 🔹 Получаем новые заказы в реальном времени
    socket.on("newOrder", (order) => {
        console.log("📌 Новый заказ:", order);
        let currentOrders = document.querySelectorAll(".order").length;
        renderOrders([...orders, order]); // Добавляем новый заказ в список
    });

    // 📌 Обработчик очистки заказов
    if (clearOrdersBtn) {
        clearOrdersBtn.addEventListener("click", function () {
            if (confirm("Вы уверены, что хотите удалить все заказы? 🚨")) {
                socket.emit("clearOrders"); // Отправляем команду на сервер
                ordersContainer.innerHTML = "<p>📭 Заказов пока нет...</p>";
            }
        });
    }
});
