(function(global) {

  function siblings(el) {
    return Array.prototype.filter.call(el.parentNode.children, function(child){
      return child !== el;
    });
  }

  if(global.ff) global.ff.siblings = siblings;
  else global.ff = { "siblings": siblings };

})(this);
