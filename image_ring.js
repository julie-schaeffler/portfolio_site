const IMG_DATA = [
    { src: 'assets/ring/new/ring1.png', href: 'portfolio.html' },
    { src: 'assets/ring/new/ring2.png', href: 'perspectives.html' },
    { src: 'assets/ring/new/ring4.png', href: 'shadow_analysis.html' },
    { src: 'assets/ring/new/ring3.png', href: 'algorithmic_fiefdom.html' },
    { src: 'assets/ring/new/ring5.png', href: 'p5js_new.html' }
    
  ];
  const RADIUS = 230;
  const SPEED = 800 / 45;
  const ringEl = document.getElementById('imageRing');
  const images = [];
  let angleOffset = 0;

  IMG_DATA.forEach((item, i) => {
    const img = document.createElement('img');
    img.src = item.src;
    img.alt = 'portfolio image';
    img.dataset.href = item.href;
    img.classList.add('draggable');
    ringEl.appendChild(img);
    images.push({ el: img, baseAngle: (i / IMG_DATA.length) * 360 });
  });

  function animateRing(delta) {
    angleOffset = (angleOffset + SPEED * delta) % 360;
    images.forEach(({ el, baseAngle }) => {
      const a = baseAngle + angleOffset;
      el.style.transform = `rotateY(${a}deg) translateZ(${RADIUS}px) rotateY(${-a}deg)`;
    });
    requestAnimationFrame((ts) => {
      const now = ts / 1000;
      const dt = now - (animateRing.last || now);
      animateRing.last = now;
      animateRing(dt);
    });
  }
  requestAnimationFrame((ts) => {
    animateRing.last = ts / 1000;
    animateRing(0);
  });

  let current = null;
  let isMoving = false;
  const size = 70;

  document.addEventListener('mousedown', (e) => {
    const img = e.target.closest('img.draggable');
    if (!img) return;
    e.preventDefault();
    current = img;
    isMoving = false;
    img.classList.add('dragged');
    document.body.appendChild(img);
    img.style.left = `${e.pageX - size / 2}px`;
    img.style.top = `${e.pageY - size / 2}px`;
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp, { once: true });
  });
  function onMove(e) {
    if (!current) return;
    isMoving = true;
    current.style.left = `${e.pageX - size / 2}px`;
    current.style.top = `${e.pageY - size / 2}px`;
  }
  function onUp(e) {
    window.removeEventListener('mousemove', onMove);
    if (current && !isMoving && current.classList.contains('dragged') && current.dataset.href) {
      window.location.href = current.dataset.href;
    }
    current = null;
  }