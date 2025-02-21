// Объект с товарами и их ценами (здесь приведён пример, добавьте остальные по необходимости)
const priceList = {
                "АКМ весло": { "unitPrice": 500, "bulkPrice": 400 },
                "АКМС": { "unitPrice": 550, "bulkPrice": 450 },
                "АК-74": { "unitPrice": 600, "bulkPrice": 500 },
                "АКС-74Н": { "unitPrice": 650, "bulkPrice": 560 },
                "АКС-74Н-НПЗ-Планка": { "unitPrice": 750, "bulkPrice": 600 },
                "АКС-74Н(Б-13 Планка)": { "unitPrice": 800, "bulkPrice": 680 },
                "АК-74У": { "unitPrice": 450, "bulkPrice": 400 },
                "АК-74УН": { "unitPrice": 500, "bulkPrice": 450 },
                "АК103-105": { "unitPrice": 1000, "bulkPrice": 900 },
                "АК-103-105 Б13-Зенитка": { "unitPrice": 1100, "bulkPrice": 1000 },
                "ВАЛ": { "unitPrice": 900, "bulkPrice": 800 },
                "Винторез": { "unitPrice": 930, "bulkPrice": 820 },
                "М16А4 ручка транспортировки": { "unitPrice": 1000, "bulkPrice": 900 },
                "М16А4": { "unitPrice": 1050, "bulkPrice": 1000 },
                "М4А1": { "unitPrice": 1400, "bulkPrice": 1300 },
                "ФН-2000": { "unitPrice": 3000, "bulkPrice": 2400 },
                "HK G36KV": { "unitPrice": 2200, "bulkPrice": 2000 },
                "KH2002 CAMA": { "unitPrice": 2300, "bulkPrice": 2200 },
                "MK17+ ВСЕ ВАРИАЦИИ": { "unitPrice": 1900, "bulkPrice": 1800 },
                "MSX": { "unitPrice": 3000, "bulkPrice": 3000 },
    };
