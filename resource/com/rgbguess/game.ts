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
import User = com.rgbguess.user.User;
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
}

window.addEventListener(Events.SUBMISSION_EVENT, function (e: CustomEvent) {
    let detail: { r: number; g: number; b: number } = e.detail;
    application.checkSubmission(new RGB(detail.r, detail.g, detail.b));
}, false);

/**
* APIs
*/
function ValidatePassKey(colourValueInputElement: HTMLInputElement, event: KeyboardEvent) {
    application.validatePassKey(colourValueInputElement, event);
}