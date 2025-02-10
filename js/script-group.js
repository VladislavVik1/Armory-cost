document.addEventListener("DOMContentLoaded", function () {
            const items = document.querySelectorAll(".item");
            const modal = document.createElement("div");
            modal.classList.add("modal");
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close">&times;</span>
                    <img id="modal-img" src="" alt="Фото">
                    <p id="modal-text"></p>
                </div>
            `;
            document.body.appendChild(modal);
            const modalImg = document.getElementById("modal-img");
            const modalText = document.getElementById("modal-text");
            const closeModal = modal.querySelector(".close");
            items.forEach((item, index) => {
                item.addEventListener("click", function () {
                    modalImg.src = `images/person${index + 1}.jpg`;
                    modalText.textContent = item.textContent;
                    modal.classList.add("show");
                });
            });
            closeModal.addEventListener("click", function () {
                modal.classList.remove("show");
            });
            modal.addEventListener("click", function (event) {
                if (event.target === modal) {
                    modal.classList.remove("show");
                }
            });
            const contractBtn = document.getElementById("contract-btn");
            const contractModal = document.getElementById("contract-modal");
            const closeContractModal = document.getElementById("close-contract");
            contractBtn.addEventListener("click", function () {
                contractModal.style.display = "flex";
            });
            closeContractModal.addEventListener("click", function () {
                contractModal.style.display = "none";
            });
            contractModal.addEventListener("click", function (event) {
                if (event.target === contractModal) {
                    contractModal.style.display = "none";
                }
            });
            const balanceBtn = document.getElementById("balance-btn");
            const balanceModal = document.getElementById("balance-modal");
            const closeBalanceModal = document.getElementById("close-balance");

            balanceBtn.addEventListener("click", function () {
                balanceModal.style.display = "flex";
            });
            closeBalanceModal.addEventListener("click", function () {
                balanceModal.style.display = "none";
            });
            balanceModal.addEventListener("click", function (event) {
                if (event.target === balanceModal) {
                    balanceModal.style.display = "none";
                }
            });
        });
          document.getElementById("sosal-btn").addEventListener("click", function () {
                            window.location.href = "video.html";
                        });