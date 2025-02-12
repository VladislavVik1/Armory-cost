document.addEventListener("DOMContentLoaded", function() {
    const availableContractsBtn = document.getElementById("available-contracts-btn");
    const availableContractsModal = document.getElementById("available-contracts-modal");
    const closeAvailableContracts = document.getElementById("close-available-contracts");

    // Открытие модального окна "Доступные контракты"
    availableContractsBtn.addEventListener("click", function() {
        availableContractsModal.style.display = "flex";
    });

    // Закрытие модального окна по клику на крестик
    closeAvailableContracts.addEventListener("click", function() {
        availableContractsModal.style.display = "none";
    });

    // Закрытие модального окна при клике вне его содержимого
    window.addEventListener("click", function(event) {
        if (event.target === availableContractsModal) {
            availableContractsModal.style.display = "none";
        }
    });
});
