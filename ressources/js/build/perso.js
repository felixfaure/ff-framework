;(function($) {
  //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  //Variables
  //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  var w = window,
      d = document,
      $window = $(w),
      $html = $('html'),
      $body = $('body'),
      $header = $('#header'),
      $nav = $('#nav'),
      $main = $('#main'),
      $stickyBars = $main.find('.stickyBar'),
      headerH,
      windowH,
      windowW,
      scrollT,
      scrollUp = false,
      $adminBar = $('#wpadminbar'),
      has_adminBar = $body.hasClass('admin-bar'),
      adminBar_h = 0,
      serveur_test = d.location.hostname == "localhost",
      is_requeting = false,
      is_menu_mobile = false,
      $triggerMobile = $('#triggerMobile'),
      sauvScroll = 0,
      vhCssVar = false;

  $html.addClass('is-js-init');


  //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  //Dimensions
  //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  function update_dimensions() {
    windowH = window.innerHeight;
    windowW = $window.width();
    headerH = $header.length ? $header.outerHeight() : 0;
    var old_is_menu_mobile = is_menu_mobile;
    is_menu_mobile = $triggerMobile.is(':visible');
    if(old_is_menu_mobile != is_menu_mobile) {
      menu_mobile_change(old_is_menu_mobile,is_menu_mobile);
    }
    update_adminbar();
    update_scroll();
  }
  update_dimensions();

  function update_scroll() {
    if($window.scrollTop() < scrollT) {
      scrollUp = true;
    } else {
      scrollUp = false;
    }
    scrollT = $window.scrollTop();
  }

  function update_adminbar() {
    adminBar_h = parseInt($html.css("margin-top")) + parseInt($body.css("margin-top"));
  }

  function menu_mobile_change(o, n) {
    remove_focus_trap_aria_hidden();
    if(!o && n) {
      // acc_mobile_init();
      // selects_destroy();
    } else if(o && !n) {
      // acc_mobile_reset();
      // init_selects();
    }
  }

  function setCssVarVH() {
    if(!vhCssVar || Math.abs(vhCssVar - windowH) > 250) {
      vhCssVar = windowH;
      document.documentElement.style.setProperty('--vh', windowH+'px');
    }
  }


  //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  //Helper functions
  //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  // Récupère les variables d'une url
  function getQueryVariables(url) {
    var query = url.split("?");
    var vars = (query.length > 1 ? query[1] : '').split("&");
    var returnVars = {};
    for (var i = 0 ; i < vars.length ; i++) {
      var pair = vars[i].split("=");
      returnVars[pair[0]] = pair[1] ? pair[1] : null;
    }
    return returnVars;
  }

  //Debounce
  function debounce(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };

  //Load js async
  function async(script, callback) {
    var s = document.createElement('script'),
        head = document.getElementsByTagName('head')[0];
    s.type = "text/javascript";
    s.async = true;
    s.defer = true;
    s.src = script;
    if (typeof callback == 'function') { s.addEventListener('load', function (e) { callback.call(); }, false); }
    head.appendChild(s);
  }

  //pad number
  function pad(number) {
    if ( number < 10 ) {
      return '0' + number;
    }
    return number;
  }


  //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  //Scroll jusqu'a un element
  //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  function scrollToEl($el,marge) {
    var offsetEl = 0;
    if(marge) {
      offsetEl -= marge;
    }
    if($el.length) {
      offsetEl += $el.offset().top - adminBar_h;
      // Sticky bar
      if(!is_menu_mobile && $stickyBars.length && ($el.closest('[data-fixed-container]').length || $el.closest('.page').length)) {
        offsetEl -= $stickyBars.innerHeight();
      }
      offsetEl += 2;
      var elMargin = parseInt($el.css('marginTop'));
      var elPadding = parseInt($el.css('paddingTop'));
      if(!elPadding && elMargin) {
        offsetEl -= elMargin;
      } else if(!elPadding) {
        elMargin = parseInt($el.prev().css('marginBottom'));
        elPadding = parseInt($el.prev().css('paddingBottom'));
        if(elPadding) {
          offsetEl -= elPadding;
        } else if(elMargin) {
          offsetEl -= elMargin;
        }
      }
    }
    // Menu masqué qui va slide down
    // if(offsetEl < scrollT && offsetEl > 2 * headerH) {
    //   offsetEl -= $header.outerHeight();
    // }
    scrollToOffset(offsetEl);
  }

  function scrollToOffset(offsetEl) {
    $('html, body').animate({
      scrollTop: offsetEl
    }, 300);
  }

  function scroller_init($cont) {
    $cont = $cont && $cont.length ? $cont : $body;
    var $directElToScroll = $cont.find('.js-scroll-to-me').first();
    if($directElToScroll.length) scrollToEl($directElToScroll);

    $cont.find('a.js-scroller[href^="#"]').on('click', function(event) {
      if(whatInput.ask() === 'keyboard') return;
      var $this = $(this);
      var $target = $($this.attr('href'));
      if($target.length && $this.attr('data-scroll-parent')) {
        $target = $target.closest($this.attr('data-scroll-parent'));
      }
      if($target.length) {
        event.preventDefault();
        scrollToEl($target);
      }
    });
  }
  scroller_init();


  //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  //Supports
  //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  // if(!support.objectFit) ffclass.add(html,'no-objectfit');
  // if(!support.objectPosition) ffclass.add(html,'no-objectposition');

  var transformProp;
  (function () {
    var style = document.createElement('a').style;
    var prop;
    if (style[prop = 'webkitTransform'] !== undefined) {
      transformProp = prop;
    }
    if (style[prop = 'msTransform'] !== undefined) {
      transformProp = prop;
    }
    if (style[prop = 'transform'] !== undefined) {
      transformProp = prop;
    }
  }());


  //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  //Focus trap
  //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  var $lastFocusedElement = false;
  var is_focus_traped = false;

  function set_focus_trap($cont) {
    if(!$cont || !$cont.length) return;
    $lastFocusedElement = $(document.activeElement);
    update_content_focus_trap($cont);
    set_focus_trap_aria_hidden($cont);
    is_focus_traped = true;
  }

  function update_content_focus_trap($cont) {
    if(!$cont || !$cont.length) return;
    var $focusableElements = $cont.find('a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled])').not('[tabindex="-1"]');
    var $firstTabStop = $focusableElements.first();
    var $lastTabStop = $focusableElements.last();
    $firstTabStop.focus();
    $cont.off('keydown').on('keydown', function(event) {
      if (event.keyCode === 9) { //Tab
        if (event.shiftKey) { //Shift + Tab
          if (document.activeElement === $firstTabStop.get(0)) {
            event.preventDefault();
            $lastTabStop.focus();
          }
        } else { //just Tab
          if (document.activeElement === $lastTabStop.get(0)) {
            event.preventDefault();
            $firstTabStop.focus();
          }
        }
      }
    });
  }

  function remove_focus_trap($cont) {
    if(!$cont || !$cont.length) return;
    $cont.off('keydown');
    remove_focus_trap_aria_hidden();
    if($lastFocusedElement && $lastFocusedElement.length) {
      $lastFocusedElement.focus();
    }
    is_focus_traped = false;
  }

  function set_focus_trap_aria_hidden($el) {
    $el.siblings(':not(script):not(link):not([aria-hidden])').attr('aria-hidden', 'true').addClass('is-hidden-by-focus-trap');
    // if($el.is('.nav')) {
    //   $el.closest('.header').siblings(':not(script):not(link):not([aria-hidden])').not('.toolbar').attr('aria-hidden', 'true').addClass('is-hidden-by-focus-trap');
    //   $('#toolbar').find('.toolbar_navi:not(.toolbar_navi-navmobile)').attr('aria-hidden', 'true').addClass('is-hidden-by-focus-trap');
    // }
  }

  function remove_focus_trap_aria_hidden() {
    $body.find('.is-hidden-by-focus-trap').removeAttr('aria-hidden').removeClass('is-hidden-by-focus-trap');
  }


  //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  //Menu
  //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  // var $nav_links = $nav.find('.nav_i > a');
  // var $nav_items = $nav.find('.nav_i');
  // menu_set_a11y();
  // $nav_links.on('click', trigger_nav_link);
  // $header.find('.nav_sub').append('<button class="header_close js-close-menu" type="button"><span class="icon-close"></span><span class="srOnly">'+str.close_nav+'</span></button>');
  // $header.on('click', '.js-close-menu', function(event) {
  //   event.preventDefault();
  //   closeSubMenu(true);
  // });
  //
  // function trigger_nav_link(event) {
  //   var $this = $(this);
  //   var $link_item = $this.closest('.nav_i');
  //   var $sub_menu = $link_item.find('.nav_sub');
  //   if(!$sub_menu.length) {
  //     closeSubMenu(true);
  //     return;
  //   }
  //   event.preventDefault();
  //   if($link_item.hasClass('is-open')) {
  //     $link_item.removeClass('is-open');
  //     $html.removeClass('has-subnavOpen');
  //     if(!is_menu_mobile) {
  //       window.scrollTo(0, sauvScroll);
  //     }
  //     remove_focus_trap($sub_menu);
  //   } else {
  //     if(!$html.hasClass('has-subnavOpen')) {
  //       if(!is_menu_mobile) {
  //         sauvScroll = scrollT;
  //       }
  //     } else {
  //       $nav_items.removeClass('is-open');
  //     }
  //     $link_item.addClass('is-open');
  //     $html.addClass('has-subnavOpen');
  //     set_focus_trap($sub_menu);
  //     $sub_menu.find('input').focus();
  //   }
  //   menu_update_a11y();
  // }
  //
  // function closeSubMenu(resetTrap) {
  //   if($html.hasClass('has-subnavOpen')) {
  //     if(resetTrap) {
  //       remove_focus_trap($nav_items.filter('.is-open').find('.nav_sub'));
  //     }
  //     $html.removeClass('has-subnavOpen');
  //     $nav_items.removeClass('is-open');
  //     if(!is_menu_mobile) {
  //       window.scrollTo(0, sauvScroll);
  //     }
  //     menu_update_a11y();
  //   }
  // }
  //
  // function menu_set_a11y() {
  //   $nav.find('.nav_wrapper').attr({
  //     'role': 'menubar',
  //     'aria-label': str.main_nav
  //   });
  //   $nav_links.each(function(idx, el) {
  //     var $el = $(el);
  //     $el.attr('role', 'menuitem').filter(':not(:last-child)').attr({
  //       'aria-haspopup': 'true',
  //       'aria-expanded': 'false',
  //       'aria-controls': 'menu-item-'+(idx+1)
  //     }).next('.nav_sub').attr({
  //       'aria-hidden': 'true',
  //       'id': 'menu-item-'+(idx+1)
  //     }).find('ul').attr('role', 'menu').find('li').attr('role', 'none').children('a').attr('role', 'menuitem');
  //   });
  //   $nav_items.attr('role', 'none');
  // }
  //
  // function menu_update_a11y() {
  //   $nav_links.filter(':not(:last-child)').closest('.nav_i').each(function(index, el) {
  //     var $el = $(el);
  //     if($(el).hasClass('is-open')) {
  //       $el.children('a').attr('aria-expanded', 'true').next('.nav_sub').attr('aria-hidden', 'false');
  //     } else {
  //       $el.children('a').attr('aria-expanded', 'false').next('.nav_sub').attr('aria-hidden', 'true');
  //     }
  //   });
  // }


  //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  //Menu mobile
  //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  // var idMenuMobileTimeOut = false;
  // $triggerMobile.on('click', function(event) {
  //   event.preventDefault();
  //   menu_mobile_toggle();
  // });
  //
  // function menu_mobile_toggle() {
  //   if($html.hasClass('has-menuMobileOpen')) {
  //     menu_mobile_close();
  //   } else {
  //     menu_mobile_open();
  //   }
  // }
  //
  // function menu_mobile_open() {
  //   if(!$html.hasClass('is-scrollBlockedMobile')) {
  //     sauvScroll = scrollT;
  //     idMenuMobileTimeOut = w.setTimeout(function() {
  //       $html.addClass('is-scrollBlockedMobile');
  //     }, 300);
  //   }
  //   $html.addClass('has-menuMobileOpen');
  //   set_focus_trap_aria_hidden($nav);
  //   $nav.find('a').first().focus();
  //   $triggerMobile.attr('aria-expanded', 'true');
  // }
  //
  // function menu_mobile_close() {
  //   if(idMenuMobileTimeOut) w.clearTimeout(idMenuMobileTimeOut);
  //   $html.removeClass('is-scrollBlockedMobile');
  //   closeSubMenu();
  //   remove_focus_trap_aria_hidden();
  //   $triggerMobile.attr('aria-expanded', 'false');
  //   w.scrollTo(0, sauvScroll);
  //   w.setTimeout(function() {
  //     $html.removeClass('has-menuMobileOpen');
  //   }, 50);
  // }


  //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  //Accordéons
  //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  // function acc_init($cont) {
  //   $cont = $cont && $cont.length ? $cont : $main;
  //   $cont.find('.acc:not(.js-acc)').addClass('js-acc');
  //   $cont.find('.js-acc:not(.is-init)').each(function(idx, el) {
  //     var $wrapper = $(el);
  //     var $head = $wrapper.children(':nth-last-child(2)');
  //     var $cont = $wrapper.children(':nth-child(2)');
  //     if(!$head.length || !$cont.length) return;
  //     $head.wrapInner('<button type="button" aria-expanded="false" aria-controls="acc-id-'+idx+'" id="acc-title-id-'+idx+'"></button>');
  //     $wrapper.addClass('is-init').addClass('is-closed');
  //     $cont.hide().attr('id', 'acc-id-'+idx).attr('aria-labelledby', 'acc-title-id-'+idx).attr('aria-hidden', 'true');
  //     $head.on('click', 'button', function(event) {
  //       event.preventDefault();
  //       $cont.slideToggle(400);
  //       if($wrapper.hasClass('is-closed')) {
  //         $wrapper.removeClass('is-closed');
  //         $head.find('[aria-expanded]').attr('aria-expanded', 'true');
  //         $cont.attr('aria-hidden', 'false');
  //       } else {
  //         $wrapper.addClass('is-closed');
  //         $head.find('[aria-expanded]').attr('aria-expanded', 'false');
  //         $cont.attr('aria-hidden', 'true');
  //       }
  //     });
  //   });
  // }
  // acc_init();


  //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  //Sticky bar
  //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  // var $stickyBarActive;
  // var $barContainer;
  //
  // function sticky_init($cont) {
  //   $cont = $cont && $cont.length ? $cont : $main;
  //   $stickyBars = $cont.find('.stickyBar');
  //   $stickyBarActive = false;
  //   $barContainer = $cont.find('[data-fixed-container]');
  //   if(!$barContainer.length) {
  //     $barContainer = $cont.find('.page');
  //   }
  // }
  // sticky_init();
  //
  // function sticky_update_all() {
  //   if(is_menu_mobile || !$stickyBars.length) return;
  //   $stickyBars.each(function(idx, el) {
  //     sticky_update(el);
  //   });
  // }
  //
  // function sticky_update(bar) {
  //   if(is_menu_mobile) return;
  //   var $bar = $(bar);
  //   var $barInner = $bar.find('.stickyBar_inner');
  //   if(
  //     (
  //       bar.getBoundingClientRect().top <= adminBar_h + 0
  //       || $bar.hasClass('is-fixed') && bar.getBoundingClientRect().top <= $barInner.get(0).getBoundingClientRect().top
  //     ) && (
  //       !$barContainer.length
  //       || $barContainer.get(0).getBoundingClientRect().top + $barContainer.innerHeight() >= adminBar_h + 0 + $bar.innerHeight()
  //     )
  //   ) {
  //     if(!$bar.hasClass('is-fixed')) {
  //       $bar.addClass('is-fixed');
  //       $stickyBarActive = $bar;
  //     }
  //   } else {
  //     if($bar.hasClass('is-fixed')) {
  //       $bar.removeClass('is-fixed');
  //       $stickyBarActive = false;
  //     }
  //   }
  // }


  //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  //Menu qui se masque
  //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  function auto_hide_header() {
    if(is_menu_mobile) {
      return;
    }
    if(scrollUp && scrollT > 2 * headerH) {
      $html.removeClass('is-nav-hide');
    } else {
      $html.addClass('is-nav-hide');
    }
  }
  auto_hide_header();


  //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  //Grille
  //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  // function grid_init($cont,$grids) {
  //   $cont = $cont && $cont.length ? $cont : $main;
  //   $grids = $grids && $grids.length ? $grids : $cont.find('.js-grid');
  //   if(!$grids.length) return;
  //
  //   $grids.each(function(idx, el) {
  //     $(el).addClass('is-init');
  //     var $childs = $(el).children(':not(.is-hide)');
  //     ffgrid({
  //       cont: el,
  //       item: $childs.toArray(),
  //       cols: el.hasAttribute('data-nb-cols') ? parseInt(el.getAttribute('data-nb-cols')) : false,
  //       gutterW: parseFloat($childs.first().css('margin-right')),
  //       gutterH: parseFloat($childs.first().css('margin-bottom')),
  //       variableW: el.hasAttribute('data-variable-width'),
  //     });
  //   });
  // }
  // grid_init();


  //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  //Modales
  //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  // $body.find('.js-modal').appendTo($body);
  // $body.find('[data-modal]').on('click', function(event) {
  //   event.preventDefault();
  //   var $target = $('#'+$(this).attr('data-modal'));
  //   if($target.length) {
  //     $target.removeClass('is-hide').attr('aria-hidden', 'false');
  //     $html.addClass('has-modal');
  //     set_focus_trap($target);
  //   }
  // });
  // $body.find('.js-modal-close').on('click', function(event) {
  //   event.preventDefault();
  //   modale_close(this);
  // });
  //
  // function modale_close(target) {
  //   if($html.hasClass('has-modal')) {
  //     if(target) {
  //       remove_focus_trap($(target).closest('.js-modal'));
  //       $(target).closest('.js-modal').addClass('is-hide').attr('aria-hidden', 'true');
  //     } else {
  //       remove_focus_trap($body.find('.js-modal:not(.is-hide)'));
  //       $body.find('.js-modal:not(.is-hide)').addClass('is-hide').attr('aria-hidden', 'true');
  //     }
  //     $html.removeClass('has-modal');
  //   }
  // }


  //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  //Select2
  //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  // var select2_is_ready = false;
  // var select2_js_is_ready = false;
  // var select2_css_is_ready = false;
  // var select2_js_is_loading = false;
  // var select2_css_is_loading = false;
  //
  // function init_selects() {
  //   var $selects = $body.find('.js-select');
  //   if(is_menu_mobile || !$selects.length) return;
  //   selects_load_select2();
  // }
  // init_selects();
  //
  // function selects_destroy() {
  //   if ($.fn.select2) {
  //     $body.find('.js-select.select2-hidden-accessible').select2('destroy');
  //   }
  // }
  //
  // function selects_load_select2() {
  //   if(select2_is_ready) {
  //     init_select2_on_selects();
  //     return;
  //   }
  //   if(!select2_js_is_loading) {
  //     select2_js_is_loading = true;
  //     async(url.theme+'js/vendor/select2.min.js', select2_js_loaded);
  //   }
  //   if(!select2_css_is_loading) {
  //     select2_css_is_loading = true;
  //     loadCSS(url.theme+'js/vendor/select2.min.css', select2_css_loaded, $('head').find('link[rel="stylesheet"]').get(0));
  //   }
  // }
  //
  // function select2_js_loaded() {
  //   select2_js_is_ready = true;
  //   check_select2_is_ready();
  // }
  //
  // function select2_css_loaded() {
  //   select2_css_is_ready = true;
  //   check_select2_is_ready();
  // }
  //
  // function check_select2_is_ready() {
  //   if(!select2_is_ready && select2_js_is_ready && select2_css_is_ready) {
  //     select2_is_ready = true;
  //     init_select2_on_selects();
  //   }
  //   return select2_is_ready;
  // }
  //
  // function init_select2_on_selects() {
  //   $body.find('.js-select').each(function(index, el) {
  //     $(el).select2({
  //       dropdownAutoWidth: false,
  //       width: 'resolve',
  //       dropdownParent: !el.hasAttribute('data-no-append') ? $(el).parent() : false,
  //       minimumResultsForSearch: Infinity,
  //       theme: el.hasAttribute('data-theme') ? el.getAttribute('data-theme') : 'wpst',
  //       dropdownPosition: 'below'
  //       // placeholder
  //     });
  //     $(el).on('select2:open',function(e){
  //       setTimeout(function(){
  //         $(el).resize();
  //       },10);
  //     });
  //   });
  // }


  //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  //Datepicker (http://t1m0n.name/air-datepicker/docs/)
  //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  // var datepicker_is_ready = false;
  // var datepicker_js_is_ready = false;
  // var datepicker_css_is_ready = false;
  // var datepicker_js_is_loading = false;
  // var datepicker_css_is_loading = false;
  //
  // function init_datepickers() {
  //   var $datepickers = $body.find('.js-datepicker');
  //   if(!$datepickers.length) return;
  //   selects_load_datepicker();
  // }
  // init_datepickers();
  //
  // function selects_load_datepicker() {
  //   if(datepicker_is_ready) {
  //     init_datepicker_on_datepickers();
  //     return;
  //   }
  //   if(!datepicker_js_is_loading) {
  //     datepicker_js_is_loading = true;
  //     async(url.theme+'js/vendor/datepicker.min.js', datepicker_js_loaded);
  //   }
  //   if(!datepicker_css_is_loading) {
  //     datepicker_css_is_loading = true;
  //     loadCSS(url.theme+'js/vendor/datepicker.min.css', datepicker_css_loaded, $('head').find('link[rel="stylesheet"]').get(0));
  //   }
  // }
  //
  // function datepicker_js_loaded() {
  //   datepicker_js_is_ready = true;
  //   check_datepicker_is_ready();
  // }
  //
  // function datepicker_css_loaded() {
  //   datepicker_css_is_ready = true;
  //   check_datepicker_is_ready();
  // }
  //
  // function check_datepicker_is_ready() {
  //   if(!datepicker_is_ready && datepicker_js_is_ready && datepicker_css_is_ready) {
  //     datepicker_is_ready = true;
  //     init_datepicker_on_datepickers();
  //   }
  //   return datepicker_is_ready;
  // }
  //
  // function init_datepicker_on_datepickers() {
  //   $body.find('.js-datepicker').each(function(index, el) {
  //     datepicker_set(el);
  //   });
  // }
  //
  // function datepicker_set(input) {
  //   var $input = $(input);
  //   var $inputAlt = $input.parent().find('input.js-datepicker-alt');
  //   var datepicker = $input.datepicker({
  //     language: { //https://github.com/t1m0n/air-datepicker/tree/master/dist/js/i18n
  //       // days: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'], //pas utilisé
  //       // daysShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'], //pas utilisé
  //       daysMin: str.days_letter,
  //       months: str.months,
  //       monthsShort: str.months_short,
  //       // today: "Aujourd’hui", //pas utilisé
  //       // clear: 'Effacer', //pas utilisé
  //       dateFormat: str.dateformat,
  //       // timeFormat: 'hh:ii', //pas utilisé
  //       firstDay: parseInt(str.first_day_week)
  //     },
  //     showOtherMonths: false,
  //     selectOtherMonths: false,
  //     autoClose: true,
  //     navTitles: {
  //       days: str.datepicker_navtitles,
  //     },
  //     altField: $inputAlt,
  //     altFieldDateFormat: 'yyyy/mm/dd',
  //     minDate: new Date(),
  //     position: 'bottom right',
  //     offset: 0,
  //     range: true,
  //     multipleDatesSeparator: ' - ',
  //     toggleSelected: false,
  //     prevHtml: '<span class="icon-carret_left"></span>',
  //     nextHtml: '<span class="icon-carret_right"></span>',
  //     onShow: function(inst, animationCompleted) {
  //       $input.closest('.calendar').addClass('has-calendar-open');
  //       setTimeout(function(){
  //         datepicker.update('position');
  //       },5);
  //     },
  //     onHide: function(inst, animationCompleted) {
  //       $input.closest('.calendar').removeClass('has-calendar-open');
  //     },
  //     onSelect: function(formattedDate, date, inst) {
  //       if($input.hasClass('is-datapicker-init') && (!date || date.length && date.length >= 1)) {
  //         var $parent = inst && inst.el ? $(inst.el).closest('[data-filters]') : [];
  //         if(date.length && date.length >= 1 && $('#filter-select-type_activite').length && $('#filter-select-type_activite').val() == '-1') {
  //           $('#filter-select-type_activite').val('').trigger('change');
  //         } else if($parent && $parent.length) { //si trigger change précédent ça update déjà
  //           filters_update($parent,'datepicker');
  //         }
  //       }
  //       if(date && date.length && date.length >= 1) {
  //         $input.closest('.calendar').addClass('has-calendar-value');
  //       } else {
  //         $input.closest('.calendar').removeClass('has-calendar-value');
  //       }
  //       if($input.val() && $input.val() != '') {
  //         $input.closest('.calendar').addClass('has-calendar-value');
  //       } else {
  //         $input.closest('.calendar').removeClass('has-calendar-value');
  //       }
  //       var dateDisplay = $input.val();
  //       if ( date.length && date.length >= 2 && ''+date[0].getFullYear()+pad(date[0].getMonth()+1)+pad(date[0].getDate()) == ''+date[1].getFullYear()+pad(date[1].getMonth()+1)+pad(date[1].getDate()) ) {
  //         dateDisplay = dateDisplay.split(' - ')[0];
  //       }
  //       $input.closest('.calendar').find('.calendar_choosen').html(dateDisplay);
  //     },
  //     onRenderCell: function(date, cellType) {
  //       if (cellType == 'day') {
  //         var intDate = date ? parseInt(''+date.getFullYear()+pad(date.getMonth()+1)+pad(date.getDate())) : false;
  //         if(intDate && dates_activites.indexOf(intDate) !== -1) {
  //           return {
  //             // html: '',
  //             classes: 'has-activites',
  //             // disabled: true
  //           }
  //         }
  //       }
  //     }
  //   }).data('datepicker');
  //
  //   $input.parent().find('.js-datepicker-reset').on('click', function(event) {
  //     event.preventDefault();
  //     datepicker.clear();
  //   });
  //
  //   if($inputAlt.val() && $inputAlt.val() != '') {
  //     var arrayDates = $inputAlt.val().replace(/[^0-9-]/g, "").split('-');
  //     arrayDates = arrayDates.map(function(v) {
  //       if(v.length == 8) {
  //         return [parseInt(v.substring(0,4)),parseInt(v.substring(4,6)),parseInt(v.substring(6,8))];
  //       } else {
  //         return false;
  //       }
  //     }).filter(function(v) {
  //       return v && v.length == 3 && v[2] <= 31 && v[2] >= 1 && v[1] <= 12 && v[1] >= 1 && v[0] <= 3000 && v[0] >= 1900;
  //     }).map(function(v) {
  //       return new Date(v[0],v[1] - 1,v[2],23,59,59,999);
  //     }).filter(function(v) {
  //       return v >= new Date();
  //     }).slice(0,2);
  //     if(arrayDates.length) {
  //       datepicker.selectDate(arrayDates);
  //     } else {
  //       $inputAlt.val('');
  //     }
  //   }
  //   $input.addClass('is-datapicker-init');
  // }
  //
  // function datepicker_update_dates($parent,dates) {
  //   var datepicker = $parent.find('.js-datepicker').first().data('datepicker');
  //   if(datepicker)
  //     datepicker.update();
  // }
  //
  // function datepicker_clear_dates($parent) {
  //   var datepicker = $parent.find('.js-datepicker').first().data('datepicker');
  //   if(datepicker)
  //     datepicker.clear();
  // }


  //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  //Slider
  //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  // $('.slider').each(function(index, el) {
  //   $(el).on('slider:destroy', function(event) {
  //     slider_destroy(this)
  //   }).on('slider:construct', function(event) {
  //     slider_construct(this);
  //   }).trigger('slider:construct').on('focus', '.slider_i a', slider_focus_on_slide);
  // });
  //
  // function slider_construct(el) {
  //   $(el).flickity({
  //     cellAlign: 'left',
  //     wrapAround: !el.hasAttribute('data-wrap'),
  //     // lazyLoad: 2, //data-flickity-lazyload-srcset & data-flickity-lazyload-src
  //     pageDots: false,
  //     groupCells: true,
  //     contain: true
  //   });
  // }
  //
  // function slider_destroy(el) {
  //   $(el).flickity('destroy');
  //   $(el).children().removeAttr('aria-hidden');
  // }
  //
  // function slider_focus_on_slide(event) {
  //   var $slide = $(this).closest('.slider_i');
  //   var $slider = $slide.closest('.slider');
  //   if(!$slider.hasClass('flickity-enabled')) return;
  //   $slider.flickity().flickity( 'selectCell', $slide.index() );
  // }


  //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  //Forms
  //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  // function form_init($cont) {
  //   $cont = $cont && $cont.length ? $cont : $main;
  //   $cont.find('.form_p input, .form_p select:not(.js-select), .form_p textarea').on('focus', function(event) {
  //     $(this).closest('.form_p').removeClass('is-error');
  //   });
  //   $cont.find('.form_field-float input, .form_field-float textarea').on('blur', function(event) {
  //     if(this.value) $(this).addClass('has-content');
  //     else $(this).removeClass('has-content');
  //   }).trigger('blur');
  //   $cont.find('.form_field-float select').on('change', function(event) {
  //     if(this.value) $(this).addClass('has-content');
  //     else $(this).removeClass('has-content');
  //   }).trigger('change');
  //
  //   $cont.find('[type="checkbox"][data-check-control]').each(function(index, el) {
  //     form_part_change(el);
  //   }).on('click', function(event) {
  //     form_part_change(this);
  //   });
  // }
  // form_init();
  //
  // function form_part_change(checkboxe) {
  //   if(checkboxe.checked) {
  //     form_part_show($('#'+$(checkboxe).attr('data-check-control')));
  //   } else {
  //     form_part_hide($('#'+$(checkboxe).attr('data-check-control')));
  //   }
  // }
  //
  // function form_part_hide($cont) {
  //   $cont.hide();
  //   $cont.find('input, select, textarea').attr('disabled', 'disabled');
  // }
  //
  // function form_part_show($cont) {
  //   $cont.show();
  //   $cont.find('input, select, textarea').removeAttr('disabled');
  // }


  //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  //Keys event
  //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  $html.on( "keydown", function( event ) {
    if(event.which == 27) {
      // closeSubMenu(true);
      // modale_close();
    }
  });


  //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  //On resize
  //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  $window.on('resize', function( event ) {
    update_dimensions();
    $window.trigger('scroll');
  });

  // Avec debounce
  var onResizeDebounce = debounce(function() {
    setCssVarVH();
    // grid_init();
  }, 300);
  $window.on('resize', onResizeDebounce);

  $window.trigger('resize');


  //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  //Media queries
  //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  // var mediaQuery = w.matchMedia('(min-width: 768px)');
  // function mediaQueryCheck(e) {
  //   if (e.matches) {
  //     console.log('Media Query Matched!');
  //   }
  // }
  // mediaQuery.addListener(mediaQueryCheck);
  // mediaQueryCheck(mediaQuery);


  //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  //On scroll
  //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  var ticking = false;
  $window.on('scroll', function( event ) {
    update_scroll();
    requestTick();
  });

  function requestTick() {
    if (!ticking) {
      ticking = true;
      w.requestAnimationFrame(trigger_scroll);
    }
  }

  function trigger_scroll() {
    ticking = false;
    // auto_hide_header();
    // sticky_update_all();
    // $window.trigger('resize.adp'); //datepicker
  }

})(jQuery);