// Корзина (изначально пустая)
let cart = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : [];
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}
function openModal(category) {
    let content = '';
    switch (category) {
        case 'automats':
                    content = '<h2>Автоматы</h2><table><tr><th>Автомат</th><th>Цена за 1 шт $</th><th>Цена за 10 шт $</th><th>Добавить в корзину</th></tr><tr><td>АКМ весло</td><td>500</td><td>4000</td><td><button onclick="addToCart(\'АКМ весло\', 1)">Добавить 1 шт</button><button onclick="addToCart(\'АКМ весло\', 10)">Добавить 10 шт</button></td></tr><tr><td>АКМС</td><td>550</td><td>4500</td><td><button onclick="addToCart(\'АКМС\', 1)">Добавить 1 шт</button><button onclick="addToCart(\'АКМС\', 10)">Добавить 10 шт</button></td></tr><tr><td>АК-74</td><td>600</td><td>5000</td><td><button onclick="addToCart(\'АК-74\', 1)">Добавить 1 шт</button><button onclick="addToCart(\'АК-74\', 10)">Добавить 10 шт</button></td></tr><tr><td>АКС-74Н</td><td>650</td><td>5600</td><td><button onclick="addToCart(\'АКС-74Н\', 1)">Добавить 1 шт</button><button onclick="addToCart(\'АКС-74Н\', 10)">Добавить 10 шт</button></td></tr><tr><td>АКС-74Н-НПЗ-Планка</td><td>750</td><td>6000</td><td><button onclick="addToCart(\'АКС-74Н-НПЗ-Планка\', 1)">Добавить 1 шт</button><button onclick="addToCart(\'АКС-74Н-НПЗ-Планка\', 10)">Добавить 10 шт</button></td></tr><tr><td>АКС-74Н(Б-13 Планка)</td><td>800</td><td>6800</td><td><button onclick="addToCart(\'АКС-74Н(Б-13 Планка)\', 1)">Добавить 1 шт</button><button onclick="addToCart(\'АКС-74Н(Б-13 Планка)\', 10)">Добавить 10 шт</button></td></tr><tr><td>АК-74У</td><td>450</td><td>4000</td><td><button onclick="addToCart(\'АК-74У\', 1)">Добавить 1 шт</button><button onclick="addToCart(\'АК-74У\', 10)">Добавить 10 шт</button></td></tr><tr><td>АК-74УН</td><td>500</td><td>4500</td><td><button onclick="addToCart(\'АК-74УН\', 1)">Добавить 1 шт</button><button onclick="addToCart(\'АК-74УН\', 10)">Добавить 10 шт</button></td></tr><tr><td>АК103-105</td><td>1000</td><td>9000</td><td><button onclick="addToCart(\'АК103-105\', 1)">Добавить 1 шт</button><button onclick="addToCart(\'АК103-105\', 10)">Добавить 10 шт</button></td></tr><tr><td>АК-103-105 Б13-Зенитка</td><td>1100</td><td>10 000</td><td><button onclick="addToCart(\'АК-103-105 Б13-Зенитка\', 1)">Добавить 1 шт</button><button onclick="addToCart(\'АК-103-105 Б13-Зенитка\', 10)">Добавить 10 шт</button></td></tr><tr><td>ВАЛ</td><td>900</td><td>8000</td><td><button onclick="addToCart(\'ВАЛ\', 1)">Добавить 1 шт</button><button onclick="addToCart(\'ВАЛ\', 10)">Добавить 10 шт</button></td></tr><tr><td>Винторез</td><td>930</td><td>8200</td><td><button onclick="addToCart(\'Винторез\', 1)">Добавить 1 шт</button><button onclick="addToCart(\'Винторез\', 10)">Добавить 10 шт</button></td></tr><tr><td>М16А4 ручка транспортировки</td><td>1000</td><td>9000</td><td><button onclick="addToCart(\'М16А4 ручка транспортировки\', 1)">Добавить 1 шт</button><button onclick="addToCart(\'М16А4 ручка транспортировки\', 10)">Добавить 10 шт</button></td></tr><tr><td>М16А4</td><td>1050</td><td>10 000</td><td><button onclick="addToCart(\'М16А4\', 1)">Добавить 1 шт</button><button onclick="addToCart(\'М16А4\', 10)">Добавить 10 шт</button></td></tr><tr><td>М4А1</td><td>1400</td><td>13 000</td><td><button onclick="addToCart(\'М4А1\', 1)">Добавить 1 шт</button><button onclick="addToCart(\'М4А1\', 10)">Добавить 10 шт</button></td></tr><tr><td>ФН-2000</td><td>3000</td><td>24 000</td><td><button onclick="addToCart(\'ФН-2000\', 1)">Добавить 1 шт</button><button onclick="addToCart(\'ФН-2000\', 10)">Добавить 10 шт</button></td></tr><tr><td>HK G36KV</td><td>2200</td><td>20 000</td><td><button onclick="addToCart(\'HK G36KV\', 1)">Добавить 1 шт</button><button onclick="addToCart(\'HK G36KV\', 10)">Добавить 10 шт</button></td></tr><tr><td>KH2002 CAMA</td><td>2300</td><td>22 000</td><td><button onclick="addToCart(\'KH2002 CAMA\', 1)">Добавить 1 шт</button><button onclick="addToCart(\'KH2002 CAMA\', 10)">Добавить 10 шт</button></td></tr><tr><td>MK17+ ВСЕ ВАРИАЦИИ</td><td>1900</td><td>18 000</td><td><button onclick="addToCart(\'MK17+ ВСЕ ВАРИАЦИИ\', 1)">Добавить 1 шт</button><button onclick="addToCart(\'MK17+ ВСЕ ВАРИАЦИИ\', 10)">Добавить 10 шт</button></td></tr><tr><td>MSX</td><td>3000</td><td>30 000</td><td><button onclick="addToCart(\'MSX\', 1)">Добавить 1 шт</button><button onclick="addToCart(\'MSX\', 10)">Добавить 10 шт</button></td></tr></table>';
                    break;
        default:
            content = '<h2>Раздел в разработке</h2>';
    }
    document.getElementById("modal-body").innerHTML = content;
    document.getElementById("modal").style.display = 'flex';
}
function addToCart(productName, quantity) {
    if (!priceList[productName]) {
        alert("Ошибка: Товар не найден!");
        return;
    }

    let unitPrice = priceList[productName].unitPrice || 0;
    let bulkPrice = priceList[productName].bulkPrice || unitPrice;

    let bulkQuantity = Math.floor(quantity / 10);
    let remainingQuantity = quantity % 10;
    let totalPrice = (bulkQuantity * bulkPrice * 10) + (remainingQuantity * unitPrice);

    const existingProduct = cart.find(item => item.name === productName);
    if (existingProduct) {
        existingProduct.quantity += quantity;
    } else {
        cart.push({ name: productName, quantity });
    }

    saveCart();
    alert(`${productName} добавлено в корзину`);
    updateCartDisplay();
}
function updateCartDisplay() {
    const cartItemsList = document.getElementById("cart-items");
    if (!cartItemsList) {
        console.error("❌ Ошибка: элемент #cart-items не найден!");
        return;
    }

    cartItemsList.innerHTML = "";
    let totalSum = 0;

    if (!cart || cart.length === 0) {
        cartItemsList.innerHTML = "<p>🛒 Корзина пуста...</p>";
    }

    cart.forEach((item, index) => {
        if (!priceList || !priceList[item.name]) {
            console.warn(`⚠ Цена для "${item.name}" не найдена!`);
            return;
        }

        let bulkPrice = priceList[item.name]?.bulkPrice || 0;
        let unitPrice = priceList[item.name]?.unitPrice || 0;
        let bulkQuantity = Math.floor(item.quantity / 10);
        let remainingQuantity = item.quantity % 10;
        let totalPrice = (bulkQuantity * bulkPrice * 10) + (remainingQuantity * unitPrice);

        item.totalPrice = totalPrice;
        totalSum += totalPrice;

        const li = document.createElement("li");
        li.setAttribute("data-index", index);
        li.innerHTML = `
            ${item.name} (<span class="item-quantity">${item.quantity}</span> шт) – 
            <span class="item-total">${totalPrice.toFixed(2)}</span> $
            <button class="cart-plus">+</button>
            <button class="cart-minus">–</button>
            <button class="cart-remove">×</button>
        `;
        cartItemsList.appendChild(li);

        // 🔹 Обработчики событий для изменения количества
        li.querySelector(".cart-plus").addEventListener("click", function () {
            item.quantity++;
            saveCart();
            updateCartDisplay();
        });

        li.querySelector(".cart-minus").addEventListener("click", function () {
            if (item.quantity > 1) {
                item.quantity--;
            } else {
                cart.splice(index, 1);
            }
            saveCart();
            updateCartDisplay();
        });

        li.querySelector(".cart-remove").addEventListener("click", function () {
            cart.splice(index, 1);
            saveCart();
            updateCartDisplay();
        });
    });

    // 🔹 Обновление кнопки "Корзина"
    const cartButton = document.querySelector(".cart-button");
    if (cartButton) {
        cartButton.textContent = cart.length > 0 
            ? `Корзина (${cart.length} товаров, ${totalSum.toFixed(2)} $)`
            : "Корзина";
    }

    // 🔹 Обновление итоговой суммы
    const totalPriceElement = document.getElementById("total-price");
    if (totalPriceElement) {
        totalPriceElement.textContent = `Общая сумма: ${totalSum.toFixed(2)} $`;
    }
}
function openCart() {
    let cartModal = document.getElementById("cart-modal");
    if (cartModal) {
        cartModal.style.display = "block";
        updateCartDisplay();
    }
}
function closeCart() {
    let cartModal = document.getElementById("cart-modal");
    if (cartModal) {
        cartModal.style.display = "none";
    }
}
function closeModal() {
    let modal = document.getElementById("modal");
    if (modal) {
        modal.style.display = "none";
    }
}
document.addEventListener("click", function (event) {
    let modal = document.getElementById("modal");
    if (modal && event.target === modal) {
        closeModal();
    }
});
function clearCart() {
    cart = [];
    localStorage.removeItem("cart");
    updateCartDisplay();
}
function sendOrder() {
    if (cart.length === 0) {
        alert("❌ Ваша корзина пуста!");
        return;
    }

    let orderNumber = `ORD-${Date.now()}`;
    let commentElement = document.getElementById("order-comment");
    let comment = commentElement ? commentElement.value : "Без комментария";

    let order = {
        orderNumber: orderNumber,
        items: cart.map(item => ({
            name: item.name,
            quantity: item.quantity,
            totalPrice: item.quantity * (priceList[item.name]?.unitPrice || 0)
        })),
        totalPrice: cart.reduce((sum, item) => sum + (item.quantity * (priceList[item.name]?.unitPrice || 0)), 0),
        comment: comment
    };

    console.log("📌 Отправляем заказ на сервер:", order);

    fetch("https://pmk-eagles.shop/api/orders", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(order)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log("✅ Заказ успешно отправлен:", data);
        alert("✅ Заказ отправлен!");
        
        // Отправляем заказ через WebSocket
        if (socket) {
            socket.emit("newOrder", order);
            console.log("📡 Заказ отправлен через WebSocket");
        }

        clearCart();
        window.location.href = "orders.html";
    })
    .catch(error => {
        console.error("❌ Ошибка при отправке заказа:", error);
        alert("❌ Ошибка при отправке заказа, попробуйте ещё раз.");
    });
}

