
document.addEventListener('DOMContentLoaded', function () {
  const items = document.querySelectorAll('.portfolio-item');

  if (!items.length) return;

  function clearActive(except) {
    items.forEach(i => {
      if (i !== except) i.classList.remove('is-active');
    });
  }

  // Klik / tap na položku = aktivuj
  items.forEach(function (item) {
    item.addEventListener('click', function (e) {
      e.stopPropagation();
      if (item.classList.contains('is-active')) {
        item.classList.remove('is-active');
      } else {
        clearActive(item);
        item.classList.add('is-active');
      }
    });
  });

  // Klik mimo = zavři
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.portfolio-item')) {
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

