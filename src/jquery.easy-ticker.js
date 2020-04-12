/* 
 * jQuery - Easy Ticker plugin - v3.0
 * https://www.aakashweb.com/
 * Copyright 2020, Aakash Chakravarthy
 * Released under the MIT License.
 */

;(function ($, window, document, undefined) {
    
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
            callbacks: {
                before: false,
                after: false
            }
        };

    // Constructor
    function EasyTicker(el, options) {
        
        var s = this;
        
        s.opts = $.extend({}, defaults, options);
        s.elem = $(el);
        s.targ = $(el).children(':first-child');
        s.timer = 0;
        s.winFocus = 1;
        
        init();
        start();
        
        $([window, document]).off('focus').on('focus', function(){
            s.winFocus = 1;
        }).off('blur').on('blur', function(){
            s.winFocus = 0;
        });
        
        if(s.opts.mousePause == 1){
            s.elem.mouseenter(function(){
                s.timerTemp = s.timer;
                stop();
            }).mouseleave(function(){
                if(s.timerTemp !== 0)
                    start();
            });
        }
        
        $(s.opts.controls.up).on('click', function(e){
            e.preventDefault();
            moveDir('up');
        });
        
        $(s.opts.controls.down).on('click', function(e){
            e.preventDefault();
            moveDir('down');
        });
        
        $(s.opts.controls.toggle).on('click', function(e){
            e.preventDefault();
            if(s.timer == 0) start();
            else stop();
        });
        
        function init(){
            
            s.elem.children().css('margin', 0).children().css('margin', 0);
            
            s.elem.css({
                position : 'relative',
                height: s.opts.height,
                overflow : 'hidden'
            });
            
            s.targ.css({
                'position' : 'absolute',
                'margin' : 0
            });
            
            setInterval(function(){
                adjustHeight();
            }, 100);
            
        }
        
        function start(){
            s.timer = setInterval(function(){
                if(s.winFocus == 1){
                    move(s.opts.direction);
                }
            }, s.opts.interval);

            $(s.opts.controls.toggle).addClass('et-run').html(s.opts.controls.stopText);
            
        }
        
        function stop(){
            clearInterval(s.timer);
            s.timer = 0;
            $(s.opts.controls.toggle).removeClass('et-run').html(s.opts.controls.playText);
        }
        
        function move(dir){
            var sel, eq, appType;

            if(!s.elem.is(':visible')) return;

            if(dir == 'up'){
                sel = ':first-child';
                eq = '-=';
                appType = 'appendTo';
            }else{
                sel = ':last-child';
                eq = '+=';
                appType = 'prependTo';
            }

            var selChild = s.targ.children(sel);
            var height = selChild.outerHeight();

            if(typeof s.opts.callbacks.before === 'function'){
                s.opts.callbacks.before.call(s, s.targ, selChild);
            }

            s.targ.stop(true, true).animate({
                'top': eq + height + "px"
            }, s.opts.speed, s.opts.easing, function(){
                
                selChild.hide()[appType](s.targ).fadeIn();
                s.targ.css('top', 0);
                
                adjustHeight();
                
                if(typeof s.opts.callbacks.after === 'function'){
                    s.opts.callbacks.after.call(s, s.targ, selChild);
                }

            });
        }
        
        function moveDir(dir){
            stop();
            if(dir == 'up') move('up'); else move('down'); 
            // start();
        }
        
        function fullHeight(){
            var height = 0;
            var tempDisplay = s.elem.css('display'); // Get the current el display value
            
            s.elem.css('display', 'block');
            
            s.targ.children().each(function(){
                height += $(this).outerHeight();
            });
            
            s.elem.css({
                'display': tempDisplay,
                'height': height
            });
        }
        
        function animateHeight(animate){
            var wrapHeight = 0;
            s.targ.children(':lt(' + s.opts.visible + ')').each(function(){
                wrapHeight += $(this).outerHeight();
            });
            
            if(animate == 1){
                s.elem.stop(true, true).animate({height: wrapHeight}, s.opts.speed);
            }else{
                s.elem.css('height', wrapHeight);
            }
        }
        
        function adjustHeight(){
            if(s.opts.height == 'auto' && s.opts.visible != 0){
                anim = arguments.callee.caller.name == 'init' ? 0 : 1;
                animateHeight(anim);
            }else if(s.opts.height == 'auto'){
                fullHeight();
            }
        }
        
        return {
            up: function(){ moveDir('up'); },
            down: function(){ moveDir('down'); },
            start: start,
            stop: stop,
            options: s.opts
        };
        
    }

    // Attach the object to the DOM
    $.fn[name] = function(options) {
        return this.each(function () {
            if (!$.data(this, name)) {
                $.data(this, name, new EasyTicker(this, options));
            }
        });
    };

})(jQuery, window, document);