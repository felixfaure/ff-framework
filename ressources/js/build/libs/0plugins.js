// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Place any jQuery/helper plugins in here.

//Reverse array
jQuery.fn.reverse = [].reverse;

//tagName
jQuery.fn.tagName = function() {
    return this.prop("tagName").toLowerCase();
};

//OuterHTML
jQuery.fn.outerHTML = function() {
    // IE, Chrome & Safari will comply with the non-standard outerHTML, all others (FF) will have a fall-back for cloning
    return (!this.length) ? this : (this[0].outerHTML || (
        function(el){
            var div = document.createElement('div');
            div.appendChild(el.cloneNode(true));
            var contents = div.innerHTML;
            div = null;
            return contents;
        }
    )(this[0]));
};

//Exist ?
//console.log($('#elem').exists() ? "exists!" : "doesn't exist!");
jQuery.fn.exists = function(){ return this.length > 0; }

//Fin d'animation/transitions css
//Exemple : $('.item').addClass('disappear').onCSSAnimationEnd(function(){$(this).remove();});
;( function( $, window, document, undefined ) {
    var s = document.body || document.documentElement, s = s.style, prefixAnimation = '', prefixTransition = '';
    if( s.WebkitAnimation == '' )   prefixAnimation  = '-webkit-';
    if( s.MozAnimation == '' )      prefixAnimation  = '-moz-';
    if( s.OAnimation == '' )        prefixAnimation  = '-o-';
    if( s.WebkitTransition == '' )  prefixTransition = '-webkit-';
    if( s.MozTransition == '' )     prefixTransition = '-moz-';
    if( s.OTransition == '' )       prefixTransition = '-o-';

    $.fn.extend({
        onCSSAnimationEnd: function( callback ) {
            var $this = $( this ).eq( 0 );
            $this.one( 'webkitAnimationEnd mozAnimationEnd oAnimationEnd oanimationend animationend', callback );
            if( ( prefixAnimation == '' && !( 'animation' in s ) ) || $this.css( prefixAnimation + 'animation-duration' ) == '0s' ) callback();
            return this;
        },
        onCSSTransitionEnd: function( callback ) {
            var $this = $( this ).eq( 0 );
            $this.one( 'webkitTransitionEnd mozTransitionEnd oTransitionEnd otransitionend transitionend', callback );
            if( ( prefixTransition == '' && !( 'transition' in s ) ) || $this.css( prefixTransition + 'transition-duration' ) == '0s' ) callback();
            return this;
        }
    });
})( jQuery, window, document );