document.addEventListener("DOMContentLoaded", function () {
    let sendOrderBtn = document.querySelector(".snapshot");

    if (sendOrderBtn) {
        sendOrderBtn.addEventListener("click", sendOrder);
    }
});


document.addEventListener("DOMContentLoaded", function () {
    let sendOrderBtn = document.querySelector(".snapshot");

    if (sendOrderBtn) {
        sendOrderBtn.addEventListener("click", function () {
            if (cart.length === 0) {
                alert("❌ Ваша корзина пуста!");
                return;
            }

            let orderNumber = `ORD-${Date.now()}`;
            let comment = document.getElementById("order-comment").value || "Без комментария";

            let order = {
                orderNumber: orderNumber,
                items: cart.map(item => ({
                    name: item.name,
                    quantity: item.quantity,
                    totalPrice: item.quantity * (priceList[item.name]?.unitPrice || 0)
                })),
                totalPrice: cart.reduce((sum, item) => sum + (item.quantity * (priceList[item.name]?.unitPrice || 0)), 0),
                comment: comment
            };

            let orders = localStorage.getItem("orders") ? JSON.parse(localStorage.getItem("orders")) : [];
            orders.push(order);
            localStorage.setItem("orders", JSON.stringify(orders));

            clearCart();
            window.location.href = "orders.html";
        });
    }
});
fetch("https://pmk-eagles.shop/api/orders", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(order)
})
.then(response => response.json())
.then(data => {
    console.log("Заказ отправлен", data);
    clearCart();
    window.location.href = "orders.html";
});

