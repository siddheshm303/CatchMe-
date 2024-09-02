const button = document.getElementById('floatingButton');
const escapeDistance = 150; // Distance the button will move to escape
const threshold = 100; // Distance from the edges considered as "near"

function moveButton(event) {
    const buttonRect = button.getBoundingClientRect();
    const bodyRect = document.body.getBoundingClientRect();

    let newLeft = buttonRect.left;
    let newTop = buttonRect.top;

    // Detect if the button is near any edge
    const nearLeftEdge = buttonRect.left <= threshold;
    const nearRightEdge = bodyRect.width - (buttonRect.left + buttonRect.width) <= threshold;
    const nearTopEdge = buttonRect.top <= threshold;
    const nearBottomEdge = bodyRect.height - (buttonRect.top + buttonRect.height) <= threshold;

    // If near a corner, move to the opposite corner
    if (nearLeftEdge && nearTopEdge) {
        newLeft = bodyRect.width - buttonRect.width - threshold;
        newTop = bodyRect.height - buttonRect.height - threshold;
    } else if (nearRightEdge && nearTopEdge) {
        newLeft = threshold;
        newTop = bodyRect.height - buttonRect.height - threshold;
    } else if (nearLeftEdge && nearBottomEdge) {
        newLeft = bodyRect.width - buttonRect.width - threshold;
        newTop = threshold;
    } else if (nearRightEdge && nearBottomEdge) {
        newLeft = threshold;
        newTop = threshold;
    } else {
        // Otherwise, move in the opposite direction from the cursor
        const cursorX = event.clientX;
        const cursorY = event.clientY;

        let moveX = (buttonRect.left + buttonRect.width / 2) - cursorX;
        let moveY = (buttonRect.top + buttonRect.height / 2) - cursorY;

        const length = Math.sqrt(moveX * moveX + moveY * moveY);
        moveX = moveX / length * escapeDistance * Math.random();
        moveY = moveY / length * escapeDistance * Math.random();

        newLeft = buttonRect.left + moveX;
        newTop = buttonRect.top + moveY;

        newLeft = Math.max(0, Math.min(newLeft, bodyRect.width - buttonRect.width));
        newTop = Math.max(0, Math.min(newTop, bodyRect.height - buttonRect.height));
    }

    button.style.left = newLeft + 'px';
    button.style.top = newTop + 'px';

    // Randomly change shape when moving
    const shapes = ['50%', '0', '25%'];
    button.style.borderRadius = shapes[Math.floor(Math.random() * shapes.length)];
}

button.addEventListener('mouseover', moveButton);
button.addEventListener('mousemove', moveButton);

// Random teleportation every 2 seconds
setInterval(() => {
    const randomX = Math.random() * (window.innerWidth - button.clientWidth);
    const randomY = Math.random() * (window.innerHeight - button.clientHeight);
    button.style.left = randomX + 'px';
    button.style.top = randomY + 'px';

    // Randomly change shape when teleporting
    const shapes = ['50%', '0', '25%'];
    button.style.borderRadius = shapes[Math.floor(Math.random() * shapes.length)];
}, 2000); // Teleports every 2 seconds