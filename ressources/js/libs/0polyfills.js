//Closest & matches
(function (ELEMENT) {
	ELEMENT.matches = ELEMENT.matches || ELEMENT.mozMatchesSelector || ELEMENT.msMatchesSelector || ELEMENT.oMatchesSelector || ELEMENT.webkitMatchesSelector || function matches(selector) {
		var element = this,
		elements = (element.document || element.ownerDocument).querySelectorAll(selector),
		index = 0;
		while (elements[index] && elements[index] !== element) {
			++index;
		}
		return elements[index] ? true : false;
	};

	ELEMENT.closest = ELEMENT.closest || function closest(selector) {
		var element = this;
		while (element) {
			if (element.matches(selector)) {
				break;
			}
			element = element.parentElement;
		}
		return element;
	};
}(Element.prototype));


//Remove
(function (ELEMENT) {
	ELEMENT.remove = ELEMENT.remove || function remove() {
		if (this.parentNode) {
            this.parentNode.removeChild(this);
        }
	};
}(Element.prototype));


// Prepend
// Source: https://github.com/jserz/js_piece/blob/master/DOM/ParentNode/prepend()/prepend().md
(function (arr) {
  arr.forEach(function (item) {
    if (item.hasOwnProperty('prepend')) {
      return;
    }
    Object.defineProperty(item, 'prepend', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function prepend() {
        var argArr = Array.prototype.slice.call(arguments),
          docFrag = document.createDocumentFragment();

        argArr.forEach(function (argItem) {
          var isNode = argItem instanceof Node;
          docFrag.appendChild(isNode ? argItem : document.createTextNode(String(argItem)));
        });

        this.insertBefore(docFrag, this.firstChild);
      }
    });
  });
})([Element.prototype, Document.prototype, DocumentFragment.prototype]);


// Append
// Source: https://github.com/jserz/js_piece/blob/master/DOM/ParentNode/append()/append().md
(function (arr) {
  arr.forEach(function (item) {
    if (item.hasOwnProperty('append')) {
      return;
    }
    Object.defineProperty(item, 'append', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function append() {
        var argArr = Array.prototype.slice.call(arguments),
          docFrag = document.createDocumentFragment();

        argArr.forEach(function (argItem) {
          var isNode = argItem instanceof Node;
          docFrag.appendChild(isNode ? argItem : document.createTextNode(String(argItem)));
        });

        this.appendChild(docFrag);
      }
    });
  });
})([Element.prototype, Document.prototype, DocumentFragment.prototype]);


// Before
// from: https://github.com/jserz/js_piece/blob/master/DOM/ChildNode/before()/before().md
(function (arr) {
  arr.forEach(function (item) {
    if (item.hasOwnProperty('before')) {
      return;
    }
    Object.defineProperty(item, 'before', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function before() {
        var argArr = Array.prototype.slice.call(arguments),
          docFrag = document.createDocumentFragment();

        argArr.forEach(function (argItem) {
          var isNode = argItem instanceof Node;
          docFrag.appendChild(isNode ? argItem : document.createTextNode(String(argItem)));
        });

        this.parentNode.insertBefore(docFrag, this);
      }
    });
  });
})([Element.prototype, CharacterData.prototype, DocumentType.prototype]);


// After
//from: https://github.com/jserz/js_piece/blob/master/DOM/ChildNode/after()/after().md
(function (arr) {
  arr.forEach(function (item) {
    if (item.hasOwnProperty('after')) {
      return;
    }
    Object.defineProperty(item, 'after', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function after() {
        var argArr = Array.prototype.slice.call(arguments),
          docFrag = document.createDocumentFragment();

        argArr.forEach(function (argItem) {
          var isNode = argItem instanceof Node;
          docFrag.appendChild(isNode ? argItem : document.createTextNode(String(argItem)));
        });

        this.parentNode.insertBefore(docFrag, this.nextSibling);
      }
    });
  });
})([Element.prototype, CharacterData.prototype, DocumentType.prototype]);


// // replaceWith
// // from: https://github.com/jserz/js_piece/blob/master/DOM/ChildNode/replaceWith()/replaceWith().md
// (function (arr) {
//   arr.forEach(function (item) {
//     if (item.hasOwnProperty('replaceWith')) {
//       return;
//     }
//     Object.defineProperty(item, 'replaceWith', {
//       configurable: true,
//       enumerable: true,
//       writable: true,
//       value: function replaceWith() {
//         var argArr = Array.prototype.slice.call(arguments),
//           docFrag = document.createDocumentFragment();
//
//         argArr.forEach(function (argItem) {
//           var isNode = argItem instanceof Node;
//           docFrag.appendChild(isNode ? argItem : document.createTextNode(String(argItem)));
//         });
//
//         this.parentNode.replaceChild(docFrag, this);
//       }
//     });
//   });
// })([Element.prototype, CharacterData.prototype, DocumentType.prototype]);


//RequestAnimationFrame
//https://gist.github.com/paulirish/1579671
(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());


