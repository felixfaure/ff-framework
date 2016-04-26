(function (global) {

    'use strict';

    function forEach(elements, fn) {
        if(!elements) return;
        else if(!elements.length) fn(elements, i);
        else for (var i = 0; i < elements.length; i++) fn(elements[i], i);
    }

    function classReg( className ) {
        return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
    }

    var hasClass, addClass, removeClass;

    if ( 'classList' in document.documentElement ) {
        hasClass = function( el, c ) {
            return el.classList.contains( c );
        };
        addClass = function( el, c ) {
            forEach(el, function(elem, i){
                elem.classList.add( c );
            });
            // el.classList.add( c );
        };
        removeClass = function( el, c ) {
            forEach(el, function(elem, i){
                elem.classList.remove( c );
            });
            // el.classList.remove( c );
        };
    } else {
        hasClass = function( el, c ) {
            return classReg( c ).test( el.className );
        };
        addClass = function( el, c ) {
            forEach(el, function(elem, i){
                if ( !hasClass( elem, c ) ) {
                    elem.className = elem.className + ' ' + c;
                }
            });
            // if ( !hasClass( el, c ) ) {
            //     el.className = el.className + ' ' + c;
            // }
        };
        removeClass = function( el, c ) {
            forEach(el, function(elem, i){
                elem.className = elem.className.replace( classReg( c ), ' ' );
            });
            // el.className = el.className.replace( classReg( c ), ' ' );
        };
    }

    function toggleClass( el, c ) {
        forEach(el, function(elem, i){
            var fn = hasClass( elem, c ) ? removeClass : addClass;
            fn( elem, c );
        });
        // var fn = hasClass( el, c ) ? removeClass : addClass;
        // fn( el, c );
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
