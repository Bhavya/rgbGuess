///<reference path='events/submissionevent.ts'/>
///<reference path='user/user.ts'/>
///<reference path='game/ui/canvasutils.ts'/>
///<reference path='game/ui/ui.ts'/>
///<reference path='game/ui/RGB.ts'/>
///<reference path='game/ui/StartingModal.ts'/>
///<reference path='constants/constants.ts'/>

console.log("Welcome to rgbGuess!");

import Events = com.rgbguess.events;
import CanvasUtils = com.rgbguess.game.ui.CanvasUtils;
import RGB = com.rgbguess.game.ui.RGB;
import StartingModal = com.rgbguess.game.ui.StartingModal;
import UIControls = com.rgbguess.game.ui.UIControls;
import User = com.rgbguess.user;
import Constants = com.rgbguess.constants;

module com.rgbguess {
    export class Main {
        private canvasUtils = new CanvasUtils();
        private uiControls = new UIControls();

        constructor() {
        }

        initialize() {
            this.uiControls.initUI();
            let modal: StartingModal = new StartingModal();
            modal.construct();
            modal.show();
            (<HTMLDivElement>document.getElementById("side-top")).style.display = "none";
            (<HTMLDivElement>document.getElementById("control-bar")).style.display = "none";
        }

        start() {
            (<HTMLDivElement>document.getElementById("modal")).style.display = "none";
            this.canvasUtils.changeColour();
        }

        validatePassKey(colourValueInputElement: HTMLInputElement, event: KeyboardEvent) {
            this.uiControls.validatePassKey(colourValueInputElement, event);
        }

        checkSubmission(rgb: RGB) {
            let canvasUtils = this.canvasUtils;
            this.canvasUtils.checkAccuracy(rgb, function () {
                canvasUtils.changeColour();
                let score = document.getElementById("score");
                score.innerHTML = User.score.toString();
            });
            //this.canvasUtils.identifyPixelColour();
        }
    }
}

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
}

window.addEventListener(Events.SUBMISSION_EVENT, function (e: CustomEvent) {
    let detail: { r: number; g: number; b: number } = e.detail;
    application.checkSubmission(new RGB(detail.r, detail.g, detail.b));
}, false);

window.addEventListener(Events.START_EVENT, function (e: CustomEvent) {
    console.log("received starting event");
    let fiveMinutes = 60 * 2;
    var display = document.querySelector('#timer');
    startTimer(fiveMinutes, display);
    (<HTMLDivElement>document.getElementById("side-top")).style.display = "block";
    (<HTMLDivElement>document.getElementById("control-bar")).style.display = "block";
    application.start();
}, false);

/**
 * Timer
 * @param duration 
 * @param display 
 */

function startTimer(duration, display) {
    console.log("starting timer");
    var timer: number = duration;
    var minutes: number;
    var seconds: number;
    var s_minutes: string;
    var s_seconds: string;

    var handler = setInterval(function () {
        minutes = Math.floor(timer / 60);
        seconds = timer % 60;

        s_minutes = minutes < 10 ? "0" + minutes : minutes.toString();
        s_seconds = seconds < 10 ? "0" + seconds : seconds.toString();

        display.textContent = s_minutes + ":" + s_seconds;

        timer = timer - 1;
        if (duration - timer == 1) {
            (<HTMLDivElement>document.getElementById("modal")).style.display = "none";
        }
        if (timer < 0) {
            timer = duration;
            clearInterval(handler);
            (<HTMLDivElement>document.getElementById("side-top")).style.display = "none";
            (<HTMLDivElement>document.getElementById("control-bar")).style.display = "none";
        }
    }, 1000);
}

/**
* APIs
*/
function ValidatePassKey(colourValueInputElement: HTMLInputElement, event: KeyboardEvent) {
    application.validatePassKey(colourValueInputElement, event);
}