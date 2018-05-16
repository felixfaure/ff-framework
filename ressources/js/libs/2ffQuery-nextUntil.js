(function(global) {

  function nextUntil(el, selector) {
    var nextUntil = [],
        until = true;
    while (el = el.nextElementSibling) {
      (until && el && !el.matches(selector)) ? nextUntil.push(el) : until = false;
    }
    return nextUntil;
  }

  if(global.ff) global.ff.nextUntil = nextUntil;
  else global.ff = { "nextUntil": nextUntil };

})(this);
