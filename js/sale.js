document.addEventListener("DOMContentLoaded", function () {
  // Задаем текущую версию дефолтных данных.
  // Если вы изменяете дефолтные значения, увеличьте эту версию (например, "1.1" → "1.2")
  const currentVersion = "1.1";

  // Дефолтный массив товаров для продажи (если в localStorage нет данных или версия отличается)
  const defaultSaleItems = [
    { name: "Каска 6Б27М Флора(ЕСС)", available: 2, price: 100, selected: 0 },
    { name: "Физраствор для в/в вливания(500мл)", available: 1, price: 200, selected: 0 },
    { name: "Физраствор для в/в вливания(250мл)", available: 11, price: 100, selected: 0 },
    { name: "Морфин в пневмошприце", available: 56, price: 150, selected: 0 },
    { name: "Повязка", available: 61, price: 30, selected: 0 }
  ];

  // Функция загрузки данных из localStorage или использование дефолтных значений
  function loadSaleItems() {
    const storedVersion = localStorage.getItem("saleItemsVersion");
    const storedSaleItems = localStorage.getItem("saleItems");
    if (storedSaleItems && storedVersion === currentVersion) {
      return JSON.parse(storedSaleItems);
    } else {
      // Если данных нет или версия не совпадает, обновляем localStorage новыми значениями
      localStorage.setItem("saleItemsVersion", currentVersion);
      localStorage.setItem("saleItems", JSON.stringify(defaultSaleItems));
      // Возвращаем копию дефолтных значений
      return defaultSaleItems.slice();
    }
  }

  // Глобальный массив saleItems – либо из localStorage, либо дефолтный
  let saleItems = loadSaleItems();

  // Функция сохранения saleItems в localStorage вместе с версией
  function saveSaleItems() {
    localStorage.setItem("saleItemsVersion", currentVersion);
    localStorage.setItem("saleItems", JSON.stringify(saleItems));
  }

  // Функция для пересчета и отображения общей стоимости выбранных товаров
  function updateTotal() {
    let total = 0;
    saleItems.forEach(item => {
      total += item.selected * item.price;
    });
    let totalEl = document.getElementById("sale-total");
    if (totalEl) {
      totalEl.textContent = "Общая стоимость: $" + total;
    }
  }

  // Функция, которая формирует HTML-контент модального окна "Продажа"
  function renderSaleModal() {
    let content = '<h2>Продажа</h2>';
    content += `<table class="sale-table" border="1" cellspacing="0" cellpadding="5">
      <thead>
        <tr>
          <th>Товар</th>
          <th>Доступно</th>
          <th>Цена ($)</th>
          <th>Выбрано</th>
          <th>Управление</th>
        </tr>
      </thead>
      <tbody>`;
    saleItems.forEach((item, index) => {
      content += `<tr data-index="${index}">
          <td>${item.name}</td>
          <td>${item.available}</td>
          <td>${item.price}</td>
          <td class="selected-qty">${item.selected}</td>
          <td>
            <button class="plus">+</button>
            <button class="minus">-</button>
            <button class="remove">/</button>
          </td>
        </tr>`;
    });
    content += "</tbody></table>";
    // Добавляем блок для общей стоимости выбранных товаров
    content += `<div id="sale-total" style="margin-top:10px; font-weight:bold;"></div>`;
    
    document.getElementById("modal-body").innerHTML = content;

    // Назначаем обработчики для кнопок управления для каждой строки
    const rows = document.querySelectorAll(".sale-table tbody tr");
    rows.forEach((row) => {
      const index = row.getAttribute("data-index");
      const plusBtn = row.querySelector(".plus");
      const minusBtn = row.querySelector(".minus");
      const removeBtn = row.querySelector(".remove");
      const selectedQtyCell = row.querySelector(".selected-qty");

      plusBtn.addEventListener("click", function () {
        if (saleItems[index].selected < saleItems[index].available) {
          saleItems[index].selected++;
          selectedQtyCell.textContent = saleItems[index].selected;
          updateTotal();
          saveSaleItems();
        }
      });

      minusBtn.addEventListener("click", function () {
        if (saleItems[index].selected > 0) {
          saleItems[index].selected--;
          selectedQtyCell.textContent = saleItems[index].selected;
          updateTotal();
          saveSaleItems();
        }
      });

      removeBtn.addEventListener("click", function () {
        saleItems[index].selected = 0;
        selectedQtyCell.textContent = saleItems[index].selected;
        updateTotal();
        saveSaleItems();
      });
    });

    // Обновляем общую стоимость после отрисовки таблицы
    updateTotal();
  }

  // Функция открытия модального окна "Продажа"
  function openSaleModal() {
    renderSaleModal();
    document.getElementById("modal").style.display = "flex";
  }

  // Назначаем обработчик для кнопки "Продажа"
  const saleButton = document.querySelector(".sale-button");
  if (saleButton) {
    saleButton.addEventListener("click", openSaleModal);
  }
});