var scrollnav = (function () {
	'use strict';

  var content, title, row, nav, hover, rows, offset;

  var init = function(options) {
    if(!options) options = {}
    nav = options.nav || document.getElementById('nav');
    content = options.content || '.nav-content';
    title = options.title || '.title';
    row = options.row || '.row';
    offset = options.offset || 0;

    hover = document.createElement('div');
    hover.id = 'hover';
    hover.className = 'hover';
    document.body.appendChild(hover);

    rows = document.querySelectorAll(row);
    var padding = Math.floor(window.screen.height / (rows.length + 1) / 8);
    for(var i = 0; i < rows.length; i++) {
      var li = document.createElement('li');
      li.innerHTML = '&#9900;';
      li.style.padding = padding + 'px'
      li.dataset.id = i;
      li.dataset.title = rows[i].querySelector(title).innerText;

      if(i === 0) {
        li.innerHTML = '&#8962;';
        li.className = 'selected';
      }
      nav.appendChild(li);
    }

    nav.addEventListener('touchstart', start, false);
    nav.addEventListener('mousedown', start, false);
    nav.addEventListener('touchend', end, false);
    nav.addEventListener('mouseup', end, false);
    nav.addEventListener('touchmove', move, false);
    nav.addEventListener('mousemove', move, false);
    document.addEventListener('scroll', debounce(scroll, 50), false);
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
			document.body.scrollTop = rows[current].getBoundingClientRect().top + window.pageYOffset - 50;
    }
  }

  function scroll() {
    // for(var r = 0; r < rows.length; r++) {
    //   // console.log('adsf', rows[r].querySelector('.title').classList.remove)
    //   rows[r].querySelector('.title').classList.remove('sticky');
    // }
    // for(var c = 0; r < nav.children.length; c++) {
    //   // console.log('adsf', rows[r].querySelector('.title').classList.remove)
    //   nav.children[c].className = '';
    // }
    //
    for(var s = 0; s < nav.childNodes.length; s++) {
      nav.childNodes[s].className = '';
    }
    var sTop = document.body.scrollTop;
    for(var r in rows) {
      // console.log(r, rows[r], rows[r].scrollHeight, document.body.scrollTop)
      if(rows[r].getBoundingClientRect().top + window.pageYOffset - offset > sTop) {
        // el.getBoundingClientRect().top + window.pageYOffset - el.ownerDocument.documentElement.clientTop
        // console.log('hey', r, rows[r]/)
        break;
      }
    }

    // document.getElementById('thetitle').innerText = sTop < offset ? '' : rows[r-1].querySelector('.title').innerText.trim();
    nav.children[r-1].className = 'selected';
    // console.log(rows[r-1].innerText.trim())
    // if(document.body.scrollTop >
    // var window_top = $(window).scrollTop() + 12; // the "12" should equal the margin-top value for nav.stick
    // var div_top = $('#nav-anchor').offset().top;
    //     if (window_top > div_top) {
    //         $('nav').addClass('stick');
    //     } else {
    //         $('nav').removeClass('stick');
    //     }
  }

  var debounce = function(func, wait, immediate) {
    var timeout, result;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) result = func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) result = func.apply(context, args);
      return result;
    };
  };

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

  return {
    init: init
  }
})();
