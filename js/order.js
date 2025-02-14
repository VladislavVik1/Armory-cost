document.addEventListener("DOMContentLoaded", function () {
    connectWebSocket();
    loadOrders();

    let clearOrdersButton = document.querySelector(".clear-orders");
    if (clearOrdersButton) {
        clearOrdersButton.addEventListener("click", function () {
            if (socket && socket.readyState === WebSocket.OPEN) {
                socket.send(JSON.stringify({ type: "clear_orders" }));
                console.log("🗑 Запрос на очистку заказов отправлен серверу");
            } else {
                console.warn("⚠ WebSocket не подключен! Очистка невозможна.");
            }
        });
    }

    let sendScreenshotButton = document.querySelector("#cart-modal button.snapshot");
    if (sendScreenshotButton) {
        sendScreenshotButton.addEventListener("click", function () {
            let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

            if (cartItems.length === 0) {
                alert("❌ Корзина пуста! Добавьте товары перед отправкой заказа.");
                return;
            }

            let now = new Date();
            let formattedDate = now.toLocaleDateString() + " " + now.toLocaleTimeString();

            let totalPriceElement = document.getElementById("total-price");
            let totalPrice = totalPriceElement ? parseFloat(totalPriceElement.textContent.replace(/\D/g, '')) : 0;

            let commentInput = document.getElementById("order-comment");
            let commentText = commentInput ? commentInput.value.trim() : "Без комментария";

            let newOrder = {
                type: "new_order",
                order: {
                    date: formattedDate,
                    items: cartItems,
                    total: totalPrice.toFixed(2),
                    comment: commentText
                }
            };

            if (socket && socket.readyState === WebSocket.OPEN) {
                socket.send(JSON.stringify(newOrder));
                console.log("📡 Заказ отправлен через WebSocket:", newOrder);
            } else {
                console.warn("⚠ WebSocket не подключен! Заказ сохранён локально.");
                let storedOrders = JSON.parse(localStorage.getItem("sentOrders")) || [];
                storedOrders.push(newOrder.order);
                localStorage.setItem("sentOrders", JSON.stringify(storedOrders));
            }

            alert("📦 Заказ успешно отправлен!");

            localStorage.removeItem("cart");
            window.location.href = "orders.html";
        });
    } else {
        console.warn("❗ Кнопка отправки заказа `.snapshot` не найдена.");
    }
});

// **Глобальная переменная для WebSocket**
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
                localStorage.setItem("orders", JSON.stringify(data.orders));
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
        console.log("❌ Соединение с WebSocket сервером закрыто.");
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




document.addEventListener("DOMContentLoaded", function () {
    let clearOrdersButton = document.querySelector(".clear-orders");
    if (clearOrdersButton) {
        clearOrdersButton.addEventListener("click", function () {
            if (socket && socket.readyState === WebSocket.OPEN) {
                socket.send(JSON.stringify({ type: "clear_orders" }));
                console.log("🗑 Запрос на очистку заказов отправлен серверу");

                // Таймер на случай, если сервер не отвечает
                setTimeout(() => {
                    console.warn("⏳ Сервер не ответил, очистка локально.");
                    localStorage.removeItem("orders");
                    loadOrders();
                }, 5000);
            } else {
                console.warn("⚠ WebSocket не подключен! Очистка локально.");
                localStorage.removeItem("orders");
                loadOrders();
            }
        });
    }
});
