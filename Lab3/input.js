const targets = document.querySelectorAll('.target');
let selectedElement = null;
let offsetX = 0;
let offsetY = 0;
let isDoubleClicked = false;
let originalPositions = new Map();
let isFollowingFinger = false;
let lastTap = 0; // Переменная для отслеживания времени последнего нажатия

targets.forEach(target => {
    // Сохранение оригинальных позиций элементов
    originalPositions.set(target, { left: target.style.left, top: target.style.top });

    // Обработка события мыши при нажатии
    target.addEventListener('mousedown', (e) => {
        if (!isDoubleClicked) {
            selectElement(e);
            document.addEventListener('mousemove', dragElement);
        }
    });

    document.addEventListener('mouseup', () => {
        if (!isDoubleClicked) {
            releaseElement();
        }
    });

    // Обработка двойного нажатия
    target.addEventListener('dblclick', (e) => {
        isDoubleClicked = true;
        selectedElement = e.target;
        selectedElement.style.backgroundColor = 'blue';
        selectElement(e);
        document.addEventListener('mousemove', dragElement);
    });

    target.addEventListener('click', () => {
        if (isDoubleClicked) {
            isDoubleClicked = false;
            selectedElement.style.backgroundColor = 'red';
            releaseElement();
        }
    });

    // Обработка событий сенсорного экрана
    target.addEventListener('touchstart', (e) => {
        e.preventDefault(); 
        let currentTime = new Date().getTime();
        let difference = currentTime - lastTap;

        if (difference < 300) { 
            isFollowingFinger = true;
            selectedElement = target;
            offsetX = e.touches[0].clientX - selectedElement.offsetLeft;
            offsetY = e.touches[0].clientY - selectedElement.offsetTop;
            document.addEventListener('touchmove', followFinger);
        } else {
            selectElement(e.touches[0]);
            document.addEventListener('touchmove', dragElementTouch);
        }

        lastTap = currentTime; 
    });

    target.addEventListener('touchend', (e) => {
        if (isFollowingFinger) {
            isFollowingFinger = false; 
        } else {
            releaseElement();
        }
    });
});

function selectElement(e) {
    selectedElement = e.target;
    offsetX = e.clientX - selectedElement.offsetLeft;
    offsetY = e.clientY - selectedElement.offsetTop;
}

function dragElement(e) {
    if (selectedElement) {
        selectedElement.style.left = `${e.clientX - offsetX}px`;
        selectedElement.style.top = `${e.clientY - offsetY}px`;
    }
}

function dragElementTouch(e) {
    if (selectedElement) {
        const touch = e.touches[0];
        selectedElement.style.left = `${touch.clientX - offsetX}px`;
        selectedElement.style.top = `${touch.clientY - offsetY}px`;
    }
}

function followFinger(e) {
    if (selectedElement) {
        const touch = e.touches[0];
        selectedElement.style.left = `${touch.clientX - offsetX}px`;
        selectedElement.style.top = `${touch.clientY - offsetY}px`;
    }
}

document.addEventListener('touchstart', (e) => {
    if (e.touches.length > 1) {
        if (selectedElement) {
            const originalPosition = originalPositions.get(selectedElement);
            selectedElement.style.left = originalPosition.left;
            selectedElement.style.top = originalPosition.top;
            selectedElement.style.backgroundColor = 'red';
            isDoubleClicked = false;
            releaseElement();
        }
    }
});

function releaseElement() {
    if (selectedElement) {
        selectedElement = null;
        document.removeEventListener('mousemove', dragElement);
        document.removeEventListener('touchmove', dragElementTouch);
        document.removeEventListener('touchmove', followFinger);
    }
}

// Обработка нажатия клавиши Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && selectedElement) {
        const originalPosition = originalPositions.get(selectedElement);
        selectedElement.style.left = originalPosition.left;
        selectedElement.style.top = originalPosition.top;
        selectedElement.style.backgroundColor = 'red';
        isDoubleClicked = false;
        releaseElement();
    }
});
