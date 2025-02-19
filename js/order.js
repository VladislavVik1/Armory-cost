document.addEventListener("DOMContentLoaded", function () {
  connectWebSocket();
  loadOrders();

  const clearOrdersButton = document.querySelector(".clear-orders");
  if (clearOrdersButton) {
    clearOrdersButton.addEventListener("click", clearOrders);
  } else {
    console.warn("❗ Кнопка очистки заказов `.clear-orders` не найдена.");
  }
});

// Глобальная переменная для WebSocket
let socket;

/**
 * Функция загрузки заказов из localStorage и отображения в элементе #orders-list
 */
function loadOrders() {
  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  const ordersList = document.getElementById("orders-list");

  if (!ordersList) {
    console.error("❌ Ошибка: элемент #orders-list не найден!");
    return;
  }

  if (orders.length === 0) {
    ordersList.innerHTML = "<p style='color: white;'>Заказов пока нет...</p>";
    return;
  }

  ordersList.innerHTML = orders
    .map((order, index) => {
      const formattedTotal = parseFloat(order.total || 0).toFixed(2);
      return `
        <div class="order">
          <strong>Заказ №${index + 1}</strong> (${order.date || "Неизвестная дата"})<br>
          ${
            Array.isArray(order.items) && order.items.length
              ? order.items
                  .map(
                    (item) => `
              <p>${item.name || "Неизвестный товар"} – ${item.quantity || 0} шт. 
              (${parseFloat(item.totalPrice || 0).toFixed(2)} $)</p>`
                  )
                  .join("")
              : "<p>Товары отсутствуют</p>"
          }
          <p><strong>Общая сумма заказа:</strong> ${formattedTotal} $</p>
          <p><strong>Комментарий:</strong> ${order.comment || "Без комментария"}</p>
        </div>
      `;
    })
    .join("");
}

/**
 * Устанавливаем соединение с WebSocket-сервером
 */
function connectWebSocket() {
  socket = new WebSocket("wss://pmk-eagles.shop:8080");

  socket.onopen = () => {
    console.log("✅ Подключено к WebSocket серверу");
    // Запрашиваем у сервера текущие заказы
    socket.send(JSON.stringify({ type: "get_orders" }));
  };

  socket.onmessage = (event) => {
    if (!event.data) {
      console.warn("⚠ Пустое сообщение от сервера, игнорируем.");
      return;
    }

    let data;
    try {
      data = JSON.parse(event.data);
    } catch (error) {
      console.error(
        "❌ Ошибка парсинга JSON от сервера:",
        error,
        "📩 Данные:",
        event.data
      );
      return;
    }

    console.log("📩 Получены данные от сервера:", data);

    if (!data || typeof data !== "object") {
      console.warn("⚠ Некорректный формат данных от сервера:", data);
      return;
    }

    // Обрабатываем тип сообщения
    switch (data.type) {
      case "init":
        if (!Array.isArray(data.orders)) {
          console.error("❌ Ошибка: `orders` не массив!", data.orders);
          return;
        }
        console.log(`📥 Загружено ${data.orders.length} заказ(ов) с сервера.`);
        if (data.orders.length === 0) {
          console.warn("⚠ Сервер отправил пустой список заказов.");
        }
        localStorage.setItem("orders", JSON.stringify(data.orders));
        loadOrders();
        break;

      case "orders_cleared":
        console.log("🗑 Все заказы были удалены сервером");
        localStorage.removeItem("orders");
        loadOrders();
        break;

      default:
        console.warn("⚠ Неизвестный тип сообщения от сервера:", data);
    }
  };

  socket.onerror = (error) => {
    console.error("⚠️ Ошибка WebSocket:", error);
  };

  socket.onclose = () => {
    console.warn("❌ Соединение с WebSocket закрыто. Переподключение через 5 сек...");
    setTimeout(connectWebSocket, 5000);
  };
}

/**
 * Функция очистки заказов – отправляет команду серверу и ждёт ответа,
 * при отсутствии ответа через 5 сек – очищает локально.
 */
function clearOrders() {
  if (!socket || socket.readyState !== WebSocket.OPEN) {
    console.warn("⚠ WebSocket не подключен! Очистка невозможна.");
    localStorage.removeItem("orders");
    loadOrders();
    alert("✅ Все заказы удалены локально.");
    return;
  }

  console.log("📡 Отправка `clear_orders` на сервер...");
  socket.send(JSON.stringify({ type: "clear_orders" }));
  console.log("📨 Команда `clear_orders` отправлена. Ожидание ответа от сервера...");

  // Устанавливаем таймаут – если сервер не ответит за 5 секунд, очищаем локально
  const clearOrdersTimeout = setTimeout(() => {
    console.warn("⏳ Сервер не ответил, очистка заказов локально.");
    localStorage.removeItem("orders");
    loadOrders();
    socket.removeEventListener("message", handleClearOrdersResponse);
  }, 5000);

  // Обработчик ответа сервера на команду очистки
  function handleClearOrdersResponse(event) {
    try {
      const data = JSON.parse(event.data);
      console.log("📩 Ответ сервера на очистку заказов:", data);

      if (data.type === "orders_cleared") {
        console.log("🗑 Все заказы успешно удалены сервером");
        clearTimeout(clearOrdersTimeout);
        localStorage.removeItem("orders");
        loadOrders();
      }
    } catch (error) {
      console.error("❌ Ошибка обработки данных WebSocket:", error);
    } finally {
      socket.removeEventListener("message", handleClearOrdersResponse);
    }
  }

  // Добавляем одноразовый слушатель для получения ответа
  socket.addEventListener("message", handleClearOrdersResponse);
}
