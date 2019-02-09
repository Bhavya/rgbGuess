var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
///<reference path='../../events/submissionevent.ts'/>
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
                    RGB.prototype.getR = function () {
                        return this.r;
                    };
                    RGB.prototype.getG = function () {
                        return this.g;
                    };
                    RGB.prototype.getB = function () {
                        return this.b;
                    };
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
                            case 32: // space bar d -> go forward and wrap around
                                if (colourValueInputElement.value.length >= 3) {
                                    nextIndex = (parseInt(colourValueTextBoxIndex) + 1 == 4) ? 1 : parseInt(colourValueTextBoxIndex) + 1;
                                }
                                break;
                            case 68: // d -> go forward and wrap around
                                nextIndex = (parseInt(colourValueTextBoxIndex) + 1 == 4) ? 1 : parseInt(colourValueTextBoxIndex) + 1;
                                break;
                            case 65: // a -> go back and wrap around
                                nextIndex = (parseInt(colourValueTextBoxIndex) - 1 == 0) ? 3 : parseInt(colourValueTextBoxIndex) - 1;
                                break;
                            case 8: // backspace -> go back and stop at 1
                                if (colourValueInputElement.value.length == 0) {
                                    nextIndex = (parseInt(colourValueTextBoxIndex) - 1 == 0) ? 1 : parseInt(colourValueTextBoxIndex) - 1;
                                }
                                break;
                            case 67: // c -> clear box
                                colourValueInputElement.value = "";
                                break;
                            case 90: // z -> clear all
                                document.getElementById("1").value = "",
                                    document.getElementById("2").value = "",
                                    document.getElementById("3").value = "";
                                nextIndex = 1;
                                break;
                            case 13: // enter -> submit
                                this.submit();
                                break;
                            default: // if you have typed 3 digits go to the next box
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
                        this.rgbResult = new RGB(r, g, b);
                        var rgb = this.rgbResult.toString();
                        colourPreviewer.style.background = rgb;
                        controlBar.style.background = rgb;
                    };
                    UIControls.prototype.submit = function () {
                        var submissionEvent = new com.rgbguess.events.SubmissionEvent(this.rgbResult).dispatch();
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
///<reference path='../game/ui/ui.ts'/>
///<reference path='IEvent.ts'/>
var com;
(function (com) {
    var rgbguess;
    (function (rgbguess) {
        var events;
        (function (events) {
            var RGBEvent = /** @class */ (function () {
                function RGBEvent(parameters) {
                    this.eventBus = window;
                }
                RGBEvent.prototype.dispatch = function () {
                };
                return RGBEvent;
            }());
            events.RGBEvent = RGBEvent;
        })(events = rgbguess.events || (rgbguess.events = {}));
    })(rgbguess = com.rgbguess || (com.rgbguess = {}));
})(com || (com = {}));
///<reference path='../game/ui/ui.ts'/>
///<reference path='rgbevent.ts'/>
var com;
(function (com) {
    var rgbguess;
    (function (rgbguess) {
        var events;
        (function (events) {
            events.SUBMISSION_EVENT = "submission";
            var SubmissionEvent = /** @class */ (function (_super) {
                __extends(SubmissionEvent, _super);
                function SubmissionEvent(rgb) {
                    var _this = _super.call(this, rgb) || this;
                    _this.rgb = rgb;
                    return _this;
                }
                SubmissionEvent.prototype.dispatch = function () {
                    var event = new CustomEvent(events.SUBMISSION_EVENT, {
                        detail: {
                            r: this.rgb.getR(),
                            g: this.rgb.getG(),
                            b: this.rgb.getB()
                        }
                    });
                    this.eventBus.dispatchEvent(event);
                };
                return SubmissionEvent;
            }(events.RGBEvent));
            events.SubmissionEvent = SubmissionEvent;
        })(events = rgbguess.events || (rgbguess.events = {}));
    })(rgbguess = com.rgbguess || (com.rgbguess = {}));
})(com || (com = {}));
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
        var api;
        (function (api) {
            var ImageFetcher = /** @class */ (function () {
                function ImageFetcher() {
                    this.uriArray = new Array();
                    this.length = 0;
                }
                ImageFetcher.prototype.loadImages = function () {
                    this.addImage("rainbow-texture-image-hd.jpg");
                    this.addImage("Autumn_fireball.jpg");
                    this.addImage("Tulipes-dans-Central-Park-1.jpg");
                };
                ImageFetcher.prototype.getAllImages = function () {
                    return this.uriArray;
                };
                ImageFetcher.prototype.getRandomImage = function () {
                    var index = Math.round(Math.random() * (this.length - 1));
                    console.log("index:" + index);
                    return this.uriArray[index].toString();
                };
                ImageFetcher.prototype.addImage = function (name) {
                    this.uriArray[this.length] = "assets/" + name;
                    this.length += 1;
                };
                return ImageFetcher;
            }());
            api.ImageFetcher = ImageFetcher;
        })(api = rgbguess.api || (rgbguess.api = {}));
    })(rgbguess = com.rgbguess || (com.rgbguess = {}));
})(com || (com = {}));
///<reference path='../../api/imagefetcher.ts'/>
///<reference path='../../constants/constants.ts'/>
var com;
(function (com) {
    var rgbguess;
    (function (rgbguess) {
        var game;
        (function (game) {
            var ui;
            (function (ui) {
                var ImageFetcher = com.rgbguess.api.ImageFetcher;
                var CanvasUtils = /** @class */ (function () {
                    function CanvasUtils() {
                        this.canvas = document.getElementById('canvas');
                        this.context = this.canvas.getContext("2d");
                        this.imageFetcher = new ImageFetcher();
                        this.imageFetcher.loadImages();
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
                        background.src = this.imageFetcher.getRandomImage();
                        // Make sure the image is loaded first otherwise nothing will draw.
                        var localContext = this.context;
                        background.onload = function () {
                            localContext.drawImage(background, 0, 0);
                        };
                        console.log("Changing image");
                    };
                    CanvasUtils.prototype.identifyPixelColour = function () {
                        // Get the CanvasPixelArray from the given coordinates and dimensions.
                        var imgd = this.context.getImageData(0, 0, 1000, 500);
                        var pix = imgd.data;
                        var randX = Math.round(Math.random() * imgd.width);
                        var randY = Math.round(Math.random() * imgd.height);
                        var randR = pix[randY * imgd.width + randX];
                        var randG = pix[randY * imgd.width + randX + 1];
                        var randB = pix[randY * imgd.width + randX + 2];
                        this.renderMarker(randX, randY);
                        var loggingString = "Color at (" + randX + "," + randY + ") = rgb(" + randR + "," + randG + "," + randB + ")";
                        console.log(loggingString);
                    };
                    CanvasUtils.prototype.renderMarker = function (x, y) {
                        this.context.beginPath();
                        this.context.arc(x, scrollY, 50, 0, 2 * Math.PI);
                        this.context.stroke();
                    };
                    return CanvasUtils;
                }());
                ui.CanvasUtils = CanvasUtils;
            })(ui = game.ui || (game.ui = {}));
        })(game = rgbguess.game || (rgbguess.game = {}));
    })(rgbguess = com.rgbguess || (com.rgbguess = {}));
})(com || (com = {}));
///<reference path='events/submissionevent.ts'/>
///<reference path='user/user.ts'/>
///<reference path='game/ui/canvasutils.ts'/>
///<reference path='game/ui/ui.ts'/>
console.log("Welcome to rgbGuess!");
var Events = com.rgbguess.events;
var CanvasUtils = com.rgbguess.game.ui.CanvasUtils;
var UIControls = com.rgbguess.game.ui.UIControls;
var User = com.rgbguess.user.User;
var com;
(function (com) {
    var rgbguess;
    (function (rgbguess) {
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
            Main.prototype.checkSubmission = function () {
                //this.canvasUtils.changeImage();
                this.canvasUtils.identifyPixelColour();
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
window.addEventListener(Events.SUBMISSION_EVENT, function (e) {
    application.checkSubmission();
}, false);
/**
* APIs
*/
function ValidatePassKey(colourValueInputElement, event) {
    application.validatePassKey(colourValueInputElement, event);
}
