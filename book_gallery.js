let current = null;
    let isMoving = false;
    let offsetX = 0, offsetY = 0;

    document.addEventListener('mousedown', e => {
      const img = e.target.closest('.gallery img');
      if (!img) return;
      e.preventDefault();
      // set as current and compute offset
      current = img;
      isMoving = false;
      const rect = img.getBoundingClientRect();
      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;
      img.classList.add('dragged');
      // initial place under cursor via fixed
      img.style.left = (e.clientX - offsetX) + 'px';
      img.style.top  = (e.clientY - offsetY) + 'px';
      window.addEventListener('mousemove', onMove);
      window.addEventListener('mouseup', onUp, { once: true });
    });

    function onMove(e) {
      if (!current) return;
      isMoving = true;
      current.style.left = (e.clientX - offsetX) + 'px';
      current.style.top  = (e.clientY - offsetY) + 'px';
    }

    function onUp(e) {
      window.removeEventListener('mousemove', onMove);
      if (!isMoving && current && current.dataset.href) {
        window.location.href = current.dataset.href;
      }
      current = null;
    }