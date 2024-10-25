const targets = document.querySelectorAll('.target');
let selectedElement = null;
let offsetX = 0;
let offsetY = 0;
let isDoubleClicked = false;
let originalPositions = new Map();
let isFollowingFinger = false;

targets.forEach(target => {
    originalPositions.set(target, { left: target.style.left, top: target.style.top });

    // Обработка событий мыши
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
        e.preventDefault(); // Предотвращаем прокрутку страницы
        if (!isDoubleClicked) {
            selectElement(e.touches[0]);
            document.addEventListener('touchmove', dragElementTouch);
        } else {
            // Двойное нажатие переводит в режим "следующий за пальцем"
            isFollowingFinger = true;
            selectedElement = target;
            document.addEventListener('touchmove', followFinger);
        }
    });

    target.addEventListener('touchend', (e) => {
        if (isFollowingFinger) {
            isFollowingFinger = false; // Завершаем режим "следующий за пальцем"
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
    const touch = e.touches[0];
    if (selectedElement) {
        selectedElement.style.left = `${touch.clientX - offsetX}px`;
        selectedElement.style.top = `${touch.clientY - offsetY}px`;
    }
}

function releaseElement() {
    if (selectedElement) {
        selectedElement = null;
        document.removeEventListener('mousemove', dragElement);
        document.removeEventListener('touchmove', dragElementTouch);
    }
}

// Обработка нажатия второй палец
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

// Обработка клавиши Escape
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
