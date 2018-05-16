(function (global) {

  'use strict';

  function forEach(elements, fn) {
    if(!elements || Array.isArray(elements) && !elements.length) return;
    else if(!elements.length) fn(elements, i);
    else for (var i = 0; i < elements.length; i++) fn(elements[i], i);
  }

  var hasClass = function( el, c ) {
    return el.classList.contains( c );
  };
  var addClass = function( el, c ) {
    forEach(el, function(elem, i){
      elem.classList.add( c );
    });
  };
  var removeClass = function( el, c ) {
    forEach(el, function(elem, i){
      elem.classList.remove( c );
    });
  };

  function toggleClass( el, c ) {
    forEach(el, function(elem, i){
      var fn = hasClass( elem, c ) ? removeClass : addClass;
      fn( elem, c );
    });
  }

  var ffclass = {
    has: hasClass,
    add: addClass,
    remove: removeClass,
    toggle: toggleClass
  };

  // Exports in global environment
  global.ffclass = ffclass;

})(this);
