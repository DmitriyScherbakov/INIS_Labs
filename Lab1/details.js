document.addEventListener("DOMContentLoaded", function () {

    const selectedShirt = JSON.parse(localStorage.getItem('selectedShirt'));

    if (selectedShirt) {
        document.getElementById('shirt-name').textContent = selectedShirt.name || 'Unnamed T-shirt';
        document.getElementById('shirt-description').textContent = selectedShirt.description || 'No description available';
        document.getElementById('shirt-price').textContent = selectedShirt.price || 'No price available';

        const imgElement = document.getElementById('shirt-image');
        imgElement.src = selectedShirt.default.front;
        
        let currentSide = 'front'; 

        document.getElementById('front-btn').addEventListener('click', () => {
            currentSide = 'front';
            imgElement.src = selectedShirt.colors[currentColor][currentSide]; 
        });
        document.getElementById('back-btn').addEventListener('click', () => {
            currentSide = 'back';
            imgElement.src = selectedShirt.colors[currentColor][currentSide]; 
        });

        const colorButtonsContainer = document.getElementById('color-buttons');
        const colors = selectedShirt.colors ? Object.keys(selectedShirt.colors) : [];
        
        let currentColor = colors[0];

        colors.forEach(color => {
            const button = document.createElement('button');
            button.textContent = color.charAt(0).toUpperCase() + color.slice(1);
            button.style.backgroundColor = color;
            
            button.addEventListener('click', () => {
                currentColor = color; 
                imgElement.src = selectedShirt.colors[color][currentSide]; 
            });

            colorButtonsContainer.appendChild(button);
        });
        
        imgElement.src = selectedShirt.colors[currentColor].front;

    } else {
        console.error("No shirt data found in localStorage.");
    }
});