(function(window) {
    //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
    //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
    //Variables
    //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
    //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
    var w = window,
        d = document,
        html = d.documentElement,
        body = d.body,
        header = $('#header'),
        main = $('#main'),
        windowH,
        windowW,
        scrollT,
        serveur_test = d.location.hostname == "localhost";


    //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
    //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
    //Dimensions
    //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
    //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
    function update_dimensions() {
      windowH = w.innerHeight;
      windowW = w.innerWidth;
      update_scroll();
    }
    function update_scroll() {
      scrollT = w.pageYOffset;
    }
    update_dimensions();


    //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
    //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
    //Helper functions
    //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
    //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
    //Easing functions (inspired by http://gizma.com/easing/)
    var easing = {
      linear: function (t) { return t },
      easeInQuad: function (t) { return t*t },
      easeOutQuad: function (t) { return t*(2-t) },
      easeInOutQuad: function (t) { return t<.5 ? 2*t*t : -1+(4-2*t)*t },
      easeInCubic: function (t) { return t*t*t },
      easeOutCubic: function (t) { return (--t)*t*t+1 },
      easeInOutCubic: function (t) { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 },
      easeInQuart: function (t) { return t*t*t*t },
      easeOutQuart: function (t) { return 1-(--t)*t*t*t },
      easeInOutQuart: function (t) { return t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t },
      easeInQuint: function (t) { return t*t*t*t*t },
      easeOutQuint: function (t) { return 1+(--t)*t*t*t*t },
      easeInOutQuint: function (t) { return t<.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t }
    }

    //ScrollTo animate
    function scrollTo(Y, duration, easingFunction, callback) {
      var start = Date.now(),
          from = window.pageYOffset;

      if(from === Y) {
        if(callback) callback();
        return;
      }

      if(!easingFunction) easingFunction = easing.linear;

      function scroll(timestamp) {
        var currentTime = Date.now(),
            time = Math.min(1, ((currentTime - start) / duration)),
            easedT = easingFunction(time);

        yPos = (easedT * (Y - from)) + from;
        window.scrollTo(0, yPos);

        if(time < 1) requestAnimationFrame(scroll);
        else if(callback) callback();
      }

      requestAnimationFrame(scroll);
    }


    //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
    //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
    //Supports
    //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
    //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
    // if(!support.objectFit) ffclass.add(html,'no-objectfit');
    // if(!support.objectPosition) ffclass.add(html,'no-objectposition');


    //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
    //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
    //Keys event
    //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
    //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
    d.addEventListener('keydown', function(e) {
      if(e.keyCode == 27) {
        //Echap...
      }
    });


    //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
    //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
    //On resize
    //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
    //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
    function onResize() {
      update_dimensions();
    }
    w.addEventListener('resize', onResize, false);


    //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
    //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
    //Media queries
    //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
    //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
    // var mediaQuery = w.matchMedia('(min-width: 768px)');
    // function mediaQueryCheck(e) {
    //   if (e.matches) {
    //     console.log('Media Query Matched!');
    //   }
    // }
    // mediaQuery.addListener(mediaQueryCheck);
    // mediaQueryCheck(mediaQuery);


    //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
    //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
    //On scroll
    //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
    //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
    function onScroll() {
      update_scroll();
    }
    w.addEventListener('scroll', onScroll, false);

})(window);
