module com.rgbguess.game.ui {
    export class UIControls {
        private canvas: HTMLCanvasElement;
        private context: CanvasRenderingContext2D;

        constructor() {
            this.canvas = <HTMLCanvasElement>document.getElementById('canvas');
            this.context = this.canvas.getContext("2d");
        }

        initUI() {

        }

        drawStartButton() {

        }

        clearStartButton() {
            
        }
    }
}