document.addEventListener("DOMContentLoaded", function () {
    const inventoryButton = document.getElementById("open-inventory");
    const inventoryModal = document.getElementById("inventory-modal");
    const inventoryList = document.getElementById("inventory-list");
    const closeModal = document.querySelector(".close");

    const inventoryItems = [
        { name: "Повязка", quantity: 0 },
        { name: "Давящая повящка", quantity: 0 },
        { name: "Тампонирующая повязка", quantity: 0 },
        { name: "Турникет", quantity: 1 },
        { name: "Обезболивающее", quantity: 1 },
        { name: "Адреналин", quantity: 0},
        { name: "Пакет с кровью (250)", quantity: 6 },
        { name: "Пакет с кровью (500)", quantity: 6 },
        { name: "Пакет с кровью (1000)", quantity: 8 },
        { name: "Пакет с физраствором (500)", quantity: 4 },
        { name: "Шина", quantity: 0 },
        { name: "Мешки для трупов", quantity: 14 },



        { name: "Магазины 5.56 М855", quantity: 40 },
        { name: "Магазины 5.56 40 патронов М855 ", quantity: 10 },
        { name: "Магазины 5.45 (45 патр)", quantity: 1 },
        { name: "Магазины 5.45 (30 патр)", quantity: 3 },        
        { name: "Магазины 7.62*54 7Н1", quantity: 2 },
        { name: "Магазины 12.7", quantity: 3 },
        { name: "Магазины .338", quantity: 2 },          
        { name: "Магазины .408", quantity: 1 },      
        { name: "РПГ-7 ОГ", quantity: 1 },
        { name: "40MM 6 HET ", quantity: 10 },
        { name: "40MM 6 HE ", quantity: 10 },
        { name: "РГД-5 ", quantity: 10 },
        { name: "Ф-1 ", quantity: 5 },



        { name: "РПГ-7", quantity: 1 },
        { name: "РШГ", quantity: 1 },
        { name: "РПГ-26", quantity: 2 },
        { name: "МПРЛ", quantity: 1 },
        { name: "НЛАВ  ", quantity: 1 },
        { name: "М72-А7  ", quantity: 1 },
        { name: "АТ4 HEAT ", quantity: 1 },
        


        { name: "Mavic-3T ", quantity: 3 },
        { name: "M112(4x)  ", quantity: 2 },



        { name: "М16А4 ручка транспортировки ", quantity: 2 },
        { name: "М16А4  ", quantity: 1 },
        { name: "М240(свинья) ", quantity: 1 },
        { name: "М249 ", quantity: 1 },
        { name: "М4А1 ", quantity: 10 },



        { name: "SU-230 + MRDS ", quantity: 10 },
        { name: "AIMPOINT MICRO T1 ", quantity: 10 },
        { name: "Глушитель ", quantity: 1 },
        { name: "Ручка переноса огня ", quantity: 1 },
        { name: "Сошки  ", quantity: 1 }, 




        { name: "MK-19 на Хаммер ", quantity: 1 },
        { name: "Little Bird", quantity: 1 },
        { name: "Ми-8", quantity: 1 },
        { name: "Taureq ", quantity: 1 },
        { name: "Юрпи", quantity: 1 },
        { name: "Хаммер", quantity: 1 },
        { name: "Логистические Грузовики", quantity: 2 },



        { name: "Затяжка Территории ", quantity: 1 },
        { name: "Обустройство территории ", quantity: 1 },
        { name: "Комплекты бронежилетов, формы, касок, рюкзаков", quantity: 11 }

        { name: "ПНВ 15", quantity: 2 },
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
