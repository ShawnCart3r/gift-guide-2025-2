// Fleet Feet Flipbook - Main Controller
document.addEventListener('DOMContentLoaded', () => {
  
  // ========================================
  // FIND PAGEFLIP LIBRARY
  // ========================================
  function findPageFlip() {
    const sources = [
      () => window.St?.PageFlip,
      () => window.PageFlip,
      () => window.pageFlip?.PageFlip,
      () => window.pageFlip?.default,
    ];
    
    for (const getter of sources) {
      try {
        const Ctor = getter();
        if (typeof Ctor === 'function') return Ctor;
      } catch {}
    }
    return null;
  }

  const PageFlip = findPageFlip();

  // ========================================
  // DOM ELEMENTS
  // ========================================
  const book = document.getElementById('book');
  if (!book) {
    console.error('Book element not found');
    return;
  }

  const pages = Array.from(book.querySelectorAll('.page'));
  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');
  const dots = Array.from(document.querySelectorAll('.dot'));
  const pageNum = document.getElementById('pnum');
  const pageTotal = document.getElementById('ptotal');

  console.log(`Found ${pages.length} pages and ${dots.length} dots`);

  // ========================================
  // DRAG HINTS
  // ========================================
  const hintLeft = Object.assign(document.createElement('div'), {
    className: 'drag-hint left',
    innerHTML: '<div class="ear"></div><div class="label">Drag to flip</div>'
  });
  
  const hintRight = Object.assign(document.createElement('div'), {
    className: 'drag-hint right',
    innerHTML: '<div class="ear"></div><div class="label">Drag to flip</div>'
  });
  
  book.append(hintLeft, hintRight);

  let hintsShown = false;
  try {
    hintsShown = sessionStorage.getItem('flipbook_hints') === '1';
  } catch {}

  function showHints(currentIdx, total) {
    if (hintsShown) return;
    
    hintLeft.classList.toggle('show', currentIdx > 0);
    hintRight.classList.toggle('show', currentIdx < total - 1);
  }

  function hideHints() {
    if (hintsShown) return;
    hintsShown = true;
    
    try {
      sessionStorage.setItem('flipbook_hints', '1');
    } catch {}
    
    hintLeft.classList.remove('show');
    hintRight.classList.remove('show');
  }

  // ========================================
  // UPDATE UI
  // ========================================
  function updateUI(index) {
    if (pageNum) pageNum.textContent = index + 1;
    
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
      dot.setAttribute('aria-selected', i === index);
    });
    
    // Update progress indicator if it exists
    if (typeof window.updateProgress === 'function') {
      const total = flipbook ? flipbook.getPageCount() : pages.length;
      window.updateProgress(index, total);
    }
  }

  // ========================================
  // FALLBACK MODE (NO LIBRARY)
  // ========================================
  if (!PageFlip) {
    console.warn('PageFlip library not found - using fallback');
    
    let current = 0;
    
    function show(index) {
      current = Math.max(0, Math.min(pages.length - 1, index));
      pages.forEach((p, i) => p.style.display = i === current ? 'block' : 'none');
      updateUI(current);
      showHints(current, pages.length);
      if (pageTotal) pageTotal.textContent = pages.length;
    }
    
    show(0);
    
    prevBtn?.addEventListener('click', () => show(current - 1));
    nextBtn?.addEventListener('click', () => show(current + 1));
    
    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        const idx = Number(dot.dataset.index);
        if (!isNaN(idx)) show(idx);
      });
    });
    
    book.addEventListener('keydown', e => {
      if (e.key === 'ArrowLeft') show(current - 1);
      if (e.key === 'ArrowRight') show(current + 1);
    });
    
    book.addEventListener('pointerdown', hideHints, { once: true });
    return;
  }

  // ========================================
  // PAGEFLIP MODE
  // ========================================
  const flipbook = new PageFlip(book, {
    width: 980,
    height: 640,
    size: 'stretch',
    minWidth: 360,
    maxWidth: 1200,
    minHeight: 420,
    maxHeight: 900,
    flippingTime: 600,
    maxShadowOpacity: 0.25,
    drawShadow: true,
    showCover: true,
    mobileScrollSupport: false,
    swipeDistance: 50,
    clickEventForward: true,
    disableFlipByClick: true,
    usePortrait: true,
    autoSize: true,
  });

  flipbook.loadFromHTML(pages);
  window.flipRef = flipbook;

  // ========================================
  // FORCE LINKS INSIDE BOOK TO NAVIGATE (MOBILE + DESKTOP)
  // ========================================
  book.addEventListener('click', (e) => {
    const link = e.target.closest('a[href]');
    if (!link) return;

    const href = link.getAttribute('href');
    if (!href || href === '#') return;

    e.preventDefault();
    e.stopPropagation();

    const target = link.getAttribute('target');
    if (target && target !== '_self') {
      window.open(href, target);
    } else {
      window.location.href = href;
    }
  }, true); // Added capture phase

  // ========================================
  // PREVENT FLIPS ON INTERACTIVE ELEMENTS
  // ========================================
  const interactiveSelector = '.gear-tile, .info-tile, button, a, [role="button"]';
  
  book.addEventListener('mousedown', e => {
    if (e.target.closest(interactiveSelector)) {
      e.stopPropagation();
    }
  }, true);

  book.addEventListener('mouseup', e => {
    if (e.target.closest(interactiveSelector)) {
      e.stopPropagation();
    }
  }, true);

  // Also prevent touch events on interactive elements
  book.addEventListener('touchstart', e => {
    if (e.target.closest(interactiveSelector)) {
      e.stopPropagation();
    }
  }, { capture: true, passive: false });

  const total = flipbook.getPageCount();
  if (pageTotal) pageTotal.textContent = total;

  console.log(`PageFlip initialized with ${total} pages`);

  // ========================================
  // FLIP STATE CONTROL
  // ========================================
  let flipping = false;
  let flipTimer = null;

  function lock() {
    if (flipping) return false;
    flipping = true;
    
    prevBtn?.setAttribute('disabled', '');
    nextBtn?.setAttribute('disabled', '');
    
    if (flipTimer) clearTimeout(flipTimer);
    flipTimer = setTimeout(unlock, 800); // Increased from 1000 to be more responsive
    
    return true;
  }

  function unlock() {
    flipping = false;
    prevBtn?.removeAttribute('disabled');
    nextBtn?.removeAttribute('disabled');
    if (flipTimer) {
      clearTimeout(flipTimer);
      flipTimer = null;
    }
  }

  function flip(action) {
    if (!lock()) return;
    try { 
      flipbook.stopFlip?.(); 
    } catch {}
    
    try {
      action();
    } catch (error) {
      console.error('Flip error:', error);
      unlock(); // Make sure to unlock if flip fails
    }
  }

  // ========================================
  // SYNC UI WITH FLIPS
  // ========================================
  function sync(event) {
    const idx = event?.data ?? flipbook.getCurrentPageIndex();
    updateUI(idx);
    showHints(idx, total);
  }

  sync();

  flipbook.on('flip', event => {
    sync(event);
    hideHints();
    unlock();
  });

  flipbook.on('changeState', event => {
    if (event.data === 'read') {
      unlock();
    }
  });

  // Add additional safety unlock
  flipbook.on('changeOrientation', () => {
    unlock();
  });

  // ========================================
  // NAVIGATION
  // ========================================
  prevBtn?.addEventListener('click', () => flip(() => flipbook.flipPrev()));
  nextBtn?.addEventListener('click', () => flip(() => flipbook.flipNext()));

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const idx = Number(dot.dataset.index);
      if (!isNaN(idx)) flip(() => flipbook.flip(idx));
    });
  });

  document.addEventListener('keydown', e => {
    if (!book.matches(':focus-within') && document.activeElement !== document.body) return;
    
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      flip(() => flipbook.flipPrev());
    }
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      flip(() => flipbook.flipNext());
    }
  });

  // ========================================
  // DRAG TO FLIP
  // ========================================
  let dragX = null;
  let dragY = null;
  let dragging = false;
  let dragTarget = null;
  const isMobile = 'ontouchstart' in window;
  const DRAG_THRESHOLD = 15;
  const FLIP_THRESHOLD = 50;

  function startDrag(x, y, target) {
    // Exclude interactive elements from drag interactions
    if (target.closest(interactiveSelector) || flipping) return false;
    
    dragX = x;
    dragY = y;
    dragging = false;
    dragTarget = target;
    return true;
  }

  function moveDrag(x, y) {
    if (dragX === null || flipping) return;
    
    const deltaX = Math.abs(x - dragX);
    const deltaY = Math.abs(y - dragY);
    
    // Ignore vertical scrolls
    if (deltaY > 30 && deltaY > deltaX) {
      cancelDrag();
      return;
    }
    
    if (deltaX > DRAG_THRESHOLD) {
      dragging = true;
      if (!isMobile) book.style.cursor = 'grabbing';
    }
  }

  function endDrag(x) {
    if (dragX === null) return;
    
    if (!dragging) {
      cancelDrag();
      return;
    }

    const delta = x - dragX;
    
    if (Math.abs(delta) > FLIP_THRESHOLD) {
      if (delta < 0) {
        flip(() => flipbook.flipNext());
      } else {
        flip(() => flipbook.flipPrev());
      }
    }

    cancelDrag();
  }

  function cancelDrag() {
    dragX = null;
    dragY = null;
    dragging = false;
    dragTarget = null;
    if (!isMobile) book.style.cursor = 'grab';
  }

  // Mouse events
  book.addEventListener('mousedown', e => {
    // Only handle left clicks
    if (e.button !== 0) return;
    
    if (startDrag(e.clientX, e.clientY, e.target)) {
      hideHints();
    }
  });

  book.addEventListener('mousemove', e => {
    moveDrag(e.clientX, e.clientY);
  });

  book.addEventListener('mouseup', e => {
    endDrag(e.clientX);
  });

  book.addEventListener('mouseleave', () => {
    cancelDrag();
  });

  // Touch events
  book.addEventListener('touchstart', e => {
    if (e.target.closest(interactiveSelector)) return;
    
    const touch = e.touches[0];
    if (startDrag(touch.clientX, touch.clientY, e.target)) {
      hideHints();
    }
  }, { passive: true });

  book.addEventListener('touchmove', e => {
    if (dragX !== null) {
      const touch = e.touches[0];
      moveDrag(touch.clientX, touch.clientY);
    }
  }, { passive: true });

  book.addEventListener('touchend', e => {
    if (dragX !== null) {
      const touch = e.changedTouches[0];
      endDrag(touch.clientX);
    }
  });

  book.addEventListener('touchcancel', () => {
    cancelDrag();
  });

  // Set initial cursor
  if (!isMobile) book.style.cursor = 'grab';

  console.log('✅ Flipbook fully initialized');
});
