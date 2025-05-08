const container = document.querySelector('.slider-container');
const overlay = container.querySelector('.slider-overlay');
const handle = container.querySelector('.slider-handle');

let isDragging = false;

const startDrag = e => {
    e.preventDefault();
    isDragging = true;
};
const endDrag = () => isDragging = false;
const onDrag = e => {
    if (!isDragging) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const rect = container.getBoundingClientRect();
    let offsetX = clientX - rect.left;
    offsetX = Math.max(0, Math.min(offsetX, rect.width));
    const percent = (offsetX / rect.width) * 100 + '%';
    overlay.style.width = percent;
    handle.style.left = percent;
};

handle.addEventListener('mousedown', startDrag);
window.addEventListener('mouseup', endDrag);
window.addEventListener('mousemove', onDrag);
container.addEventListener('touchstart', startDrag);
container.addEventListener('touchend', endDrag);
container.addEventListener('touchmove', onDrag);