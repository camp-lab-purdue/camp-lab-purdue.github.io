(function () {
  var svg = document.getElementById('hb');
  if (!svg) return;
  var NS = 'http://www.w3.org/2000/svg';
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function front(x) { return 116 - 15 * Math.sin((x + 20) / 85) - 7 * Math.sin((x + 50) / 38); }
  function back(x) { return 58 - 8 * Math.sin((x + 40) / 100) - 4 * Math.sin((x + 12) / 46); }
  function yAt(x, dd) { return back(x) + (front(x) - back(x)) * dd; }
  function scAt(dd) { return 0.36 + 0.52 * dd; }

  var fp = 'M0 156 ';
  for (var x = 0; x <= 632; x += 8) { fp += 'L' + x + ' ' + front(x).toFixed(1) + ' '; }
  fp += 'L632 156 Z';
  document.getElementById('frontH').setAttribute('d', fp);
  var lp = 'M0 ' + (front(0) + 9).toFixed(1) + ' ';
  for (var x = 0; x <= 632; x += 8) { lp += 'L' + x + ' ' + (front(x) + 9).toFixed(1) + ' '; }
  document.getElementById('frontLine').setAttribute('d', lp);

  var trees = document.getElementById('trees');
  [80, 160, 470, 548].forEach(function (bx) {
    var by = yAt(bx, 0.16), sc = 0.62;
    var g = document.createElementNS(NS, 'g');
    g.setAttribute('transform', 'translate(' + bx + ' ' + by.toFixed(1) + ') scale(' + sc + ')');
    g.innerHTML = '<path d="M0 -24 L9 -2 L-9 -2 Z" fill="#6E8C49"/><path d="M0 -31 L7 -12 L-7 -12 Z" fill="#6E8C49"/><rect x="-1.8" y="-2" width="3.6" height="5" fill="#6b4a2c"/>';
    trees.appendChild(g);
  });

  var tent = document.getElementById('tent'), tentDD = 0.58, tx = 505;
  var ty = yAt(tx, tentDD), tentSc = scAt(tentDD) * 1.25;
  tent.setAttribute('transform', 'translate(' + tx + ' ' + ty.toFixed(1) + ') scale(' + tentSc.toFixed(2) + ')');
  tent.innerHTML =
    '<path d="M0 -30 L19 0 L-19 0 Z" fill="#F0997B" stroke="#993C1D" stroke-width="1.8"/>' +
    '<line x1="0" y1="-30" x2="0" y2="0" stroke="#993C1D" stroke-width="1.2"/>' +
    '<path d="M0 -11 L9 0 L-9 0 Z" fill="#4A1B0C"/>' +
    // robot head poking out — matches the header logo; hidden until the robot docks
    '<g id="tentRobot" style="display:none">' +
      '<rect x="-5.5" y="-10.5" width="11" height="10.5" rx="2" fill="#B4B2A9" stroke="#444441" stroke-width="1.1"/>' +
      '<line x1="0" y1="-10.5" x2="0" y2="-14" stroke="#444441" stroke-width="1.1"/>' +
      '<circle cx="0" cy="-15" r="1.5" fill="#D85A30"/>' +
      '<circle cx="-2.4" cy="-5.5" r="1.2" fill="#2C2C2A"/>' +
      '<circle cx="2.4" cy="-5.5" r="1.2" fill="#2C2C2A"/>' +
    '</g>';
  var tentRobot = document.getElementById('tentRobot');

  var robot = document.getElementById('robot');
  robot.innerHTML = '<g id="legL"><rect x="-5" y="-16" width="3.6" height="16" rx="1.6" fill="#7E7C74"/></g><g id="legR"><rect x="1.4" y="-16" width="3.6" height="16" rx="1.6" fill="#7E7C74"/></g><rect x="-11.5" y="-31" width="3" height="11" rx="1.5" fill="#9a988f"/><rect x="8.5" y="-31" width="3" height="11" rx="1.5" fill="#9a988f"/><rect x="-9" y="-34" width="18" height="19" rx="3.5" fill="#B4B2A9" stroke="#5F5E5A" stroke-width="1.2"/><rect x="-4.5" y="-30" width="9" height="6" rx="1.5" fill="#8FB8AB"/><rect x="-7.5" y="-51" width="15" height="17" rx="4" fill="#C2C0B7" stroke="#5F5E5A" stroke-width="1.2"/><circle cx="-3.5" cy="-43" r="1.9" fill="#D85A30"/><circle cx="3.5" cy="-43" r="1.9" fill="#D85A30"/><rect x="-3" y="-39" width="6" height="1.6" rx="0.8" fill="#7E7C74"/><line x1="0" y1="-51" x2="0" y2="-57" stroke="#5F5E5A" stroke-width="1.3"/><circle cx="0" cy="-58" r="2" fill="#D85A30"/>';
  var legL = document.getElementById('legL'), legR = document.getElementById('legR');

  function placeRobot(wx, dd, dir, bob) {
    var sc = scAt(dd);
    robot.setAttribute('transform', 'translate(' + wx.toFixed(1) + ' ' + (yAt(wx, dd) - bob).toFixed(1) + ') scale(' + (dir * sc).toFixed(3) + ' ' + sc.toFixed(3) + ')');
  }

  if (reduce) { placeRobot(300, 0.85, 1, 0); return; }

  var wx = 300, dd = 0.85, twx = 300, tdd = 0.85, dir = 1, phase = 0, pause = 0, inFront = true;
  var goingToTent = false, inTent = false, autoDock = false, tentExitAt = 0;
  function wanderGround() { twx = 40 + Math.random() * 552; tdd = 0.18 + Math.random() * 0.82; }
  function wander() {
    if (Math.random() < 0.4) { goingToTent = true; autoDock = true; twx = tx; tdd = tentDD; }
    else { wanderGround(); }
  }
  function ptOf(e) { var p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; var m = svg.getScreenCTM(); if (!m) return null; return p.matrixTransform(m.inverse()); }

  function enterTent() {
    inTent = true; goingToTent = false;
    robot.style.display = 'none';
    tentRobot.style.display = '';
    if (autoDock) tentExitAt = performance.now() + 2500 + Math.random() * 2500;
  }
  function exitTent(p) {
    inTent = false; autoDock = false;
    tentRobot.style.display = 'none';
    robot.style.display = '';
    wx = tx; dd = tentDD; dir = -1;
    if (p) { twx = Math.max(24, Math.min(608, p.x)); var lo = back(twx), hi = front(twx); tdd = Math.max(0.12, Math.min(1, (p.y - lo) / (hi - lo || 1))); }
    else { wanderGround(); }
    pause = performance.now() + 1600;
  }

  svg.addEventListener('click', function (e) {
    var p = ptOf(e); if (!p) return;
    if (inTent) { exitTent(p); return; }
    goingToTent = false;
    twx = Math.max(24, Math.min(608, p.x));
    var lo = back(twx), hi = front(twx);
    tdd = Math.max(0.12, Math.min(1, (p.y - lo) / (hi - lo || 1)));
    pause = performance.now() + 1600;
  });
  tent.addEventListener('click', function (e) {
    e.stopPropagation();
    if (inTent) return;
    goingToTent = true; autoDock = false; twx = tx; tdd = tentDD; pause = performance.now() + 1e9;
  });

  function loop(now) {
    if (inTent) { if (autoDock && now > tentExitAt) exitTent(null); requestAnimationFrame(loop); return; }
    var dx = twx - wx, ddv = (tdd - dd) * 600, mag = Math.hypot(dx, ddv), moving = mag > 3;
    if (moving) { var k = 2.1 / mag; wx += dx * k; dd += (tdd - dd) * k; phase += 0.28; if (Math.abs(dx) > 0.4) dir = dx > 0 ? 1 : -1; }
    else {
      phase *= 0.86;
      if (goingToTent) { enterTent(); requestAnimationFrame(loop); return; }
      else if (now > pause) { wander(); pause = now + 700 + Math.random() * 1500; }
    }
    var sc = scAt(dd), bob = moving ? Math.abs(Math.sin(phase * 2)) * 1.3 * sc : 0, sw = Math.sin(phase) * 22;
    legL.setAttribute('transform', 'rotate(' + sw + ' -3.2 -16)');
    legR.setAttribute('transform', 'rotate(' + (-sw) + ' 3.2 -16)');
    placeRobot(wx, dd, dir, bob);
    var want = dd >= tentDD;
    if (want !== inFront) { inFront = want; if (want) svg.appendChild(robot); else svg.insertBefore(robot, tent); }
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
})();
