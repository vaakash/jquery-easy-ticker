# jQuery Easy Ticker plugin

jQuery easy ticker is a news ticker like plugin which scrolls the list infinitely. It is highly customizable and flexible with lots of features and works in all browsers.

[👁️ Live demo](https://www.aakashweb.com/demos/jquery-easy-ticker/) - [🏠 Home page](https://www.aakashweb.com/jquery-plugins/easy-ticker/) - [☕ Buy me a Coffee !](https://www.paypal.me/vaakash/6)

## Features

* Two directions available (Up and down).
* Can be targeted on any template.
* Flexible API for extending to various applications.
* Supports 'easing' functions.
* Mouse pause feature available.
* The speed of the transition can be changed.
* Controls can be added in order to Play/pause or move the list up and down.
* Cross browser support.
* Light weight (2.65 Kb - minified).

## Usage

Include jQuery and easy ticker plugin (available under dist/) in the page.

```HTML
<script src="jquery.js"></script>
<script src="jquery.easy-ticker.min.js"></script>
```

**HTML**

Wrapper > Target > Children

```HTML
<div class="myWrapper">
    <ul>
        <li>List item 1</li>
        <li>List item 2</li>
        <li>List item 3</li>
        <li>List item 4</li>
    </ul>
</div>
```

or

```HTML
<div class="myWrapper">
    <div>
        <div>List item 1</div>
        <div>List item 2</div>
        <div>List item 3</div>
        <div>List item 4</div>
    </div>
</div>
```

**jQuery**

With default options

```JavaScript
$(document).ready(function(){
    
    $('.myWrapper').easyTicker({
        direction: 'up',
        easing: 'swing',
        speed: 'slow',
        interval: 2000,
        height: 'auto',
        visible: 0,
        mousePause: true,
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
    });

});
```

[See demo](https://www.aakashweb.com/demos/jquery-easy-ticker/)

## Buy me a coffee !

Like this plugin ? If you find it useful and if it helped solved your problem, feel free to [Buy me a Coffee !](https://www.paypal.me/vaakash/6) 😀

## Documentation

Plugin's documentation is available in the plugin homepage. Please refer [this page](https://www.aakashweb.com/jquery-plugins/easy-ticker/) for more details on usage, options and customization features.

## Requirements

* jQuery 1.7+

## License

Copyright (c) 2020 [Aakash Chakravarthy](https://www.aakashweb.com/), released under the MIT License.