(function(global) {

  function parseHTML(str,single) {
    var frag = document.createDocumentFragment();
    var tmp = frag.appendChild(document.createElement('div'));
    tmp.innerHTML = str;
    return single ? tmp.childNodes[0] : tmp.childNodes;
  }

  if(global.ff) global.ff.parseHTML = parseHTML;
  else global.ff = { "parseHTML": parseHTML };

})(this);
