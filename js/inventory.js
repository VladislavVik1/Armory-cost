document.addEventListener("DOMContentLoaded", function () {
    const inventoryButton = document.getElementById("open-inventory");
    const inventoryModal = document.getElementById("inventory-modal");
    const inventoryList = document.getElementById("inventory-list");
    const closeModal = document.querySelector(".close");

    const inventoryItems = [
        { name: "Повязка", quantity: 11 },
        { name: "Давящая повящка", quantity: 13 },
        { name: "Тампонирующая повязка", quantity: 7 },
        { name: "Турникет", quantity: 6 },
        { name: "Обезболивающее", quantity: 3 },
        { name: "Адреналин", quantity: 2},
        { name: "Пакет с кровью (500)", quantity: 1 },
        { name: "Пакет с кровью (1000)", quantity: 1 },
        { name: "Шина", quantity: 4 },
        { name: "Мешки для трупов", quantity: 14 },
        { name: "Магазины 5.56 М855", quantity: 40 },
        { name: "Магазины 5.56 40 патронов М855 ВАЗ", quantity: 10 },
        { name: "Магазины 7.62*54 7Н1", quantity: 2 },
        { name: "40MM 6 HET ВАЗ", quantity: 10 },
        { name: "40MM 6 HE ВАЗ", quantity: 10 },
        { name: "Магазины 12.7", quantity: 3 },
        { name: "Магазины .408", quantity: 1 },
        { name: "Магазины .338", quantity: 2 },        
        { name: "Магазины 5.45 (45 патр)", quantity: 1 },
        { name: "Магазины 5.45 (30 патр)", quantity: 3 },
        { name: "РПГ-7 ОГ", quantity: 1 },
        { name: "РПГ-7 ПГ", quantity: 2 },
        { name: "Хаммер", quantity: 1 },
        { name: "Логистические Грузовики", quantity: 2 },
        { name: "Юрпи", quantity: 1 },
        { name: "РПГ-7", quantity: 1 },
        { name: "РШГ", quantity: 1 },
        { name: "РПГ-26", quantity: 2 },
        { name: "МПРЛ", quantity: 1 },
        { name: "М2 Браунинг", quantity: 1 },
        { name: "Little Bird", quantity: 1 },
        { name: "Ми-8", quantity: 1 },
        { name: "Taureq ", quantity: 1 },
        { name: "Mavic-3T ", quantity: 3 },
        { name: "M112(4x)  ", quantity: 2 },
        { name: "MK-19 на Хаммер ", quantity: 1 },



        { name: "М4А1 ВАЗ", quantity: 10 },
        { name: "SU-230 + MRDS ВАЗ", quantity: 10 },
        { name: "НЛАВ  ВАЗ", quantity: 1 },
        { name: "М72-А7  ВАЗ", quantity: 1 },
        { name: "АТ4 HEAT ВАЗ", quantity: 1 },
        { name: "AIMPOINT MICRO T1 ВАЗ", quantity: 10 },
        { name: "М16А4 ручка транспортировки ВАЗ", quantity: 2 },
        { name: "М16А4  ВАЗ", quantity: 1 },
        { name: "М240(свинья) ВАЗ", quantity: 1 },
        { name: "М249 ВАЗ", quantity: 1 },
        { name: "Глушитель ВАЗ", quantity: 1 },
        { name: "Ручка переноса огня ВАЗ", quantity: 1 },
        { name: "Сошки  ВАЗ", quantity: 1 },


        { name: "Затяжка Территории ", quantity: 1 },
        { name: "Обустройство территории ", quantity: 1 },
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