// //Fill
// //https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/fill
// if (![].fill) {
//   Array.prototype.fill = function(valeur) {
//
//     // Steps 1-2.
//     var O = Object(this);
//
//     // Steps 3-5.
//     var len = parseInt(O.length);
//
//     // Steps 6-7.
//     var debut = arguments[1];
//     var debutRelatif = parseInt(debut) || 0;
//
//     // Step 8.
//     var k = debutRelatif < 0
//             ? Math.max(len + debutRelatif, 0)
//             : Math.min(debutRelatif, len);
//
//     // Steps 9-10.
//     var fin = arguments[2];
//     var finRelative = fin === undefined
//                       ? len
//                       : (parseInt(fin) || 0);
//
//     // Step 11.
//     var final = finRelative < 0
//                 ? Math.max(len + finRelative, 0)
//                 : Math.min(finRelative, len);
//
//     // Step 12.
//     for (; k < final; k++) {
//         O[k] = valeur;
//     }
//
//     // Step 13.
//     return O;
//   };
// }


// //Find
// //https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/find
// if (!Array.prototype.find) {
//   Array.prototype.find = function(predicate) {
//     if (this == null) {
//       throw new TypeError('Array.prototype.find a été appelé sur null ou undefined');
//     }
//     if (typeof predicate !== 'function') {
//       throw new TypeError('predicate doit être une fonction');
//     }
//     var list = Object(this);
//     var length = list.length >>> 0;
//     var thisArg = arguments[1];
//     var value;
//
//     for (var i = 0; i < length; i++) {
//       value = list[i];
//       if (predicate.call(thisArg, value, i, list)) {
//         return value;
//       }
//     }
//     return undefined;
//   };
// }


// //FindIndex
// //https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/findIndex
// if (!Array.prototype.findIndex) {
//   Array.prototype.findIndex = function(predicate) {
//     if (this == null) {
//       throw new TypeError('Array.prototype.findIndex appelé sur null ou undefined');
//     }
//     if (typeof predicate !== 'function') {
//       throw new TypeError('predicate doit être une fonction');
//     }
//     var list = Object(this);
//     var length = list.length >>> 0;
//     var thisArg = arguments[1];
//     var value;
//
//     for (var i = 0; i < length; i++) {
//       value = list[i];
//       if (predicate.call(thisArg, value, i, list)) {
//         return i;
//       }
//     }
//     return -1;
//   };
// }


// //Includes
// //https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/includes
// if (!Array.prototype.includes) {
//   Array.prototype.includes = function(searchElement /*, fromIndex*/ ) {
//     'use strict';
//     var O = Object(this);
//     var len = parseInt(O.length) || 0;
//     if (len === 0) {
//       return false;
//     }
//     var n = parseInt(arguments[1]) || 0;
//     var k;
//     if (n >= 0) {
//       k = n;
//     } else {
//       k = len + n;
//       if (k < 0) {k = 0;}
//     }
//     var currentElement;
//     while (k < len) {
//       currentElement = O[k];
//       if (searchElement === currentElement ||
//          (searchElement !== searchElement && currentElement !== currentElement)) { {
//         // NaN !== NaN
//         return true;
//       }
//       k++;
//     }
//     return false;
//   };
// }


// //is
// //https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Object/is
// if (!Object.is) {
//   Object.is = function(v1, v2) {
//     // Algorithme SameValue
//     if (v1 === v2) { //Étapes 1-5, 7-10
//       //Étapes 6.b-6.b +0 !=-0
//       return v1 !== 0 || 1 / v1 === 1 / v2;
//     } else {
//       //Étapes 6.a: NaN == NaN
//       return v1 !== v1 && v2 !== v2;
//     }
//   };
// }


// //String includes
// //https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String/includes
// if ( !String.prototype.includes ) {
//   String.prototype.includes = function(search, start) {
//     'use strict';
//     if (typeof start !== 'number') {
//       start = 0;
//     }
//
//     if (start + search.length > this.length) {
//       return false;
//     } else {
//       return this.indexOf(search,start) !== -1;
//     }
//   };
// }


//ClassList (IE9-, opera mini)
(function () {

	if (typeof window.Element === "undefined" || "classList" in document.documentElement) return;

	var prototype = Array.prototype,
	    push = prototype.push,
	    splice = prototype.splice,
	    join = prototype.join;

	function DOMTokenList(el) {
	  this.el = el;
	  // The className needs to be trimmed and split on whitespace
	  // to retrieve a list of classes.
	  var classes = el.className.replace(/^\s+|\s+$/g,'').split(/\s+/);
	  for (var i = 0; i < classes.length; i++) {
	    push.call(this, classes[i]);
	  }
	};

	DOMTokenList.prototype = {
	  add: function(token) {
	    if(this.contains(token)) return;
	    push.call(this, token);
	    this.el.className = this.toString();
	  },
	  contains: function(token) {
	    return this.el.className.indexOf(token) != -1;
	  },
	  item: function(index) {
	    return this[index] || null;
	  },
	  remove: function(token) {
	    if (!this.contains(token)) return;
	    for (var i = 0; i < this.length; i++) {
	      if (this[i] == token) break;
	    }
	    splice.call(this, i, 1);
	    this.el.className = this.toString();
	  },
	  toString: function() {
	    return join.call(this, ' ');
	  },
	  toggle: function(token) {
	    if (!this.contains(token)) {
	      this.add(token);
	    } else {
	      this.remove(token);
	    }

	    return this.contains(token);
	  }
	};

	window.DOMTokenList = DOMTokenList;

	function defineElementGetter (obj, prop, getter) {
    if (Object.defineProperty) {
      Object.defineProperty(obj, prop,{
        get : getter
      });
    } else {
      obj.__defineGetter__(prop, getter);
    }
	}

	defineElementGetter(Element.prototype, 'classList', function () {
	  return new DOMTokenList(this);
	});

})();
