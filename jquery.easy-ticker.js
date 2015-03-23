/* 
 * jQuery - Easy Ticker plugin - v2.0
 * http://www.aakashweb.com/
 * Copyright 2014, Aakash Chakravarthy
 * Released under the MIT License.
 */

; (function ($, window, document, undefined) {

    var name = "easyTicker",
        defaults = {
            direction: 'up',
            easing: 'swing',
            speed: 'slow',
            interval: 2000,
            height: 'auto',
            visible: 0,
            mousePause: 1,
            controls: {
                up: '',
                down: '',
                toggle: '',
                playText: 'Play',
                stopText: 'Stop'
            },
            start: function () { }
        };

    // Constructor
    function EasyTicker(el, options) {

        var s = this;

        s.opts = $.extend({}, defaults, options);
        s.elem = $(el);
        s.targ = $(el).children(':first-child');
        s.timer = 0;
        s.mHover = 0;
        s.winFocus = 1;

        init();
        start();

        $([window, document]).off('focus.jqet').on('focus.jqet', function () {
            s.winFocus = 1;
        }).off('blur.jqet').on('blur.jqet', function () {
            s.winFocus = 0;
        });

        if (s.opts.mousePause == 1) {
            s.elem.mouseenter(function () {
                s.timerTemp = s.timer;
                stop();
            }).mouseleave(function () {
                if (s.timerTemp !== 0)
                    start();
            });
        }

        $(s.opts.controls.up).on('click', function (e) {
            e.preventDefault();
            moveDir('up');
        });

        $(s.opts.controls.down).on('click', function (e) {
            e.preventDefault();
            moveDir('down');
        });

        $(s.opts.controls.toggle).on('click', function (e) {
            e.preventDefault();
            if (s.timer == 0) start();
            else stop();
        });

        function init() {

            var ticks = s.elem.children().css('margin', 0).children().css('margin', 0);

            s.elem.css({
                position: 'relative',
                height: s.opts.height,
                overflow: 'hidden'
            });

            s.targ.css({
                'position': 'absolute',
                'margin': 0
            });

            if (s.opts.direction == 'right' || s.opts.direction == 'left') {
                s.targ.width(function () {
                    var w = 0;
                    ticks.each(function () { w += $(this).outerWidth() });
                    return w;
                });
                ticks.css('float', 'right');
            }

            setInterval(function () {
                adjHeight();
            }, 100);

        } // Init Method

        function start() {
            s.timer = setInterval(function () {
                if (s.winFocus == 1) {
                    move(s.opts.direction);
                }
            }, s.opts.interval);

            $(s.opts.controls.toggle).addClass('et-run').html(s.opts.controls.stopText);

            if (s.opts.start) {
                s.opts.start(s.elem);
            }

        } // Start method


        function stop() {
            clearInterval(s.timer);
            s.timer = 0;
            $(s.opts.controls.toggle).removeClass('et-run').html(s.opts.controls.playText);
        }// Stop


        function move(dir) {
            var sel, eq, appType, prop, delta;

            if (!s.elem.is(':visible')) return;

            if (dir == 'up' || dir == 'right') {
                sel = ':first-child';
                eq = '-=';
                appType = 'appendTo';
            } else {
                sel = ':last-child';
                eq = '+=';
                appType = 'prependTo';
            }

            var selChild = s.targ.children(sel);
            if (dir == 'up' || dir == 'down') {
                prop = 'top';
                delta = eq + selChild.outerHeight()
            }
            else {
                prop = 'right';
                delta = eq + selChild.outerWidth()
            }
            //var height = selChild.outerHeight();

            var anim = {};
            anim[prop] = delta + "px";

            s.targ.stop(true, true).animate(anim, s.opts.speed, s.opts.easing, function () {

                selChild.hide()[appType](s.targ).fadeIn();
                s.targ.css(/*'top'*/ prop, 0);

                adjHeight();

            });
        }// Move

        function moveDir(dir) {
            stop();
            if (dir == 'up') move('up'); else move('down');
            // start();
        }

        function fullHeight() {
            var height = 0;
            var tempDisp = s.elem.css('display'); // Get the current el display value

            s.elem.css('display', 'block');

            s.targ.children().each(function () {
                height += $(this).outerHeight();
            });

            s.elem.css({
                'display': tempDisp,
                'height': height
            });
        }

        function visHeight(anim) {
            var wrapHeight = 0;
            s.targ.children(':lt(' + s.opts.visible + ')').each(function () {
                wrapHeight += $(this).outerHeight();
            });

            if (anim == 1) {
                s.elem.stop(true, true).animate({ height: wrapHeight }, s.opts.speed);
            } else {
                s.elem.css('height', wrapHeight);
            }
        }

        function adjHeight() {
            if (s.opts.height == 'auto' && s.opts.visible != 0) {
                anim = arguments.callee.caller.name == 'init' ? 0 : 1;
                visHeight(anim);
            } else if (s.opts.height == 'auto') {
                fullHeight();
            }
        }

        return {
            up: function () { moveDir('up'); },
            down: function () { moveDir('down'); },
            start: start,
            stop: stop,
            options: s.opts
        };

    }

    // Attach the object to the DOM
    $.fn[name] = function (options) {
        return this.each(function () {
            if (!$.data(this, name)) {
                $.data(this, name, new EasyTicker(this, options));
            }
        });
    };

})(jQuery, window, document);
