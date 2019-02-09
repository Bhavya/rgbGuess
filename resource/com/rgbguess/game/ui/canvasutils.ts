///<reference path='../../api/imagefetcher.ts'/>
///<reference path='../../constants/constants.ts'/>
///<reference path='../../config.ts'/>


module com.rgbguess.game.ui {

    import ImageFetcher = com.rgbguess.api.ImageFetcher;
    import RGB = com.rgbguess.game.ui.RGB;
    import config = com.rgbGuess.Config.config;

    export class CanvasUtils {
        private canvas: HTMLCanvasElement;
        private context: CanvasRenderingContext2D;
        private imageFetcher: ImageFetcher;
        private pixelColour = new RGB(0, 0, 0);

        private mode: number = 0;

        constructor() {
            this.canvas = <HTMLCanvasElement>document.getElementById('canvas');
            this.context = this.canvas.getContext("2d");
            this.imageFetcher = new ImageFetcher();
            this.imageFetcher.loadImages();

            this.mode = parseInt(config.get("mode"));
        }

        getCanvasContext() {
            return this.context;
        }

        clearCanvas() {
            this.context.fillStyle = "black";
            this.context.fillRect(0, 0, 1280, 720);
        }

        change() {
            if (this.mode == 0) {
                this.changeColour();
            } else {
                this.changeImage();
            }
        }

        changeColour() {
            let rgb = new RGB(
                Math.round(Math.random() * 255),
                Math.round(Math.random() * 255),
                Math.round(Math.random() * 255),
            );
            this.pixelColour = rgb;
            this.context.fillStyle = rgb.toString();
            this.context.fillRect(0, 0, 1280, 720);
        }

        changeImage() {
            let background = new Image();
            background.src = this.imageFetcher.getRandomImage();

            // Make sure the image is loaded first otherwise nothing will draw.
            let localContext = this.context;
            background.onload = function () {
                localContext.drawImage(background, 0, 0);
            }

            console.log("Changing image");
        }

        identifyPixelColour() {
            // Get the CanvasPixelArray from the given coordinates and dimensions.
            var imgd = this.context.getImageData(0, 0, 1000, 500);
            var pix = imgd.data;

            let randX: number = Math.round(Math.random() * imgd.width);
            let randY: number = Math.round(Math.random() * imgd.height);

            let randR = pix[randY * imgd.width + randX]
            let randG = pix[randY * imgd.width + randX + 1];
            let randB = pix[randY * imgd.width + randX + 2];

            this.renderMarker(randX, randY);
            let loggingString = `Color at (${randX},${randY}) = rgb(${randR},${randG},${randB})`;
            console.log(loggingString);
        }

        renderMarker(x: number, y: number) {
            this.context.beginPath();
            this.context.arc(x, scrollY, 50, 0, 2 * Math.PI);
            this.context.stroke();
        }

        checkAccuracy(rgb: RGB, callback): void {
            try {
                let accuracy: number = 0;

                let x = this.pixelColour.getR() - rgb.getR();
                let y = this.pixelColour.getG() - rgb.getG();
                let z = this.pixelColour.getB() - rgb.getB();

                let alt = Math.abs(Math.atan2(y, Math.sqrt(x * x + z * z)));
                let unscaledAccuracy = 100 - Math.round(alt * 100);

                accuracy = this.scaledAccuracy(unscaledAccuracy);
                let loggingString = `${accuracy}%`;
                console.log(loggingString);
            } catch (e) {
                //
            } finally {
                callback();
                console.log("callback");
            }
        }

        private scaledAccuracy(angle: number): number {
        if (angle < 70) {
            return 0;
        }

        return 100 * (angle - 70) / 30;
    }
}
}