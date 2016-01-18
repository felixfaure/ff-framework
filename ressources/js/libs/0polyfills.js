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

//array.prototype.indexOf
if (!Array.prototype.indexOf) {
	Array.prototype.indexOf = function(searchElement, fromIndex) {
		var k;
		if (this == null) {
			throw new TypeError('"this" is null or not defined');
		}

		var O = Object(this);

		var len = O.length >>> 0;
		if (len === 0) {
			return -1;
		}

		var n = +fromIndex || 0;
		if (Math.abs(n) === Infinity) {
			n = 0;
		}

		if (n >= len) {
			return -1;
		}

		k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

		while (k < len) {
		if (k in O && O[k] === searchElement) {
		return k;
		}
		k++;
		}
		return -1;
	};
}

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

//textContent (IE8)
if (Object.defineProperty && Object.getOwnPropertyDescriptor && Object.getOwnPropertyDescriptor(Element.prototype, "textContent") && !Object.getOwnPropertyDescriptor(Element.prototype, "textContent").get) {
	(function() {
		var innerText = Object.getOwnPropertyDescriptor(Element.prototype, "innerText");
		Object.defineProperty(Element.prototype, "textContent", {
			get: function() {
				return innerText.get.call(this);
			},
			set: function(s) {
				return innerText.set.call(this, s);
			}
		});
	})();
}
