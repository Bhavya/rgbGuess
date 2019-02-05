var CanvasUtils = /** @class */ (function () {
    // private canvas: HTMLCanvasElement;
    //private context: CanvasRenderingContext2D;
    function CanvasUtils() {
    }
    CanvasUtils.prototype.changeImage = function () {
        var canvas = document.getElementById('canvas');
        var context = canvas.getContext("2d");
        var localContext = context;
        var background = new Image();
        canvas.style.background = 'orange';
        background.onload = function () {
            localContext.drawImage(background, 0, 0);
        };
        console.log("Changing image");
    };
    CanvasUtils.prototype.identifyPixel = function () {
    };
    CanvasUtils.prototype.renderMarker = function () {
    };
    return CanvasUtils;
}());
var User = /** @class */ (function () {
    function User() {
    }
    User.prototype.updateScore = function (score, timeStamp) {
    };
    return User;
}());
var canvasUtils = new CanvasUtils();
canvasUtils.changeImage();
console.log("Welcome to rgbGuess!");
