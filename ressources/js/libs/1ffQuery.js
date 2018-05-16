(function(global) {
  //NodeList to array
  function toArray(list) {
    return list ? Array.prototype.slice.call(list) : [];
  }

  //Select only the first node (or #id)
  function $(selector, container) {
    if (!container && selector.indexOf('#') === 0) return document.getElementById(selector.substr(1, selector.length));
    return (container || document).querySelector(selector);
  };

  //Select all the node and convert to array
  function $$(selector, container) {
    return toArray( (container || document).querySelectorAll(selector) );
  }

  global.$ = $;
  global.$$ = $$;
  global.ff = {
    "toArray": toArray
  };

})(this);
