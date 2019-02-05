class CanvasUtils {
    // private canvas: HTMLCanvasElement;
    //private context: CanvasRenderingContext2D;

    constructor() {
    }

    changeImage() {
        let canvas = <HTMLCanvasElement>document.getElementById('canvas');
        let context = canvas.getContext("2d");
        let localContext = context;
        let background = new Image();
        background.style.background = 'orange';

        background.onload = function () {
            localContext.drawImage(background, 0, 0);
        }

        console.log("Changing image");
    }

    identifyPixel() {

    }

    renderMarker() {

    }
}

class User {
    totalScore: number;
    scores: Array<number>;
    constructor() { }

    updateScore(score: number, timeStamp: number): void {

    }
}

let canvasUtils = new CanvasUtils();
canvasUtils.changeImage();

console.log("Welcome to rgbGuess!");
