document.addEventListener("DOMContentLoaded", function() {
    const container = document.querySelector(".container");
    const modal = document.getElementById("modal");
    const modalName = document.getElementById("modal-name");
    const modalPrice = document.getElementById("modal-price");
    const modalFront = document.getElementById("modal-front");
    const modalBack = document.getElementById("modal-back");
    const closeModal = document.querySelector(".close");

    // Закрыть модальное окно
    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Закрыть окно при клике вне модального окна
    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    shirts.forEach((shirt) => {
        try {
            const shirtDiv = document.createElement("div");
            shirtDiv.classList.add("t-shirt-container");

            const name = document.createElement("h2");
            name.textContent = shirt.name || "Unnamed T-shirt";

            const colors = shirt.colors ? Object.keys(shirt.colors) : [];
            const colorCount = document.createElement("p");
            colorCount.textContent = `Available colors: ${colors.length > 0 ? colors.length : 'N/A'}`;

            let imgSrc = (shirt.default && shirt.default.front) ? shirt.default.front : 'shirt_images/default-placeholder.png';
            let imgBackSrc = (shirt.default && shirt.default.back) ? shirt.default.back : 'shirt_images/default-placeholder.png';
            if (colors.length > 0 && shirt.colors[colors[0]] && shirt.colors[colors[0]].front) {
                imgSrc = shirt.colors[colors[0]].front;
                imgBackSrc = shirt.colors[colors[0]].back;
            }

            const imgFront = document.createElement("img");
            imgFront.src = imgSrc;
            imgFront.alt = `${shirt.name || "Unnamed"} front view`;

            const buttonGroup = document.createElement("div");
            buttonGroup.classList.add("button-group");

            const quickViewBtn = document.createElement("button");
            quickViewBtn.textContent = "Quick View";

            const seePageBtn = document.createElement("button");
            seePageBtn.textContent = "See Page";

            buttonGroup.appendChild(quickViewBtn);
            buttonGroup.appendChild(seePageBtn);

            shirtDiv.appendChild(imgFront);
            shirtDiv.appendChild(name);
            shirtDiv.appendChild(colorCount);
            shirtDiv.appendChild(buttonGroup);

            container.appendChild(shirtDiv);

            // Обработчик для кнопки Quick View
            quickViewBtn.addEventListener("click", () => {
                modalName.textContent = shirt.name || "Unnamed T-shirt";
                modalPrice.textContent = `Price: ${shirt.price || "$0.00"}`;
                modalFront.src = imgSrc;
                modalBack.src = imgBackSrc;
                modal.style.display = "block";
            });

            seePageBtn.addEventListener("click", () => {
                const shirtName = shirt.name ? encodeURIComponent(shirt.name) : "Unnamed";
                localStorage.setItem('selectedShirt', JSON.stringify(shirt));
                window.location.href = `details.html?name=${shirtName}`;
            });

        } catch (error) {
            console.error("Error processing shirt:", error);
        }
    });
});
