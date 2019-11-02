(function ($) {

    $.fn.mfNavbar = function (options) {
        var settings = {
            hoverlvl1: true, // fixedWidth or longWidth
            overlay: true,
            fixedBody: true,
            fixedNav: false,
            compressBody: false,
            hideAuto: false,
            closeSidebarAfterClick: false
        };
        $.extend(settings, options);
        return this.each(function () {
            var navbar = $(this),
                defaultDirNav = navbar.attr('data-dir'),
                sidebarPos = defaultDirNav == 'ltr' ? 'left' : 'right';
            if (navbar.hasClass('mf-navbar')) {

                function autoHideNavbar(navbar) {
                    var marginNavbar = parseFloat(navbar.css('marginTop')) + parseFloat(navbar.css('marginBottom')),
                        hieghtNavbar    = navbar.outerHeight() + marginNavbar,
                        didScroll,
                        lastScrollTop   = 0,
                        delta           = 5;
                    navbar.css('transition', 'top 0.3s ease-in-out');
                    $(window).scroll(function(event){ didScroll = true; });
                      setInterval(function() {
                          if (didScroll) {
                              hasScrolled();
                              didScroll = false;
                          }
                      }, 500);

                    function hasScrolled() {
                        var st = $(this).scrollTop();
                        // Make sure they scroll more than delta
                        if(Math.abs(lastScrollTop - st) <= delta) return;
                        // If they scrolled down and are past the navbar, add class .nav-up.
                        // This is necessary so you never see what is "behind" the navbar.
                        if (st > lastScrollTop && st > hieghtNavbar) {
                            // Scroll Down
                            navbar.css('top', - hieghtNavbar);
                        } else {
                            // Scroll Up
                            if(st + $(window).height() < $(document).height()) {
                                navbar.css('top', 0);
                            }
                        }
                        lastScrollTop = st;
                    }
                }

                // handel class fixed
                if (settings.fixedNav === true) {
                    navbar.addClass('fixed-navbar');
                }
                if (settings.hideAuto === true) {
                    navbar.addClass('fixed-navbar');
                    autoHideNavbar(navbar);
                }
                if (navbar.hasClass('fixed-navbar')) {
                    $('body').css('padding-top', navbar.outerHeight() + parseFloat(navbar.css('marginTop')) + parseFloat(navbar.css('marginBottom')));
                }
                /***************************************************************************************************/
                // trigger function responsive
                hideMenuAndShowBtn();
                $(window).resize(function () { hideMenuAndShowBtn(); });
                /***************************************************************************************************/
                // create box hover and set position when hover on link level 1
                var boxHover = navbar.find('.box-hoverable').first(),
                    linkActive = navbar.find('.content-nav .list-horizontal > li.active');
                function setPositionBoxHoverFixed(eleLink) {
                    if (eleLink) {
                        var left = eleLink.getBoundingClientRect().left + window.scrollX,
                            width = eleLink.clientWidth;
                        boxHover.width(width).css({
                            'transform': 'translateX(' + left + 'px)'
                        });
                    }
                }
                function handelHoverBox() {
                    if (!boxHover.length) {
                        boxHover = $('<div class="box-hoverable"></div>');
                        navbar.prepend(boxHover);
                    }
                    setPositionBoxHoverFixed(linkActive[0]);

                    navbar.find('.content-nav .list-horizontal > li').on('mouseenter', function () {
                        setPositionBoxHoverFixed($(this)[0]);
                    }).on('mouseleave', function () {
                        linkActive = navbar.find('.content-nav .list-horizontal > li.active');
                        if (linkActive[0]) {
                            setPositionBoxHoverFixed(linkActive[0]);
                        } else {
                            boxHover.width(0);
                        }
                    });
                    $(window).scroll(function () {
                        linkActive = navbar.find('.content-nav .list-horizontal > li.active');
                        if (linkActive[0]) {
                            setPositionBoxHoverFixed(linkActive[0]);
                        }
                    });
                  }

                setTimeout(() => {
                  if (settings.hoverlvl1 === true) {
                    handelHoverBox();
                  }
                }, 100)

                // show dorpmenu on hover level 1
                var delayOnHide = 250;
                navbar.find('.content-nav .list-horizontal > li.dropdown:not(.has-btn)').hover(function (e) {
                    $(this).find('.dropmenu').show(10, function () {
                        $(this).addClass('show-dropmenu');
                    });
                }, function(e) {
                    $(this).find('.dropmenu').removeClass('show-dropmenu').addClass('hide-dropmenu').delay(delayOnHide).hide(10, function () {
                        $(this).removeClass('hide-dropmenu');
                    });
                });

                // show dorpmenu on click level 1
                navbar.find('.content-nav .list-horizontal > li.dropdown.has-btn .btn-open-dropmenu > i').on('click', function (e) {
                    e.stopPropagation();
                    if ($(this).parentsUntil('.dropdown').parent().find('.dropmenu').hasClass('show-dropmenu')) {
                        $(this).parentsUntil('.dropdown').parent().find('.dropmenu').removeClass('show-dropmenu').addClass('hide-dropmenu').delay(delayOnHide).hide(10, function () {
                            $(this).removeClass('hide-dropmenu');
                        });
                    } else {
                        $(this).parentsUntil('.dropdown').parent().find('.dropmenu').show(10, function () {
                            $(this).addClass('show-dropmenu');
                        });
                    }
                });
                // Show Sub Drop menu on Hover and set position
                var finalDirSundropmenu = '';
                navbar.find('.content-nav .list-horizontal > li.dropdown .dropmenu .subdropdown').hover(function (e) {
                    var submenu     = $(this).find('.subdropmenu'),
                        defaultDir  = navbar.attr('data-dir'),
                        menuWidth   = submenu.outerWidth(),
                        windowWidth = $(window).width(),
                        leftSpace   = $(this)[0].getBoundingClientRect().left,
                        rightSpace  = $(this)[0].getBoundingClientRect().right,
                        finalDir = '';
                    if (defaultDir === 'ltr') {
                        finalDir = (windowWidth - rightSpace) > menuWidth ? 'left' : 'right';
                    } else if (defaultDir === 'rtl') {
                        finalDir = (windowWidth - leftSpace) > menuWidth ? 'right' : 'left';
                    }
                    var reverseDir = finalDir === 'right' ? 'left' : 'right';
                    submenu.css(finalDir, '80%').css(reverseDir, 'auto');
                    finalDirSundropmenu = finalDir;
                    submenu.show(10, function () {
                        $(this).css({
                            opacity: 1,
                            zIndex: 10,
                            [finalDir]: '100%'
                        });
                    });
                }, function () {
                    $(this).find('.subdropmenu').css({
                        opacity: 0,
                        zIndex: '-1',
                        [finalDirSundropmenu]: '80%'
                    }).delay(delayOnHide).hide(10);
                });
                navbar.find('.content-nav .list-horizontal .dropdown.has-btn .dropmenu').on('click', function (e) {e.stopPropagation()});
                $('body, html').click(function () {
                    navbar.find('.content-nav .list-horizontal .dropdown.has-btn .dropmenu').removeClass('show-dropmenu').addClass('hide-dropmenu').delay(delayOnHide).hide(10, function () {
                        $(this).removeClass('hide-dropmenu');
                    });
                });
                /*************************************************************************************************/
                // handel Responsive
                function hideMenuAndShowBtn() {
                    var smallScreen = window.matchMedia("(max-width: 992px) and (min-width: 767px)"),
                        mobScreen = window.matchMedia("(max-width: 767.98px)"),
                        listWidth = navbar.find('.content-nav > .list.list-horizontal').outerWidth(),
                        paddingContentNav = window.parseInt(navbar.find('.content-nav').css('padding-left')) +
                            window.parseInt(navbar.find('.content-nav').css('padding-right')),
                        logoWidth = navbar.find('.logo').outerWidth(),
                        widthAllNav = listWidth + paddingContentNav + logoWidth;

                    if (mobScreen.matches) {
                        // if (widthAllNav >= 740) {
                          navbar.find('.content-nav').addClass('on-show-sidebar');
                          navbar.find('.content-nav > .list').removeClass('list-horizontal').addClass('list-vertical');
                          navbar.find('.content-nav .btn-show-sidebar').addClass('show');
                          if (typeof boxHover !== 'undefined') {
                            boxHover.width(0);
                          }
                        // }
                    } else {
                        navbar.find('.content-nav').removeClass('on-show-sidebar');
                        navbar.find('.content-nav > .list').addClass('list-horizontal').removeClass('list-vertical');
                        navbar.find('.content-nav .btn-show-sidebar').removeClass('show');
                        let linkActive = navbar.find('.content-nav .list-horizontal > li.active');
                        setTimeout(() => {
                          setPositionBoxHoverFixed(linkActive[0]);
                        }, 200)
                    }
                    // else if (mobScreen.matches) {
                    //     navbar.find('.content-nav').addClass('on-show-sidebar');
                    //     navbar.find('.content-nav > .list').removeClass('list-horizontal').addClass('list-vertical');
                    //     navbar.find('.content-nav .btn-show-sidebar').addClass('show');
                    // }
                }
                // toggle show sidebar (navbar in mobile)
                let btnShowSidebar = navbar.find('.btn-show-sidebar');
                function closeSidebar() {
                  var overlay = navbar.find('.content-nav > .overlay').first(),
                      sidebar = navbar.find('.content-nav .list-vertical');

                    btnShowSidebar.find('.icon').removeClass('toggle');
                    sidebar.removeClass('toggle-sidebar');
                    $('body').css({
                        'overflow': 'visible',
                        ['padding-' + sidebarPos]: 0
                    });
                    if (!overlay.is(':hidden')) {
                        overlay.fadeOut(100);
                    }
                }
                function openSidebar() {
                  var overlay = navbar.find('.content-nav > .overlay').first(),
                      sidebar = navbar.find('.content-nav .list-vertical');

                  btnShowSidebar.find('.icon').toggleClass('toggle');
                  sidebar.toggleClass('toggle-sidebar');
                  if (settings.overlay === true) {
                      if (!overlay.length) {
                          overlay = $('<div class="overlay"></div>');
                          navbar.find('.content-nav').prepend(overlay);
                      }
                      overlay.fadeIn(100);
                      if (settings.fixedBody === true) {
                          $('body').css('overflow', 'hidden');
                      }
                  }
                  if (settings.compressBody === true) {
                      var speed = sidebar.css('transition-duration');
                      $('body').css({
                          'transition': 'padding-' + sidebarPos +  ' ' + speed + ' ease-in-out',
                          ['padding-' + sidebarPos]: sidebar.outerWidth()
                      });
                  }
                }
                btnShowSidebar.on('click', function () {
                    if (!$(this).find('.icon').hasClass('toggle')) {
                      closeSidebar();
                    } else {
                      openSidebar();
                    }
                });
                $(document).on('click', '.mf-navbar .content-nav > .overlay', closeSidebar);
//                btnShowSidebar.click();

                /*********************************************************************************/
                let sidebar = navbar.find('.content-nav .list-vertical');
                $.fn.setActive = function (ele) { setPositionBoxHoverFixed(ele); };
                $.fn.openSidebar = function () { openSidebar(); };
                $.fn.toggleSidebar = function () {
                  if (sidebar.hasClass('toggle-sidebar')) {
                      closeSidebar();
                    } else {
                      openSidebar();
                    }
                };
                /*********************************************************************************/
                // close sidebar after route go

                if (settings.closeSidebarAfterClick) {
                  sidebar.find('li a').click(function (e) {
                    let hasParent = $(this).parent('li.dropdown')
                    if (!hasParent.length) {
                      closeSidebar();
                    }
                  })
                }


                /*********************************************************************************/
                // toggle show dropmenu and subdropmenu
                // dropmenu
                sidebar.find('li.dropdown > a').click(function (e) {
                    e.preventDefault();
                    let dropdown = $(this).parent('li.dropdown')
                    let siblingsDropdown = dropdown.siblings('.dropdown')
                    let dropmenu = dropdown.find(' > .dropmenu');

                    // hide all dropmenus
                    siblingsDropdown.find(' > .dropmenu').slideUp(200)

                    if (dropmenu.is(':hidden')) {
                        dropmenu.slideDown(200);
                    } else {
                        dropmenu.slideUp(200);
                    }
                });
                // subdropmenu
                sidebar.find('li.dropdown .dropmenu .subdropdown > a').click(function (e) {
                    e.preventDefault();
                    var subdropmenu = $(this).parent('li.subdropdown').find(' > .subdropmenu');
                    if (subdropmenu.is(':hidden')) {
                        subdropmenu.slideDown(200);
                    } else {
                        subdropmenu.slideUp(200);
                    }
                });

            } else {
                console.error('please add class [mf-navbar] to your nav');
            }

        });
    };
    /**********************************************************************************************************/
    // Sidenav

    $.fn.mfSideNav = function (options) {
        var settings = {
            overlay: true,
            fixedBody: true,
            compressBody: true,
            showForStart: false
        };
        $.extend(settings, options);
        return this.each(function () {
            var sideNav = $(this),
                defaultDirNav = sideNav.attr('data-dir'),
                sideNavPos = defaultDirNav == 'ltr' ? 'left' : 'right';
            if (sideNav.hasClass('mf-sidenav')) {
                // toggle show sidebar (navbar in mobile)
                var overlay = sideNav.find('> .overlay').first(),
                    sidebar = sideNav.find('.list-vertical');
                function closeSidebar() {
                    $('body').css({
                        'overflow': 'visible',
                        ['padding-' + sideNavPos]: 0
                    });
                    if (!overlay.is(':hidden')) {
                        overlay.fadeOut(100);
                    }
                    sidebar.removeClass('toggle-sidebar');
                }
                function showSidebar() {
                    sidebar.addClass('toggle-sidebar');
                    if (settings.overlay === true) {
                        if (!overlay.length) {
                            overlay = $('<div class="overlay"></div>');
                            sideNav.prepend(overlay);
                        }
                        overlay.fadeIn(100);
                        if (settings.fixedBody === true) {
                            $('body').css('overflow', 'hidden');
                        }
                    }
                    if (settings.compressBody === true) {
                        var speed = sidebar.css('transition-duration');
                        $('body').css({
                            'transition': 'padding-' + sideNavPos +  ' ' + speed + ' ease-in-out',
                            ['padding-' + sideNavPos]: sidebar.outerWidth()
                        });
                    }
                }
                function showForOpenWindow() {
                    if (settings.showForStart === true) {
                        showSidebar();
                    }
                }
                showForOpenWindow();
                function toggleSidebar() {
                    if (sideNav.find('.list-vertical').hasClass('toggle-sidebar')) {
                        closeSidebar();
                    } else {showSidebar();}
                }
                // Show side nav
                $('[data-target="show-sidenav"]').click(function (e) {
                    e.preventDefault();
                    showSidebar();
                });
                // Hide side nav
                $('[data-target="hide-sidenav"]').click(function (e) {
                    e.preventDefault();
                    closeSidebar();
                });
                // Toggle side nav
                $('[data-target="toggle-sidenav"]').click(function (e) {
                    e.preventDefault();
                    toggleSidebar();
                });
                $.fn.showSidenav = function () { showSidebar(); };
                $.fn.hideSidenav = function () { closeSidebar(); };
                $.fn.toggleSidenav = function () { toggleSidebar(); };


                $(document).on('click', '.mf-sidenav > .overlay', closeSidebar);
//                btnShowSidebar.click();

                /*********************************************************************************/
                // toggle show dropmenu and subdropmenu
                // dropmenu
                sidebar.find('li.dropdown > a').click(function (e) {
                    e.preventDefault();
                    var dropmenu = $(this).parent('li.dropdown').find(' > .dropmenu');
                    if (dropmenu.is(':hidden')) {
                        dropmenu.slideDown(300);
                    } else {
                        dropmenu.slideUp(300);
                    }
                });
                // subdropmenu
                sidebar.find('li.dropdown .dropmenu .subdropdown > a').click(function (e) {
                    e.preventDefault();
                    var subdropmenu = $(this).parent('li.subdropdown').find(' > .subdropmenu');
                    if (subdropmenu.is(':hidden')) {
                        subdropmenu.slideDown(300);
                    } else {
                        subdropmenu.slideUp(300);
                    }
                });
            } else {
                console.error('please add class [mf-sidenav] to your nav');
            }
        });
    };
    /***********************************************************************************************************/
    // waves effect
    (function(window) {
        'use strict';

        var Waves = Waves || {};
        var $$ = document.querySelectorAll.bind(document);

        // Find exact position of element
        function isWindow(obj) {
            return obj !== null && obj === obj.window;
        }

        function getWindow(elem) {
            return isWindow(elem) ? elem : elem.nodeType === 9 && elem.defaultView;
        }

        function offset(elem) {
            var docElem, win,
                box = {top: 0, left: 0},
                doc = elem && elem.ownerDocument;

            docElem = doc.documentElement;

            if (typeof elem.getBoundingClientRect !== typeof undefined) {
                box = elem.getBoundingClientRect();
            }
            win = getWindow(doc);
            return {
                top: box.top + win.pageYOffset - docElem.clientTop,
                left: box.left + win.pageXOffset - docElem.clientLeft
            };
        }

        function convertStyle(obj) {
            var style = '';

            for (var a in obj) {
                if (obj.hasOwnProperty(a)) {
                    style += (a + ':' + obj[a] + ';');
                }
            }

            return style;
        }

        var Effect = {

            // Effect delay
            duration: 750,

            show: function(e, element) {

                // Disable right click
                if (e.button === 2) {
                    return false;
                }

                var el = element || this;

                // Create ripple
                var ripple = document.createElement('div');
                ripple.className = 'waves-ripple';
                el.appendChild(ripple);

                // Get click coordinate and element witdh
                var pos         = offset(el);
                var relativeY   = (e.pageY - pos.top);
                var relativeX   = (e.pageX - pos.left);
                var scale       = 'scale('+((el.clientWidth / 100) * 10)+')';

                // Support for touch devices
                if ('touches' in e) {
                  relativeY   = (e.touches[0].pageY - pos.top);
                  relativeX   = (e.touches[0].pageX - pos.left);
                }

                // Attach data to element
                ripple.setAttribute('data-hold', Date.now());
                ripple.setAttribute('data-scale', scale);
                ripple.setAttribute('data-x', relativeX);
                ripple.setAttribute('data-y', relativeY);

                // Set ripple position
                var rippleStyle = {
                    'top': relativeY+'px',
                    'left': relativeX+'px'
                };

                ripple.className = ripple.className + ' waves-notransition';
                ripple.setAttribute('style', convertStyle(rippleStyle));
                ripple.className = ripple.className.replace('waves-notransition', '');

                // Scale the ripple
                rippleStyle['-webkit-transform'] = scale;
                rippleStyle['-moz-transform'] = scale;
                rippleStyle['-ms-transform'] = scale;
                rippleStyle['-o-transform'] = scale;
                rippleStyle.transform = scale;
                rippleStyle.opacity   = '1';

                rippleStyle['-webkit-transition-duration'] = Effect.duration + 'ms';
                rippleStyle['-moz-transition-duration']    = Effect.duration + 'ms';
                rippleStyle['-o-transition-duration']      = Effect.duration + 'ms';
                rippleStyle['transition-duration']         = Effect.duration + 'ms';

                rippleStyle['-webkit-transition-timing-function'] = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';
                rippleStyle['-moz-transition-timing-function']    = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';
                rippleStyle['-o-transition-timing-function']      = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';
                rippleStyle['transition-timing-function']         = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';

                ripple.setAttribute('style', convertStyle(rippleStyle));
            },

            hide: function(e) {
                TouchHandler.touchup(e);

                var el = this;
                var width = el.clientWidth * 1.4;

                // Get first ripple
                var ripple = null;
                var ripples = el.getElementsByClassName('waves-ripple');
                if (ripples.length > 0) {
                    ripple = ripples[ripples.length - 1];
                } else {
                    return false;
                }

                var relativeX   = ripple.getAttribute('data-x');
                var relativeY   = ripple.getAttribute('data-y');
                var scale       = ripple.getAttribute('data-scale');

                // Get delay beetween mousedown and mouse leave
                var diff = Date.now() - Number(ripple.getAttribute('data-hold'));
                var delay = 350 - diff;

                if (delay < 0) {
                    delay = 0;
                }

                // Fade out ripple after delay
                setTimeout(function() {
                    var style = {
                        'top': relativeY+'px',
                        'left': relativeX+'px',
                        'opacity': '0',

                        // Duration
                        '-webkit-transition-duration': Effect.duration + 'ms',
                        '-moz-transition-duration': Effect.duration + 'ms',
                        '-o-transition-duration': Effect.duration + 'ms',
                        'transition-duration': Effect.duration + 'ms',
                        '-webkit-transform': scale,
                        '-moz-transform': scale,
                        '-ms-transform': scale,
                        '-o-transform': scale,
                        'transform': scale,
                    };

                    ripple.setAttribute('style', convertStyle(style));

                    setTimeout(function() {
                        try {
                            el.removeChild(ripple);
                        } catch(e) {
                            return false;
                        }
                    }, Effect.duration);
                }, delay);
            },

            // Little hack to make <input> can perform waves effect
            wrapInput: function(elements) {
                for (var a = 0; a < elements.length; a++) {
                    var el = elements[a];

                    if (el.tagName.toLowerCase() === 'input') {
                        var parent = el.parentNode;

                        // If input already have parent just pass through
                        if (parent.tagName.toLowerCase() === 'i' && parent.className.indexOf('waves-effect') !== -1) {
                            continue;
                        }

                        // Put element class and style to the specified parent
                        var wrapper = document.createElement('i');
                        wrapper.className = el.className + ' waves-input-wrapper';

                        var elementStyle = el.getAttribute('style');

                        if (!elementStyle) {
                            elementStyle = '';
                        }

                        wrapper.setAttribute('style', elementStyle);

                        el.className = 'waves-button-input';
                        el.removeAttribute('style');

                        // Put element as child
                        parent.replaceChild(wrapper, el);
                        wrapper.appendChild(el);
                    }
                }
            }
        };


        /**
         * Disable mousedown event for 500ms during and after touch
         */
        var TouchHandler = {
            /* uses an integer rather than bool so there's no issues with
             * needing to clear timeouts if another touch event occurred
             * within the 500ms. Cannot mouseup between touchstart and
             * touchend, nor in the 500ms after touchend. */
            touches: 0,
            allowEvent: function(e) {
                var allow = true;

                if (e.type === 'touchstart') {
                    TouchHandler.touches += 1; //push
                } else if (e.type === 'touchend' || e.type === 'touchcancel') {
                    setTimeout(function() {
                        if (TouchHandler.touches > 0) {
                            TouchHandler.touches -= 1; //pop after 500ms
                        }
                    }, 500);
                } else if (e.type === 'mousedown' && TouchHandler.touches > 0) {
                    allow = false;
                }

                return allow;
            },
            touchup: function(e) {
                TouchHandler.allowEvent(e);
            }
        };


        /**
         * Delegated click handler for .waves-effect element.
         * returns null when .waves-effect element not in "click tree"
         */
        function getWavesEffectElement(e) {
            if (TouchHandler.allowEvent(e) === false) {
                return null;
            }

            var element = null;
            var target = e.target || e.srcElement;

            while (target.parentElement !== null) {
                if (!(target instanceof SVGElement) && target.className.indexOf('waves-effect') !== -1) {
                    element = target;
                    break;
                } else if (target.classList.contains('waves-effect')) {
                    element = target;
                    break;
                }
                target = target.parentElement;
            }

            return element;
        }

        /**
         * Bubble the click and show effect if .waves-effect elem was found
         */
        function showEffect(e) {
            var element = getWavesEffectElement(e);

            if (element !== null) {
                Effect.show(e, element);

                if ('ontouchstart' in window) {
                    element.addEventListener('touchend', Effect.hide, false);
                    element.addEventListener('touchcancel', Effect.hide, false);
                }

                element.addEventListener('mouseup', Effect.hide, false);
                element.addEventListener('mouseleave', Effect.hide, false);
            }
        }

        Waves.displayEffect = function(options) {
            options = options || {};

            if ('duration' in options) {
                Effect.duration = options.duration;
            }

            //Wrap input inside <i> tag
            Effect.wrapInput($$('.waves-effect'));

            if ('ontouchstart' in window) {
                document.body.addEventListener('touchstart', showEffect, false);
            }

            document.body.addEventListener('mousedown', showEffect, false);
        };

        /**
         * Attach Waves to an input element (or any element which doesn't
         * bubble mouseup/mousedown events).
         *   Intended to be used with dynamically loaded forms/inputs, or
         * where the user doesn't want a delegated click handler.
         */
        Waves.attach = function(element) {
            //FUTURE: automatically add waves classes and allow users
            // to specify them with an options param? Eg. light/classic/button
            if (element.tagName.toLowerCase() === 'input') {
                Effect.wrapInput([element]);
                element = element.parentElement;
            }

            if ('ontouchstart' in window) {
                element.addEventListener('touchstart', showEffect, false);
            }

            element.addEventListener('mousedown', showEffect, false);
        };

        window.Waves = Waves;

        document.addEventListener('DOMContentLoaded', function() {
            Waves.displayEffect();
        }, false);

    })(window);
    /***********************************************************************************************************/
    /* custom textarea */
    // (function (window) {
        // $('textarea.auto-resize').each(function () {
        //     var padding = window.parseFloat($(this).css('padding-top')) + window.parseFloat($(this).css('padding-bottom')),
        //         border  = window.parseFloat($(this).css('border-top-width')) + window.parseFloat($(this).css('border-bottom-width')),
        //         height  = window.parseFloat($(this).attr('data-height'));
        //     $(this).height(height);
        //     $(this).keyup(function () {
        //         console.log(height)
        //         var padding = window.parseFloat($(this).css('padding-top')) + window.parseFloat($(this).css('padding-bottom')),
        //             border  = window.parseFloat($(this).css('border-top-width')) + window.parseFloat($(this).css('border-bottom-width')),
        //             height  = window.parseFloat($(this).attr('data-height'));
        //         $(this).height(height);
        //         $(this).height($(this)[0].scrollHeight + border - padding);
        //     });
        // });
    // }(window));

    /***********************************************************************************************************/
    // button scroll up and down
    (function (window) {

        $('.bttn-scroll-up, .bttn-scroll-down').each(function () {
            var btns = $(this),
                scrollShow = window.parseInt(btns.attr('data-show-btn')),
                speed = window.parseInt($(this).attr('data-speed'));
            // show btns
            $(window).scroll(function () {
                var currentScroll = $(this).scrollTop();
                if (currentScroll >= scrollShow) {
                    btns.css('display', 'flex');
                } else {
                    btns.fadeOut(300);
                }
            });
            // scroll top and bottom
            btns.click(function () {
                if ($(this).hasClass('bttn-scroll-up')) {
                    $('body, html').animate({
                        scrollTop: 0
                    }, speed);
                } else if ($(this).hasClass('bttn-scroll-down')) {
                    $('body, html').animate({
                        scrollTop: document.body.scrollHeight - $(window).outerHeight()
                    }, speed);
                }
            });
        });
    }(window));
    /***********************************************************************************************************/
}(jQuery));
