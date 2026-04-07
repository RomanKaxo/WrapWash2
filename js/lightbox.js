// Simple lightbox for portfolio
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

function isMobile() {
  return window.innerWidth <= 768;
}

// Open lightbox on portfolio item click. If the item has a data-full attribute,
// use that image path for the lightbox; otherwise fall back to the thumbnail src.
// On mobile, toggle review overlay instead of opening lightbox.
document.querySelectorAll('.portfolio-item').forEach(item => {
  item.addEventListener('click', (e) => {
    if (isMobile()) {
      // Toggle review overlay on mobile
      const wasActive = item.classList.contains('is-active');
      // Close all others
      document.querySelectorAll('.portfolio-item.is-active').forEach(i => i.classList.remove('is-active'));
      if (!wasActive) {
        item.classList.add('is-active');
      }
      return;
    }

    // Desktop: open lightbox
    const fullPath = item.dataset.full;
    const thumb = item.querySelector('.portfolio-image');

    if (fullPath && fullPath.length) {
      lightboxImg.src = fullPath;
    } else if (thumb) {
      lightboxImg.src = thumb.src;
    }

    lightbox.style.display = 'block';
    document.body.style.overflow = 'hidden';
  });
});

// Close lightbox on click (outside image)
lightbox.addEventListener('click', () => {
  lightbox.style.display = 'none';
  document.body.style.overflow = '';
});

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && lightbox.style.display === 'block') {
    lightbox.style.display = 'none';
    document.body.style.overflow = '';
  }
});
