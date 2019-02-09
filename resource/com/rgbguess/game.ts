///<reference path='user/user.ts'/>
///<reference path='game/ui/canvasutils.ts'/>
///<reference path='game/ui/ui.ts'/>

console.log("Welcome to rgbGuess!");

module com.rgbguess {

    import CanvasUtils = com.rgbguess.game.ui.CanvasUtils;
    import UIControls = com.rgbguess.game.ui.UIControls;
    import User = com.rgbguess.user.User;

    export class Main {
        private canvasUtils = new CanvasUtils();
        private uiControls = new UIControls();

        constructor() {
        }

        start() {
            this.canvasUtils.changeImage();
            this.uiControls.initUI();
        }

        validatePassKey(colourValueInputElement: HTMLInputElement, event: KeyboardEvent) {
            this.uiControls.validatePassKey(colourValueInputElement, event);
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

/**
* APIs
*/
function ValidatePassKey(colourValueInputElement: HTMLInputElement, event: KeyboardEvent) {
    application.validatePassKey(colourValueInputElement, event);
}