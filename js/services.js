document.addEventListener('DOMContentLoaded', function () {
  const items = document.querySelectorAll('.service-card');

  if (!items.length) return;

  function clearActive(except) {
    items.forEach(i => {
      if (i !== except) i.classList.remove('is-active');
    });
  }

  // Klik mimo = zavři
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.service-card')) {
      clearActive(null);
    }
  });

  // ESC zavře vše
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' || e.key === 'Esc') {
      clearActive(null);
    }
  });
});