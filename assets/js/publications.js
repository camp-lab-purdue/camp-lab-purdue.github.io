(function () {
  var bar = document.getElementById('pub-filters');
  if (!bar) return;

  // Build a slug -> human label map from the rendered tag pills.
  var labelBySlug = {};
  document.querySelectorAll('.pub-tag').forEach(function (el) {
    var slug = null;
    el.classList.forEach(function (c) { if (c.indexOf('tag-') === 0) slug = c.slice(4); });
    if (slug) labelBySlug[slug] = el.textContent.trim();
  });

  var slugs = Object.keys(labelBySlug).sort(function (a, b) {
    return labelBySlug[a].localeCompare(labelBySlug[b]);
  });
  if (slugs.length === 0) { bar.style.display = 'none'; return; }

  function chip(label, val, active) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'chip' + (active ? ' active' : '');
    b.textContent = label;
    b.dataset.val = val;
    bar.appendChild(b);
  }
  chip('All', '__all', true);
  slugs.forEach(function (s) { chip(labelBySlug[s], s, false); });

  function apply(val) {
    document.querySelectorAll('.pub-year').forEach(function (h) {
      var ol = h.nextElementSibling;
      while (ol && ol.tagName !== 'OL') ol = ol.nextElementSibling;
      var visible = 0;
      if (ol) {
        ol.querySelectorAll('.pub').forEach(function (p) {
          var tags = (p.dataset.tags || '').split('|');
          var show = (val === '__all') || tags.indexOf(val) >= 0;
          var li = p.closest('li') || p;
          li.style.display = show ? '' : 'none';
          if (show) visible++;
        });
        ol.style.display = visible > 0 ? '' : 'none';
      }
      h.style.display = visible > 0 ? '' : 'none';
    });
  }

  bar.addEventListener('click', function (e) {
    var b = e.target.closest('button');
    if (!b) return;
    bar.querySelectorAll('button').forEach(function (x) { x.classList.remove('active'); });
    b.classList.add('active');
    apply(b.dataset.val);
  });
})();
