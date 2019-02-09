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
                    CanvasUtils.prototype.getCanvasContext = function () {
                        return this.context;
                    };
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
        var constants;
        (function (constants) {
            constants.CANVAS_WIDTH = new Number(1000);
            constants.CANVAS_HEIGHT = new Number(500);
        })(constants = rgbguess.constants || (rgbguess.constants = {}));
    })(rgbguess = com.rgbguess || (com.rgbguess = {}));
})(com || (com = {}));
///<reference path='../../constants/constants.ts'/>
var com;
(function (com) {
    var rgbguess;
    (function (rgbguess) {
        var game;
        (function (game) {
            var ui;
            (function (ui) {
                var RGB = /** @class */ (function () {
                    function RGB(r, g, b) {
                        this.r = r;
                        this.g = g;
                        this.b = b;
                    }
                    RGB.prototype.toString = function () {
                        var stringVal = "rgb(" + this.r + "," + this.g + "," + this.b + ")";
                        return stringVal;
                    };
                    return RGB;
                }());
                ui.RGB = RGB;
                var UIControls = /** @class */ (function () {
                    function UIControls() {
                        this.canvas = document.getElementById('canvas');
                        this.context = this.canvas.getContext("2d");
                        this.canvas.width = com.rgbguess.constants.CANVAS_WIDTH.valueOf(); //horizontal resolution (?) - increase for better looking text
                        this.canvas.height = com.rgbguess.constants.CANVAS_HEIGHT.valueOf();
                        ; //vertical resolution (?) - increase for better looking text
                    }
                    UIControls.prototype.initUI = function () {
                        this.drawStartButton();
                    };
                    UIControls.prototype.drawStartButton = function () {
                        var buttonWidth = new Number(180);
                        var buttonHeight = new Number(50);
                        var buttonX = new Number(this.canvas.width / 2 - buttonWidth.valueOf() / 2);
                        var buttonY = new Number(this.canvas.height / 2 - buttonHeight.valueOf());
                        var button = new Button(buttonX.valueOf(), buttonY.valueOf(), buttonWidth.valueOf(), buttonHeight.valueOf());
                        button.draw();
                    };
                    UIControls.prototype.clearStartButton = function () {
                    };
                    UIControls.prototype.validatePassKey = function (colourValueInputElement, event) {
                        console.log(event.keyCode);
                        var colourValueTextBoxIndex = colourValueInputElement.id;
                        var nextIndex = parseInt(colourValueTextBoxIndex);
                        var textBoxValue = Number(colourValueInputElement.value);
                        if (isNaN(textBoxValue) || textBoxValue > 255) {
                            colourValueInputElement.value = Number(255).toString();
                        }
                        switch (event.keyCode.valueOf()) {
                            case 32: // enter
                                if (colourValueInputElement.value.length >= 3) {
                                    nextIndex = (parseInt(colourValueTextBoxIndex) + 1 == 4) ? 1 : parseInt(colourValueTextBoxIndex) + 1;
                                }
                                break;
                            case 68: // d
                                nextIndex = (parseInt(colourValueTextBoxIndex) + 1 == 4) ? 1 : parseInt(colourValueTextBoxIndex) + 1;
                                break;
                            case 65: // a
                                nextIndex = (parseInt(colourValueTextBoxIndex) - 1 == 0) ? 3 : parseInt(colourValueTextBoxIndex) - 1;
                                break;
                            case 8: // backspace
                                if (colourValueInputElement.value.length == 0) {
                                    nextIndex = (parseInt(colourValueTextBoxIndex) - 1 == 0) ? 1 : parseInt(colourValueTextBoxIndex) - 1;
                                }
                                break;
                            case 67: // c
                                colourValueInputElement.value = "";
                                break;
                            case 90: // z
                                document.getElementById("1").value = "",
                                    document.getElementById("2").value = "",
                                    document.getElementById("3").value = "";
                                nextIndex = 1;
                                break;
                            default:
                                if (event.keyCode >= 48
                                    && event.keyCode <= 57 &&
                                    colourValueInputElement.value.length >= 3) {
                                    nextIndex = (parseInt(colourValueTextBoxIndex) + 1 == 4) ? 3 : parseInt(colourValueTextBoxIndex) + 1;
                                }
                                break;
                        }
                        document.getElementById(nextIndex.toString()).focus();
                        this.updateColourPreview(Number(document.getElementById("1").value).valueOf(), Number(document.getElementById("2").value).valueOf(), Number(document.getElementById("3").value).valueOf());
                    };
                    UIControls.prototype.updateColourPreview = function (r, g, b) {
                        var colourPreviewer = document.getElementById("colour-preview");
                        var controlBar = document.getElementById("control-bar");
                        var rgb = new RGB(r, g, b).toString();
                        colourPreviewer.style.background = rgb;
                        controlBar.style.background = rgb;
                    };
                    return UIControls;
                }());
                ui.UIControls = UIControls;
                var Button = /** @class */ (function () {
                    function Button(x, y, w, h) {
                        this.x = x;
                        this.y = y;
                        this.w = w;
                        this.h = h;
                        this.canvas = document.getElementById('canvas');
                        this.context = this.canvas.getContext("2d");
                        console.log("new Button");
                    }
                    Button.prototype.getX = function () {
                        return this.x;
                    };
                    Button.prototype.getY = function () {
                        return this.y;
                    };
                    Button.prototype.getWidth = function () {
                        return this.w;
                    };
                    Button.prototype.getHeight = function () {
                        return this.h;
                    };
                    Button.prototype.draw = function () {
                        var path = new Path2D();
                        path.rect(this.x, this.y, this.w, this.h);
                        path.closePath();
                        this.context.fillStyle = "#FFFFFF";
                        this.context.fillStyle = "rgba(225,225,225,0.5)";
                        this.context.fill(path);
                        this.context.lineWidth = 2;
                        this.context.strokeStyle = "#000000";
                        this.context.stroke(path);
                    };
                    return Button;
                }());
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
                this.canvasUtils.changeImage();
                this.uiControls.initUI();
            };
            Main.prototype.validatePassKey = function (colourValueInputElement, event) {
                this.uiControls.validatePassKey(colourValueInputElement, event);
            };
            return Main;
        }());
        rgbguess.Main = Main;
    })(rgbguess = com.rgbguess || (com.rgbguess = {}));
})(com || (com = {}));
var Main = com.rgbguess.Main;
var application = new Main();
function gameLoop() {
    requestAnimationFrame(gameLoop);
}
/**
 * Event Listers
 */
window.onload = function (event) {
    application.start();
    gameLoop();
};
/**
* APIs
*/
function ValidatePassKey(colourValueInputElement, event) {
    application.validatePassKey(colourValueInputElement, event);
}
