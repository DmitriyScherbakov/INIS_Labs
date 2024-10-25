document.addEventListener("DOMContentLoaded", function () {
    // Получаем данные о выбранной футболке из localStorage
    const selectedShirt = JSON.parse(localStorage.getItem('selectedShirt'));

    if (selectedShirt) {
        // Обновляем информацию на странице
        document.getElementById('shirt-name').textContent = selectedShirt.name || 'Unnamed T-shirt';
        document.getElementById('shirt-description').textContent = selectedShirt.description || 'No description available';
        document.getElementById('shirt-price').textContent = selectedShirt.price || 'No price available';

        // Устанавливаем изображение по умолчанию (front)
        const imgElement = document.getElementById('shirt-image');
        imgElement.src = selectedShirt.default.front;
        
        let currentSide = 'front'; // Переменная для хранения текущей стороны (front/back)

        // Добавляем функционал для переключения между front и back
        document.getElementById('front-btn').addEventListener('click', () => {
            currentSide = 'front';
            imgElement.src = selectedShirt.colors[currentColor][currentSide]; // Меняем картинку на текущий цвет и сторону
        });
        document.getElementById('back-btn').addEventListener('click', () => {
            currentSide = 'back';
            imgElement.src = selectedShirt.colors[currentColor][currentSide]; // Меняем картинку на текущий цвет и сторону
        });

        // Генерируем кнопки для выбора цветов
        const colorButtonsContainer = document.getElementById('color-buttons');
        const colors = selectedShirt.colors ? Object.keys(selectedShirt.colors) : [];
        
        // Текущий выбранный цвет (по умолчанию — первый цвет из массива)
        let currentColor = colors[0];

        colors.forEach(color => {
            const button = document.createElement('button');
            button.textContent = color.charAt(0).toUpperCase() + color.slice(1);
            button.style.backgroundColor = color;
            
            // Обработчик клика на кнопку выбора цвета
            button.addEventListener('click', () => {
                currentColor = color; // Обновляем текущий выбранный цвет
                imgElement.src = selectedShirt.colors[color][currentSide]; // Меняем изображение на выбранный цвет и сторону
            });

            colorButtonsContainer.appendChild(button);
        });
        
        // Подставляем изображение по умолчанию для первого цвета и стороны front
        imgElement.src = selectedShirt.colors[currentColor].front;

    } else {
        console.error("No shirt data found in localStorage.");
    }
});
