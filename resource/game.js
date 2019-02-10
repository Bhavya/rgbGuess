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
            constants.RULES = "How to play:\n                        <ul>\n                            <li>A marker will indicate the colour of a random pixel on the screen. Don't worry; the pixel will\n                                be magnified.</li>\n                            <li>You will guess the RGB value of this pixel and type it in as quickly as possible. Once you\n                                submit your guess, the image will change.</li>\n                            <li>You will have 2 minutes to make as many close guesses as possible.</li>\n                        </ul>";
            constants.SCORING = "Scoring:\n                            <ul>\n                                <li>Your score is determined by the speed of your guess, the accuracy of your guess, and how many\n                                    images\n                                    you are able to get through within the two minute window.\n                                </li>\n                            </ul>";
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
                var UIControls = /** @class */ (function () {
                    function UIControls() {
                        this.canvas = document.getElementById('canvas');
                        this.context = this.canvas.getContext("2d");
                        this.canvas.width = com.rgbguess.constants.CANVAS_WIDTH.valueOf(); //horizontal resolution (?) - increase for better looking text
                        this.canvas.height = com.rgbguess.constants.CANVAS_HEIGHT.valueOf();
                        ; //vertical resolution (?) - increase for better looking text
                    }
                    UIControls.prototype.initUI = function () {
                    };
                    UIControls.prototype.validatePassKey = function (colourValueInputElement, event) {
                        var colourValueTextBoxIndex = colourValueInputElement.id;
                        var nextIndex = parseInt(colourValueTextBoxIndex);
                        var textBoxValue = Number(colourValueInputElement.value);
                        if (isNaN(textBoxValue) || textBoxValue > 255) {
                            colourValueInputElement.value = Number(255).toString();
                        }
                        console.log(event.keyCode);
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
                            case 87: // w -> increment value
                                colourValueInputElement.value = new String(parseInt(colourValueInputElement.value) + 1).toString();
                                break;
                            case 83: // s -> decrement value
                                colourValueInputElement.value = new String(parseInt(colourValueInputElement.value) - 1).toString();
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
                                document.getElementById("1").value = "",
                                    document.getElementById("2").value = "",
                                    document.getElementById("3").value = "";
                                nextIndex = 1;
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
                        this.rgbResult = new ui.RGB(r, g, b);
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
///<reference path='../game/ui/RGB.ts'/>
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
            user.score = 0;
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
var LiteHashMap = /** @class */ (function () {
    function LiteHashMap() {
        this._keys = new Array();
        this._values = new Array();
        this._entrySet = new Array();
        var init = new Array();
        this.size = 0;
    }
    LiteHashMap.prototype.keySet = function () {
        return this._keys;
    };
    LiteHashMap.prototype.values = function () {
        return this._values;
    };
    LiteHashMap.prototype.entrySet = function () {
        return this._entrySet;
    };
    LiteHashMap.prototype.put = function (key, value) {
        this._keys.push(key);
        this._values.push(value);
        this._entrySet.push({ key: key, value: value });
        this.size++;
    };
    LiteHashMap.prototype.get = function (key) {
        var index = 0;
        for (var x; x < this._keys.length; x++) {
            if (this._keys[x] == key) {
                index = x;
                break;
            }
        }
        return this._values[index];
    };
    LiteHashMap.prototype.clear = function () {
        this._keys = new Array();
        this._values = new Array();
        this.size = 0;
    };
    LiteHashMap.prototype["delete"] = function (key) {
        var index = 0;
        var success = false;
        for (var x; x < this._keys.length; x++) {
            if (this._keys[x] == key) {
                index = x;
                success = true;
                break;
            }
        }
        this._keys.splice(index, 1);
        this._values.splice(index, 1);
        this.size--;
        return success;
    };
    LiteHashMap.prototype.has = function (key) {
        var hasKey = false;
        for (var x; x < this._keys.length; x++) {
            if (this._keys[x] == key) {
                hasKey = true;
                break;
            }
        }
        return hasKey;
    };
    return LiteHashMap;
}());
///<reference path='lib/Dictionary.ts'/>
var com;
(function (com) {
    var rgbguess;
    (function (rgbguess) {
        var Config;
        (function (Config) {
            Config.config = new LiteHashMap();
            Config.config.put("mode", 0);
            Config.config.put("hi", "hi");
        })(Config = rgbguess.Config || (rgbguess.Config = {}));
    })(rgbguess = com.rgbguess || (com.rgbguess = {}));
})(com || (com = {}));
///<reference path='../../api/imagefetcher.ts'/>
///<reference path='../../constants/constants.ts'/>
///<reference path='../../config.ts'/>
///<reference path='../../user/user.ts'/>
var com;
(function (com) {
    var rgbguess;
    (function (rgbguess) {
        var game;
        (function (game) {
            var ui;
            (function (ui) {
                var ImageFetcher = com.rgbguess.api.ImageFetcher;
                var RGB = com.rgbguess.game.ui.RGB;
                var User = com.rgbguess.user;
                var config = com.rgbguess.Config.config;
                var CanvasUtils = /** @class */ (function () {
                    function CanvasUtils() {
                        this.pixelColour = new RGB(0, 0, 0);
                        this.mode = 0;
                        this.canvas = document.getElementById('canvas');
                        this.context = this.canvas.getContext("2d");
                        this.imageFetcher = new ImageFetcher();
                        this.imageFetcher.loadImages();
                        this.mode = parseInt(config.get("mode"));
                    }
                    CanvasUtils.prototype.getCanvasContext = function () {
                        return this.context;
                    };
                    CanvasUtils.prototype.clearCanvas = function () {
                    };
                    CanvasUtils.prototype.change = function () {
                        if (this.mode == 0) {
                            this.changeColour();
                        }
                        else {
                            this.changeImage();
                        }
                    };
                    CanvasUtils.prototype.changeColour = function () {
                        var rgb = new RGB(Math.round(Math.random() * 255), Math.round(Math.random() * 255), Math.round(Math.random() * 255));
                        this.pixelColour = rgb;
                        this.context.fillStyle = rgb.toString();
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
                    CanvasUtils.prototype.checkAccuracy = function (rgb, callback) {
                        try {
                            console.log(rgb.toString());
                            console.log(this.pixelColour.toString());
                            var accuracy = 0;
                            var x = Math.abs(this.pixelColour.getR() - rgb.getR());
                            var y = Math.abs(this.pixelColour.getG() - rgb.getG());
                            var z = Math.abs(this.pixelColour.getB() - rgb.getB());
                            var percentX = 1 - x / 255;
                            var percentY = 1 - y / 255;
                            var percentZ = 1 - z / 255;
                            accuracy = 100 * (percentX + percentY + percentZ) / 3;
                            User.score += Math.round(accuracy * 100);
                            var loggingString = accuracy + "%";
                            console.log(loggingString);
                        }
                        catch (e) {
                            //
                        }
                        finally {
                            callback();
                            console.log("callback");
                        }
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
                var Modal = /** @class */ (function () {
                    function Modal() {
                        this.modalContext = document.getElementById("modal");
                        this.modal = document.createElement("div");
                        this.closeButton = document.createElement("span");
                        this.header = document.createElement("header");
                        this.heading = document.createElement("h1");
                        this.subtitle = document.createElement("h2");
                        this.content = document.createElement("div");
                        this.footer = this.footer = document.createElement("footer");
                        this.modal.className = "modal-content";
                        this.modalContext.appendChild(this.modal);
                        this.closeButton.className = "close";
                        this.closeButton.innerHTML = "&times;";
                        this.modal.appendChild(this.closeButton);
                        //this.modalContext.style.display = "none";
                    }
                    ;
                    Modal.prototype.show = function () {
                        this.modal.style.display = "block";
                    };
                    Modal.prototype.close = function () {
                        this.modalContext.style.display = "none";
                        this.cb();
                        console.log("closing");
                    };
                    Modal.prototype.setHeading = function (heading) {
                        this.heading.append(heading);
                    };
                    Modal.prototype.setSubtitle = function (subtitle) {
                        this.subtitle.append(subtitle);
                    };
                    Modal.prototype.setContent = function (content) {
                        this.content.append(content);
                    };
                    Modal.prototype.setFooter = function (footer) {
                        this.footer.append(footer);
                    };
                    Modal.prototype.isShowing = function () {
                        return false;
                    };
                    Modal.prototype.construct = function () {
                        this.header.appendChild(this.heading);
                        this.header.appendChild(this.subtitle);
                        this.modal.appendChild(this.header);
                        this.modal.appendChild(this.content);
                        this.modal.appendChild(this.footer);
                        this.modalContext.appendChild(this.modal);
                        var cb = this.cb;
                        this.closeButton.addEventListener("click", function (e) {
                            document.getElementById("modal").style.display = "none";
                            cb();
                        });
                    };
                    Modal.prototype.setCancelCallback = function (cb) {
                        this.cb = cb;
                    };
                    Modal.prototype.destroy = function () {
                        this.close();
                        this.modalContext.removeChild(this.modal);
                    };
                    return Modal;
                }());
                ui.Modal = Modal;
            })(ui = game.ui || (game.ui = {}));
        })(game = rgbguess.game || (rgbguess.game = {}));
    })(rgbguess = com.rgbguess || (com.rgbguess = {}));
})(com || (com = {}));
///<reference path='rgbevent.ts'/>
var com;
(function (com) {
    var rgbguess;
    (function (rgbguess) {
        var events;
        (function (events) {
            events.START_EVENT = "start";
            var StartEvent = /** @class */ (function (_super) {
                __extends(StartEvent, _super);
                function StartEvent() {
                    return _super.call(this, "") || this;
                }
                StartEvent.prototype.dispatch = function () {
                    var event = new CustomEvent(events.START_EVENT, {
                        detail: {
                            startTime: ""
                        }
                    });
                    this.eventBus.dispatchEvent(event);
                };
                return StartEvent;
            }(events.RGBEvent));
            events.StartEvent = StartEvent;
        })(events = rgbguess.events || (rgbguess.events = {}));
    })(rgbguess = com.rgbguess || (com.rgbguess = {}));
})(com || (com = {}));
///<reference path='Modal.ts'/>
///<reference path='../../constants/constants.ts'/>
///<reference path='../../events/StartEvent.ts'/>
var com;
(function (com) {
    var rgbguess;
    (function (rgbguess) {
        var game;
        (function (game) {
            var ui;
            (function (ui) {
                var Constants = com.rgbguess.constants;
                var StartEvent = com.rgbguess.events.StartEvent;
                var StartingModal = /** @class */ (function (_super) {
                    __extends(StartingModal, _super);
                    function StartingModal() {
                        var _this = _super.call(this) || this;
                        var buttonTut = document.createElement("input");
                        buttonTut.type = "button";
                        buttonTut.className = "primary";
                        buttonTut.value = "Play Tutorial";
                        var buttonPlay = document.createElement("input");
                        buttonPlay.type = "button";
                        buttonPlay.className = "special";
                        buttonPlay.value = "START";
                        var footer = document.createElement("div");
                        footer.appendChild(buttonTut);
                        footer.appendChild(buttonPlay);
                        var rules = document.createElement("p");
                        rules.innerHTML = Constants.RULES;
                        var scoring = document.createElement("p");
                        scoring.innerHTML = Constants.SCORING;
                        _this.setHeading("rgb(G,u,ess)");
                        _this.setSubtitle("A guessing game for people who think they're realllly good at colour matching");
                        _this.setContent(rules);
                        _this.setContent(scoring);
                        _this.setFooter(footer);
                        _this.setCancelCallback(function (e) {
                            console.log("Starting Game");
                            new StartEvent().dispatch();
                        });
                        buttonPlay.addEventListener("click", function (e) {
                            console.log("Starting Game");
                            new StartEvent().dispatch();
                        });
                        return _this;
                    }
                    return StartingModal;
                }(ui.Modal));
                ui.StartingModal = StartingModal;
            })(ui = game.ui || (game.ui = {}));
        })(game = rgbguess.game || (rgbguess.game = {}));
    })(rgbguess = com.rgbguess || (com.rgbguess = {}));
})(com || (com = {}));
///<reference path='events/submissionevent.ts'/>
///<reference path='user/user.ts'/>
///<reference path='game/ui/canvasutils.ts'/>
///<reference path='game/ui/ui.ts'/>
///<reference path='game/ui/RGB.ts'/>
///<reference path='game/ui/StartingModal.ts'/>
///<reference path='constants/constants.ts'/>
console.log("Welcome to rgbGuess!");
var Events = com.rgbguess.events;
var CanvasUtils = com.rgbguess.game.ui.CanvasUtils;
var RGB = com.rgbguess.game.ui.RGB;
var StartingModal = com.rgbguess.game.ui.StartingModal;
var UIControls = com.rgbguess.game.ui.UIControls;
var User = com.rgbguess.user;
var Constants = com.rgbguess.constants;
var com;
(function (com) {
    var rgbguess;
    (function (rgbguess) {
        var Main = /** @class */ (function () {
            function Main() {
                this.canvasUtils = new CanvasUtils();
                this.uiControls = new UIControls();
            }
            Main.prototype.initialize = function () {
                this.uiControls.initUI();
                var modal = new StartingModal();
                modal.construct();
                modal.show();
                document.getElementById("side-top").style.display = "none";
                document.getElementById("control-bar").style.display = "none";
            };
            Main.prototype.start = function () {
                document.getElementById("modal").style.display = "none";
                this.canvasUtils.changeColour();
            };
            Main.prototype.validatePassKey = function (colourValueInputElement, event) {
                this.uiControls.validatePassKey(colourValueInputElement, event);
            };
            Main.prototype.checkSubmission = function (rgb) {
                var canvasUtils = this.canvasUtils;
                this.canvasUtils.checkAccuracy(rgb, function () {
                    canvasUtils.changeColour();
                    var score = document.getElementById("score");
                    score.innerHTML = User.score.toString();
                });
                //this.canvasUtils.identifyPixelColour();
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
    application.initialize();
    gameLoop();
};
window.addEventListener(Events.SUBMISSION_EVENT, function (e) {
    var detail = e.detail;
    application.checkSubmission(new RGB(detail.r, detail.g, detail.b));
}, false);
window.addEventListener(Events.START_EVENT, function (e) {
    console.log("received starting event");
    var fiveMinutes = 60 * 2;
    var display = document.querySelector('#timer');
    startTimer(fiveMinutes, display);
    document.getElementById("side-top").style.display = "block";
    document.getElementById("control-bar").style.display = "block";
    application.start();
}, false);
/**
 * Timer
 * @param duration
 * @param display
 */
function startTimer(duration, display) {
    console.log("starting timer");
    var timer = duration;
    var minutes;
    var seconds;
    var s_minutes;
    var s_seconds;
    var handler = setInterval(function () {
        minutes = Math.floor(timer / 60);
        seconds = timer % 60;
        s_minutes = minutes < 10 ? "0" + minutes : minutes.toString();
        s_seconds = seconds < 10 ? "0" + seconds : seconds.toString();
        display.textContent = s_minutes + ":" + s_seconds;
        timer = timer - 1;
        if (duration - timer == 1) {
            document.getElementById("modal").style.display = "none";
        }
        if (timer < 0) {
            timer = duration;
            clearInterval(handler);
            document.getElementById("side-top").style.display = "none";
            document.getElementById("control-bar").style.display = "none";
        }
    }, 1000);
}
/**
* APIs
*/
function ValidatePassKey(colourValueInputElement, event) {
    application.validatePassKey(colourValueInputElement, event);
}
