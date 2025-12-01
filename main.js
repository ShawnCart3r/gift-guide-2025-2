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

  const total = flipbook.getPageCount();
  if (pageTotal) pageTotal.textContent = total;

  console.log(`PageFlip initialized with ${total} pages`);
  console.log('Initial page index:', flipbook.getCurrentPageIndex());

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
  }, true);

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

  book.addEventListener('touchstart', e => {
    if (e.target.closest(interactiveSelector)) {
      e.stopPropagation();
    }
  }, { capture: true, passive: false });

  // ========================================
  // FLIP STATE CONTROL - SIMPLIFIED
  // ========================================
  let flipping = false;

  function canFlip() {
    return !flipping;
  }

  function startFlip() {
    flipping = true;
    prevBtn?.setAttribute('disabled', '');
    nextBtn?.setAttribute('disabled', '');
    console.log('Flip started, buttons disabled');
  }

  function endFlip() {
    flipping = false;
    prevBtn?.removeAttribute('disabled');
    nextBtn?.removeAttribute('disabled');
    console.log('Flip ended, buttons enabled');
  }

  // Safety timeout to prevent permanent lock
  function safeFlip(action, actionName = 'flip') {
    if (!canFlip()) {
      console.log('Flip blocked - already flipping');
      return;
    }

    const currentPage = flipbook.getCurrentPageIndex();
    console.log(`${actionName} requested from page ${currentPage}`);

    startFlip();

    // Safety timeout
    const safetyTimer = setTimeout(() => {
      console.warn('Flip safety timeout triggered');
      endFlip();
    }, 2000);

    try {
      action();
      // Clear safety timer after a short delay to allow flip to complete
      setTimeout(() => {
        clearTimeout(safetyTimer);
        endFlip();
      }, 700); // Slightly longer than flippingTime
    } catch (error) {
      console.error('Flip error:', error);
      clearTimeout(safetyTimer);
      endFlip();
    }
  }

  // ========================================
  // SYNC UI WITH FLIPS
  // ========================================
  function sync(event) {
    const idx = event?.data ?? flipbook.getCurrentPageIndex();
    console.log('Syncing UI to page:', idx);
    updateUI(idx);
    showHints(idx, total);
  }

  sync();

  flipbook.on('flip', event => {
    console.log('Flip event:', event.data);
    sync(event);
    hideHints();
    endFlip();
  });

  flipbook.on('changeState', event => {
    console.log('State changed:', event.data);
    if (event.data === 'read') {
      endFlip();
    }
  });

  flipbook.on('changeOrientation', () => {
    console.log('Orientation changed');
    endFlip();
  });

  // ========================================
  // NAVIGATION
  // ========================================
  prevBtn?.addEventListener('click', (e) => {
    console.log('Prev button clicked');
    e.preventDefault();
    const currentPage = flipbook.getCurrentPageIndex();
    if (currentPage > 0) {
      safeFlip(() => flipbook.flipPrev(), 'flipPrev');
    } else {
      console.log('Already at first page');
    }
  });

  nextBtn?.addEventListener('click', (e) => {
    console.log('Next button clicked');
    e.preventDefault();
    const currentPage = flipbook.getCurrentPageIndex();
    if (currentPage < total - 1) {
      safeFlip(() => flipbook.flipNext(), 'flipNext');
    } else {
      console.log('Already at last page');
    }
  });

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const idx = Number(dot.dataset.index);
      console.log('Dot clicked, target page:', idx);
      if (!isNaN(idx)) {
        safeFlip(() => flipbook.flip(idx), `flip to ${idx}`);
      }
    });
  });

  document.addEventListener('keydown', e => {
    if (!book.matches(':focus-within') && document.activeElement !== document.body) return;
    
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      console.log('Left arrow pressed');
      const currentPage = flipbook.getCurrentPageIndex();
      if (currentPage > 0) {
        safeFlip(() => flipbook.flipPrev(), 'flipPrev (keyboard)');
      }
    }
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      console.log('Right arrow pressed');
      const currentPage = flipbook.getCurrentPageIndex();
      if (currentPage < total - 1) {
        safeFlip(() => flipbook.flipNext(), 'flipNext (keyboard)');
      }
    }
  });

  // ========================================
  // DRAG TO FLIP
  // ========================================
  let dragX = null;
  let dragY = null;
  let dragging = false;
  const isMobile = 'ontouchstart' in window;
  const DRAG_THRESHOLD = 15;
  const FLIP_THRESHOLD = 50;

  function startDrag(x, y, target) {
    if (target.closest(interactiveSelector) || flipping) return false;
    
    dragX = x;
    dragY = y;
    dragging = false;
    return true;
  }

  function moveDrag(x, y) {
    if (dragX === null || flipping) return;
    
    const deltaX = Math.abs(x - dragX);
    const deltaY = Math.abs(y - dragY);
    
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
    const currentPage = flipbook.getCurrentPageIndex();
    
    if (Math.abs(delta) > FLIP_THRESHOLD) {
      if (delta < 0 && currentPage < total - 1) {
        console.log('Drag flip next');
        safeFlip(() => flipbook.flipNext(), 'flipNext (drag)');
      } else if (delta > 0 && currentPage > 0) {
        console.log('Drag flip prev');
        safeFlip(() => flipbook.flipPrev(), 'flipPrev (drag)');
      }
    }

    cancelDrag();
  }

  function cancelDrag() {
    dragX = null;
    dragY = null;
    dragging = false;
    if (!isMobile) book.style.cursor = 'grab';
  }

  // Mouse events
  book.addEventListener('mousedown', e => {
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

  if (!isMobile) book.style.cursor = 'grab';

  console.log('✅ Flipbook fully initialized');
  
  // Expose debug function
  window.debugFlipbook = () => {
    console.log('=== FLIPBOOK DEBUG ===');
    console.log('Total pages:', total);
    console.log('Current page:', flipbook.getCurrentPageIndex());
    console.log('Is flipping:', flipping);
    console.log('PageFlip object:', flipbook);
    console.log('Methods available:', Object.keys(flipbook));
  };
  
  console.log('Type window.debugFlipbook() to see flipbook state');
});
