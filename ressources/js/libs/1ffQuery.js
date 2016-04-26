/*

** => Need polyfill

Javascript IE9+ :
=================
Arrays:
-------
Array.isArray()
Array.prototype.concat()
Array.prototype.every()
Array.prototype.filter()
Array.prototype.forEach
Array.prototype.indexOf()
Array.prototype.lastIndexOf()
Array.prototype.join()
Array.prototype.map()
Array.prototype.pop()
Array.prototype.shift()
Array.prototype.push()
Array.prototype.unshift()
Array.prototype.reduce()
Array.prototype.reduceRight()
Array.prototype.reverse()
Array.prototype.slice()
Array.prototype.some()
Array.prototype.sort()
Array.prototype.splice()
**Array.prototype.fill()
**Array.prototype.find()
**Array.prototype.findIndex()
**Array.prototype.includes()


Strings:
--------
**String.prototype.includes()


Objects:
--------
Object.keys()
Object.prototype.hasOwnProperty()
**Object.is()


Elements:
---------
Element.getElementsByClassName()
Element.getElementsByTagName()
Element.querySelector()
Element.querySelectorAll()
Node.childNodes //All node (textNode, comment, etc.)
Node.parentNode
Node.firstChild //All node
Node.lastChild //All node
ParentNode.children //Only Element (div, h1, etc.)
ParentNode.firstElementChild //Only Element
ParentNode.lastElementChild //Only Element
Node.nextElementSibling
Node.previousElementSibling
**Element.closest()
ParentNode.childElementCount
Node.contains
**Element.matches()

Element.insertAdjacentHTML() //beforebegin, afterbegin, beforeend, afterend
Element.insertBefore()
**ChildNode.remove()

Element.clientHeight, //padding
Element.clientWidth //padding
Element.getBoundingClientRect() //left, top, right, bottom, width, height
Element.scrollHeight
Element.scrollWidth
Element.scrollTop
Element.scrollLeft

Element.innerHTML
Element.outerHTML
Node.textContent

Node.nodeName
Element.tagName //in the uppercase form
Element.className
**Element.classList
Element.id
Element.getAttribute()
Element.setAttribute()
Element.hasAttribute()
Element.removeAttribute()


Events:
-------
element.addEventListener
element.removeEventListener
element.dispatchEvent


Window:
-------
Window.devicePixelRatio //IE11+
window.document
window.location
window.navigator

window.innerHeight
window.innerWidth
Window.outerHeight
Window.outerWidth

Window.scrollMaxX
Window.scrollMaxY
Window.scrollX
Window.scrollY
window.scrollTo()
Window.scrollBy()
Window.scrollByLines()

window.alert()
window.confirm()
window.prompt()

window.setInterval()
window.clearInterval()
window.setTimeout()
window.clearTimeout()

window.getComputedStyle()
Window.print()
**window.matchMedia()
**Window.requestAnimationFrame()

*/

(function(global) {
  //NodeList to array
  function toArray(list) {
    return list ? Array.prototype.slice.call(list) : [];
  }

  //Select only the first node (or #id)
  function $(selector, container) {
    if (selector.indexOf('#') === 0) return document.getElementById(selector.substr(1, selector.length));
    return (container || document).querySelector(selector);
  };

  //Select all the node and convert to array
  function $$(selector, container) {
    return toArray( (container || document).querySelectorAll(selector) );
  }

  //Siblings
  function siblings(el) {
    return Array.prototype.filter.call(el.parentNode.children, function(child){
      return child !== el;
    });
  }

  //Ajax
  function ajax(args) {
    // args { url, params, json, method, before, success, error, always }
    if(args.before) {
      args.before();
    }
    args.params = args.params ? ((args.url.indexOf('?') === -1 ? '?' : '&') + args.params) : '';
    var request = new XMLHttpRequest();
    request.open(args.method, encodeURI(args.url + args.params), true);
    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        // Success!
        var data = args.json ? JSON.parse(request.responseText) : request.responseText;
        if(args.success) {
          args.success(data);
        }
        if(args.always) {
          args.always(data);
        }
      } else {
        // We reached our target server, but it returned an error
        if(args.error) {
          args.error();
        }
        if(args.always) {
          args.always(false);
        }
      }
    };
    request.onerror = function() {
      // There was a connection error of some sort
      if(args.error) {
        args.error();
      }
      if(args.always) {
        args.always(false);
      }
    };
    request.send();
  }

  global.$ = $;
  global.$$ = $$;
  global.ffquery = {
    "toArray": toArray,
    "siblings": siblings,
    "ajax": ajax
  };

})(this);
