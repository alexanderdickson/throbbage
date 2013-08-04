var throbbage = (function() {

var getPrefixedProperty = (function () {
    var vendorPrefixes = ["", "-webkit-", "-moz-"];
    return function (property) {
        var i;
        var prop;
        for (i = 0; i < vendorPrefixes.length; i++) {
            prop = vendorPrefixes[i] + property;
            if (prop in document.body.style) {
                return prop;
            }
        }
        return null;
    };
})();

var addClass = function (element, className) {
    element.className += " throbbage-" + className;
};

var bootstrapContainer = function (container) {
    var throbberPiece = document.createElement("span");
    var containerStyle = container.style;
    var throbberStyle = throbberPiece.style;

    containerStyle.position = "relative";
    throbberStyle.position = "absolute";

    addClass(container, "container");
    container.appendChild(throbberPiece);

    return throbberPiece;

};

var setupJs = function (container, throbberPiece) {
    var angle = 0;
    var radius = (container.offsetWidth - throbberPiece.offsetWidth) / 2;
    var offset = radius;
    var lastTime = Date.now();
    var raf = (function () {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
            window.setTimeout(callback, 0);
        };
    })();

    (function me() {
        var style = throbberPiece.style;
        var x = offset + Math.cos(angle) * radius;
        var y = offset + Math.sin(angle) * radius;

        angle += .01 * (Date.now() - lastTime);
        angle = angle % (Math.PI * 2);

        style.left = x + "px";
        style.top = y + "px";

        lastTime = Date.now();
        raf(me);
    })();
};
    
    var pause = function() {
        
    };
    
    var play = function() {
        
    };

var init = function (container) {
    var throbberPiece = bootstrapContainer(container);

    var transformProperty = getPrefixedProperty("transform");
    var supportsTransition = !! transformProperty;

    supportsTransition = false;

    // Do it with CSS, or do it with JS.
    if (supportsTransition) {

    } else {
        setupJs(container, throbberPiece);
    }
    
    return {
        pause: pause,
        play: play
    };
    
};
    
    return init;
    
})();


