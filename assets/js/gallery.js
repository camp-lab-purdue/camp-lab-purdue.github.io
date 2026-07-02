(function () {
  var root = document.getElementById('gallery');
  if (!root) return;
  var slides = [].slice.call(root.querySelectorAll('.slide'));
  var dots = [].slice.call(root.querySelectorAll('.dot'));
  var caption = root.querySelector('.carousel-caption');
  if (slides.length < 2) { // nothing to page through
    var only = root.querySelector('.carousel-btn');
    root.querySelectorAll('.carousel-btn').forEach(function (b) { b.style.display = 'none'; });
    if (dots.length) root.querySelector('.carousel-dots').style.display = 'none';
    return;
  }
  var i = 0;
  function show(n) {
    i = (n + slides.length) % slides.length;
    slides.forEach(function (s, k) { s.classList.toggle('active', k === i); });
    dots.forEach(function (d, k) { d.classList.toggle('active', k === i); });
    if (caption) caption.textContent = slides[i].getAttribute('data-caption') || '';
  }
  root.querySelector('.prev').addEventListener('click', function () { show(i - 1); });
  root.querySelector('.next').addEventListener('click', function () { show(i + 1); });
  dots.forEach(function (d, k) { d.addEventListener('click', function () { show(k); }); });

  // keyboard: left/right when the carousel has focus
  root.setAttribute('tabindex', '0');
  root.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') { show(i - 1); e.preventDefault(); }
    else if (e.key === 'ArrowRight') { show(i + 1); e.preventDefault(); }
  });

  // touch swipe on mobile
  var x0 = null;
  var frame = root.querySelector('.carousel-frame');
  frame.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
  frame.addEventListener('touchend', function (e) {
    if (x0 === null) return;
    var dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 40) show(dx < 0 ? i + 1 : i - 1);
    x0 = null;
  });
})();
