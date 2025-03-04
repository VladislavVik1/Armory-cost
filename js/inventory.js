document.addEventListener("DOMContentLoaded", function () {
    const inventoryButton = document.getElementById("open-inventory");
    const inventoryModal = document.getElementById("inventory-modal");
    const inventoryList = document.getElementById("inventory-list");
    const closeModal = document.querySelector(".close");

    const inventoryItems = [
        { name: "Повязка", quantity: 15 },
        { name: "Давящая повящка", quantity: 17 },
        { name: "Тампонирующая повязка", quantity: 10 },
        { name: "Турникет", quantity: 12 },
        { name: "Обезболивающее", quantity: 5 },
        { name: "Адреналин", quantity: 3 },
        { name: "Пакет с кровью (250)", quantity: 1 },
        { name: "Пакет с кровью (500)", quantity: 2 },
        { name: "Пакет с кровью (1000)", quantity: 3 },
        { name: "Шина", quantity: 7 },
        { name: "Мешки для трупов", quantity: 14 },
        { name: "Магазины 5.56 М855", quantity: 35 },
        { name: "Магазины 7.62*54 7Н1", quantity: 2 },
        { name: "Магазины 12.7", quantity: 3 },
        { name: "Магазины .435", quantity: 1 },
        { name: "Магазины .338", quantity: 2 },        
        { name: "Магазины 5.45 (45 патр)", quantity: 2 },
        { name: "Магазины 5.45 (30 патр)", quantity: 4 },
        { name: "РПГ-7 ОГ", quantity: 1 },
        { name: "РПГ-7 ПГ", quantity: 2 },
        { name: "РПГ-7 ВР", quantity: 1 },
        { name: "Хаммер", quantity: 1 },
        { name: "Логистические Грузовики", quantity: 2 },
        { name: "Юрпи", quantity: 1 },
        { name: "РПГ-7", quantity: 1 },
        { name: "РШГ", quantity: 1 },
        { name: "РПГ-26", quantity: 2 },
        { name: "МПРЛ", quantity: 1 },
        { name: "Нлав", quantity: 0 },
        { name: "М2 Браунинг", quantity: 1 },
        { name: "Комплекты бронежилетов, формы, касок, рюкзаков", quantity: 12 }
    ];

    inventoryButton.addEventListener("click", function () {
        inventoryList.innerHTML = ""; 
        inventoryItems.forEach(item => {
            const row = document.createElement("tr");
            row.innerHTML = `<td>${item.name}</td><td>${item.quantity}</td>`;
            inventoryList.appendChild(row);
        });
        inventoryModal.style.display = "flex";
    });


    function closeInventoryModal() {
        inventoryModal.style.display = "none";
    }

    closeModal.addEventListener("click", closeInventoryModal);
    window.addEventListener("click", function (event) {
        if (event.target === inventoryModal) {
            closeInventoryModal();
        }
    });
});
