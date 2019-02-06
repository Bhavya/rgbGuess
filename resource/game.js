var com;
(function (com) {
    var rgbguess;
    (function (rgbguess) {
        var user;
        (function (user) {
            var User = /** @class */ (function () {
                function User() {
                }
                User.prototype.updateScore = function (score, timeStamp) {
                };
                return User;
            }());
            user.User = User;
        })(user = rgbguess.user || (rgbguess.user = {}));
    })(rgbguess = com.rgbguess || (com.rgbguess = {}));
})(com || (com = {}));
var com;
(function (com) {
    var rgbguess;
    (function (rgbguess) {
        var game;
        (function (game) {
            var ui;
            (function (ui) {
                var CanvasUtils = /** @class */ (function () {
                    function CanvasUtils() {
                        this.canvas = document.getElementById('canvas');
                        this.context = this.canvas.getContext("2d");
                    }
                    CanvasUtils.prototype.clearCanvas = function () {
                        this.context.fillStyle = "black";
                        this.context.fillRect(0, 0, 1280, 720);
                    };
                    CanvasUtils.prototype.changeImage = function () {
                        var background = new Image();
                        this.canvas.style.backgroundImage = "url('assets/rainbow-texture-image-hd.jpg')";
                        console.log("Changing image");
                    };
                    CanvasUtils.prototype.identifyPixel = function () {
                    };
                    CanvasUtils.prototype.renderMarker = function () {
                    };
                    return CanvasUtils;
                }());
                ui.CanvasUtils = CanvasUtils;
            })(ui = game.ui || (game.ui = {}));
        })(game = rgbguess.game || (rgbguess.game = {}));
    })(rgbguess = com.rgbguess || (com.rgbguess = {}));
})(com || (com = {}));
var com;
(function (com) {
    var rgbguess;
    (function (rgbguess) {
        var game;
        (function (game) {
            var ui;
            (function (ui) {
                var UIControls = /** @class */ (function () {
                    function UIControls() {
                        this.canvas = document.getElementById('canvas');
                        this.context = this.canvas.getContext("2d");
                    }
                    UIControls.prototype.initUI = function () {
                    };
                    return UIControls;
                }());
                ui.UIControls = UIControls;
            })(ui = game.ui || (game.ui = {}));
        })(game = rgbguess.game || (rgbguess.game = {}));
    })(rgbguess = com.rgbguess || (com.rgbguess = {}));
})(com || (com = {}));
///<reference path='user/user.ts'/>
///<reference path='game/ui/canvasutils.ts'/>
///<reference path='game/ui/ui.ts'/>
console.log("Welcome to rgbGuess!");
var com;
(function (com) {
    var rgbguess;
    (function (rgbguess) {
        var CanvasUtils = com.rgbguess.game.ui.CanvasUtils;
        var UIControls = com.rgbguess.game.ui.UIControls;
        var Main = /** @class */ (function () {
            function Main() {
                this.canvasUtils = new CanvasUtils();
                this.uiControls = new UIControls();
            }
            Main.prototype.start = function () {
                this.uiControls.initUI();
                this.canvasUtils.changeImage();
            };
            return Main;
        }());
        rgbguess.Main = Main;
    })(rgbguess = com.rgbguess || (com.rgbguess = {}));
})(com || (com = {}));
function gameLoop() {
    requestAnimationFrame(gameLoop);
}
window.onload = function (event) {
    //Get class from namespace.
    var Main = com.rgbguess.Main;
    var application = new Main();
    application.start();
    gameLoop();
};
