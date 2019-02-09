///<reference path='../../api/imagefetcher.ts'/>
///<reference path='../../constants/constants.ts'/>

module com.rgbguess.game.ui {

    import ImageFetcher = com.rgbguess.api.ImageFetcher;

    export class CanvasUtils {
        private canvas: HTMLCanvasElement;
        private context: CanvasRenderingContext2D;
        private imageFetcher: ImageFetcher;

        constructor() {
            this.canvas = <HTMLCanvasElement>document.getElementById('canvas');
            this.context = this.canvas.getContext("2d");
            this.imageFetcher = new ImageFetcher();
            this.imageFetcher.loadImages();
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

        renderMarker(x:number, y: number) {
            this.context.beginPath();
            this.context.arc(x, scrollY, 50, 0, 2 * Math.PI);
            this.context.stroke();
        }
    }
}