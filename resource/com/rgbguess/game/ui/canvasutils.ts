module com.rgbguess.game.ui {

    export class CanvasUtils {
        private canvas: HTMLCanvasElement;
        private context: CanvasRenderingContext2D;

        constructor() {
            this.canvas = <HTMLCanvasElement>document.getElementById('canvas');
            this.context = this.canvas.getContext("2d");
        }

        getCanvasContext() {
            return this.context;
        }

        clearCanvas() {
            this.context.fillStyle = "black";
            this.context.fillRect(0, 0, 1280, 720);
        }

        changeImage() {
            let background = new Image();
            this.canvas.style.backgroundImage = "url('assets/rainbow-texture-image-hd.jpg')";
            console.log("Changing image");
        }

        identifyPixel() {

        }

        renderMarker() {

        }
    }
}