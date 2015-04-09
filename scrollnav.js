function scrollnav(options) {
  var nav = options.nav;
  var nav = document.getElementById('nav');

  var content = options.content || '.nav-content';
  var title = options.title || '.title';
  var row = options.row || '.row';

  var hover = document.createElement('div');
  hover.id = 'hover';
  hover.className = 'hover';
  document.body.appendChild(hover);

  var rows = document.querySelectorAll(row);
  var padding = Math.floor(window.screen.height / (rows.length + 1) / 8);
  for(var i = 0; i < rows.length; i++) {
    var li = document.createElement('li');
    li.innerHTML = '&#9900;';
    li.style.padding = padding + 'px'
    li.dataset.id = rows[i].querySelector(content).className.replace('nav-content ', '');
    li.dataset.title = rows[i].querySelector(title).innerText;
    nav.appendChild(li);
  }

  var current = 0;
  function start(e) {
    e = update(e);
    hover.style.display = 'block';
    if(valid(e)) {
      hover.style.display = 'block';

      if(e.dataset.id === undefined) return;
      e.classList.add('selected')
      current = e.dataset.id;
      hover.innerText = e.dataset.title;
    }
  }

  function move(e) {
    e.preventDefault();
    e = update(e);
    if(valid(e)) {
      hover.style.display = 'block';

      if(e.dataset.id === undefined) return;
      e.classList.add('selected');
      current = e.dataset.id;
      hover.innerText = e.dataset.title;
    }
  }

  function end(e) {
    e = update(e);
    if(valid(e)) {
      document.querySelector('.' + current).parentNode.scrollIntoView();
      window.scrollBy(0, -50)
    }
  }

  function valid(e) {
    return e != null && (e.id === 'nav' || e.parentNode.id === 'nav');
  }

  function update(e) {
    if(e.changedTouches) {
      e = e.changedTouches[0]
    }
    e = document.elementFromPoint(e.clientX, e.clientY);
    hover.style.display = 'none';
    for(var s = 0; s < nav.childNodes.length; s++) {
      nav.childNodes[s].className = '';
    }
    return e;
  }

  nav.addEventListener('touchstart', start, false);
  nav.addEventListener('mousedown', start, false);
  nav.addEventListener('touchend', end, false);
  nav.addEventListener('mouseup', end, false);
  nav.addEventListener('touchmove', move, false);
  nav.addEventListener('mousemove', move, false);
}
