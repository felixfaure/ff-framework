//Si jQuery
// ;(function($) {
//
// })(jQuery);

(function(window) {
    //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
    //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
    //Helper functions
    //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
    //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
    //Selection d'un élément
    function $(selector, container) {
        if (selector.indexOf('#') === 0) return document.getElementById(selector.substr(1, selector.length));
        return (container || document).querySelector(selector);
    };
    //Selection d'une list d'élément (nodeList)
    function $$(selector, container) {
        return (container || document).querySelectorAll(selector);
    }

    //Parcour une liste d'éléments
    function forEachEl(elements, fn) {
        if(!elements) return;
        for (var i = 0; i < elements.length; i++)
        fn(elements[i], i);
        // Array.prototype.forEachEl.call(elements, fn(elements[i], i));
    }

    //Parcour les éléments d'un tableau
    function forEach(array, fn) {
        if (array) {
            for (var i = 0, len = array.length; i < len; i++)
            fn(array[i], i);
        }
    }

    //Ajout un écouteur d'évenement (compatible IE8-)
    function addEventListener(el, eventName, handler) {
        if (el.addEventListener) {
            el.addEventListener(eventName, handler, false);
        } else {
            //For IE8-
            el.attachEvent('on' + eventName, function(){
                handler.call(el);
            });
        }
    }
    //Enlève un écouteur d'évenement (compatible IE8-)
    function removeEventListener(el, eventName, handler) {
        if (el.removeEventListener) {
            el.removeEventListener(eventName, handler, false);
        } else {
            //For IE8-
            el.detachEvent('on' + eventName, handler);
        }
    }

    //Next pour IE8 (sinon utilisé el.nextElementSibling)
    function nextElementSibling(el) {
        do { el = el.nextSibling; } while ( el && el.nodeType !== 1 );
        return el;
    }

    //insert after
    function insertAfter(newNode, referenceNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    }


    //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
    //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
    //Variables
    //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
    //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
    var w = window,
        html = document.getElementsByTagName("html")[0], //or document.documentElement
        body = document.getElementsByTagName('body')[0],
        header = $('#header'),
        main = $('#main'),
        windowH = w.innerHeight || document.documentElement.clientHeight || body.clientHeight,
        scrollT = document.body.scrollTop;


    //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
    //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
    //Keys event
    //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
    //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
    // document.addEventListener('keydown', function(e) {
    //     if(e.keyCode == 27) {
    //         //...
    //     }
    // });

    //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
    //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
    //On resize
    //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
    //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
    // function onResize() {
    //     windowH = w.innerHeight || document.documentElement.clientHeight || body.clientHeight;
    // }
    // window.addEventListener('resize', onResize, false);

})(window);
