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

        start() {
            this.uiControls.initUI();
            let modal: StartingModal = new StartingModal();
            modal.construct();
            modal.show();
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
    application.start();
    gameLoop();

    let fiveMinutes = 60 * 2;
    var display = document.querySelector('#timer');
    startTimer(fiveMinutes, display);
}

window.addEventListener(Events.SUBMISSION_EVENT, function (e: CustomEvent) {
    let detail: { r: number; g: number; b: number } = e.detail;
    application.checkSubmission(new RGB(detail.r, detail.g, detail.b));
}, false);

function startTimer(duration, display) {
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

        if (--timer < 0) {
            timer = duration;
            clearInterval(handler);
        }
    }, 1000);
}

/**
* APIs
*/
function ValidatePassKey(colourValueInputElement: HTMLInputElement, event: KeyboardEvent) {
    application.validatePassKey(colourValueInputElement, event);
}