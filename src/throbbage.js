var throbbage = (function () {

    var getPrefixedProperty = (function () {
        var vendorPrefixes = ["", "-webkit-", "-moz-"];
        return function (property, prefixOnly) {
            var i;
            var prop;
            for (i = 0; i < vendorPrefixes.length; i++) {
                prop = vendorPrefixes[i] + property;
                if (prop in document.body.style) {
                    return prefixOnly ? vendorPrefixes[i] : prop;
                }
            }
            return null;
        };
    })();

    var addClass = function (element, className) {
        element.className += " throbbage-" + className;
    };

    var toggleVisibility = function (element, toggle) {
        element.style.visibility = toggle ? "visible" : "hidden";
    };

    var bootstrapContainer = function (container) {
        var throbberPiece = document.createElement("b");
        var containerStyle = container.style;
        var throbberPieceStyle = throbberPiece.style;

        containerStyle.position = "relative";
        throbberPieceStyle.position = "absolute";

        addClass(container, "container");
        toggleVisibility(throbberPiece, false);
        container.appendChild(throbberPiece);

        return throbberPiece;
    };

    var setupCss = function (container, throbberPiece, duration) {
        var lastStyleSheet = document.styleSheets[document.styleSheets.length - 1];

        var transformProperty = getPrefixedProperty("transform");
        var animationProperty = getPrefixedProperty("animation");

        var throbberPieceStyle = throbberPiece.style;


        var radius = (container.offsetWidth - throbberPiece.offsetWidth) / 2;

        throbberPieceStyle.left = 0;
        throbberPieceStyle.top = "50%";
        throbberPieceStyle.marginTop = -throbberPiece.offsetHeight / 2 + "px";

        lastStyleSheet.insertRule("@" + getPrefixedProperty("animation", true) + "keyframes throbbage-spin { from { " + transformProperty + ": rotateZ(0);  } to {" + transformProperty + ": rotateZ(-360deg);} }", lastStyleSheet.cssRules.length);

        throbberPieceStyle[animationProperty] = "throbbage-spin " + duration + "ms infinite linear";
        throbberPieceStyle[getPrefixedProperty("transform-origin")] = container.offsetWidth / 2 + "px";
        return {
            play: function () {
                toggleVisibility(throbberPiece, true);
            },
            pause: function () {
                toggleVisibility(throbberPiece, false);
            }
        };
    };

    var setupJs = function (container, throbberPiece, duration) {
        var angle = 0;
        var radius = (container.offsetWidth - throbberPiece.offsetWidth) / 2;
        var offset = radius;
        var lastTime = Date.now();
        var animation = null;
        var raf = (function () {
            return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
                window.setTimeout(callback, 0);
            };
        })();
        var caf = (function () {
            return window.cancelAnimationFrame ||
                window.webkitCancelRequestAnimationFrame ||
                window.mozCancelRequestAnimationFrame ||
                window.oCancelRequestAnimationFrame ||
                window.msCancelRequestAnimationFrame ||
                clearTimeout
        })();

        return {
            play: function () {
                var piTwice = Math.PI * 2;
                toggleVisibility(throbberPiece, true);

                (function me() {
                    var style = throbberPiece.style;
                    var x = offset + Math.cos(angle) * radius;
                    var y = offset + Math.sin(angle) * radius;

                    angle += piTwice / duration * (+new Date - lastTime);
                    angle %= piTwice;

                    style.left = x + "px";
                    style.top = y + "px";

                    lastTime = +new Date;
                    animation = raf(me);
                })();
            },
            pause: function () {
                caf(animation);
                toggleVisibility(throbberPiece, false);
            }
        };

    };

    var init = function (container, duration) {
        var throbberPiece = bootstrapContainer(container);
        var supportsTransition = !! getPrefixedProperty("animation");

        // Do it with CSS, or do it with JS.
        if (supportsTransition) {
            return setupCss(container, throbberPiece, duration);
        } else {
            return setupJs(container, throbberPiece, duration);
        }
    };

    return init;
})();