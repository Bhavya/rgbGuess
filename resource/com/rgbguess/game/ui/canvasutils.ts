///<reference path='../../api/imagefetcher.ts'/>
///<reference path='../../constants/constants.ts'/>
///<reference path='../../config.ts'/>
///<reference path='../../user/user.ts'/>
///<reference path='RGB.ts'/>
///<reference path='Overlay.ts'/>


module com.rgbguess.game.ui {

    import ImageFetcher = com.rgbguess.api.ImageFetcher;
    import RGB = com.rgbguess.game.ui.RGB;
    import User = com.rgbguess.user;
    import config = com.rgbguess.Config.config;
    import Overlay = com.rgbguess.game.ui.Overlay;

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
                console.log(rgb.toString());
                console.log(this.pixelColour.toString());
                let accuracy: number = 0;

                let x = Math.abs(this.pixelColour.getR() - rgb.getR());
                let y = Math.abs(this.pixelColour.getG() - rgb.getG());
                let z = Math.abs(this.pixelColour.getB() - rgb.getB());

                let percentX = 1 - x / 255;
                let percentY = 1 - y / 255;
                let percentZ = 1 - z / 255;

                accuracy = 100 * (percentX + percentY + percentZ) / 3;
                accuracy = this.scaledAccuracy(accuracy);

                if (accuracy <= 85) {
                    User.score += Math.round(accuracy * 10);
                } else {
                    User.score += Math.round(accuracy * 100);
                }

                let loggingString = `${accuracy}%`;

                accuracy = Math.round(accuracy);
                let overlay = new Overlay();
                overlay.setMessage(`${accuracy}%`);
                overlay.blast();
                console.log(loggingString);
            } catch (e) {
                //
            } finally {
                callback();
                console.log("callback");
            }
        }

        scaledAccuracy(accuracy: number) {
            return 100 * Math.max((accuracy - 60) / 40, 0);
        }
    }
}