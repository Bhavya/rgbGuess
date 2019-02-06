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
            this.uiControls.initUI();
            this.canvasUtils.changeImage();
        }
    }
}

function gameLoop() {
    requestAnimationFrame(gameLoop);
}

window.onload = function(event) {
    //Get class from namespace.
    var Main = com.rgbguess.Main;

    var application = new Main();
    application.start();
    gameLoop();
}