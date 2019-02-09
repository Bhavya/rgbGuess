///<reference path='../../constants/constants.ts'/>

module com.rgbguess.game.ui {

    export class RGB {
        private r: number;
        private g: number;
        private b: number;

        constructor(r: number, g: number, b: number) {
            this.r = r;
            this.g = g;
            this.b = b;
        }

        toString() {
            let stringVal = `rgb(${this.r},${this.g},${this.b})`;
            return stringVal;
        }
    }

    export class UIControls {
        private canvas: HTMLCanvasElement;
        private context: CanvasRenderingContext2D;

        constructor() {
            this.canvas = <HTMLCanvasElement>document.getElementById('canvas');
            this.context = this.canvas.getContext("2d");

            this.canvas.width = com.rgbguess.constants.CANVAS_WIDTH.valueOf();//horizontal resolution (?) - increase for better looking text
            this.canvas.height = com.rgbguess.constants.CANVAS_HEIGHT.valueOf();;//vertical resolution (?) - increase for better looking text
        }

        initUI() {
            this.drawStartButton();
        }

        drawStartButton() {
            let buttonWidth = new Number(180);
            let buttonHeight = new Number(50);
            let buttonX = new Number(this.canvas.width / 2 - buttonWidth.valueOf() / 2);
            let buttonY = new Number(this.canvas.height / 2 - buttonHeight.valueOf())

            let button = new Button(buttonX.valueOf(), buttonY.valueOf(), buttonWidth.valueOf(), buttonHeight.valueOf());
            button.draw();
        }

        clearStartButton() {

        }

        validatePassKey(colourValueInputElement: HTMLInputElement, event: KeyboardEvent) {
            console.log(event.keyCode);
            let colourValueTextBoxIndex = colourValueInputElement.id;
            let nextIndex: number = parseInt(colourValueTextBoxIndex);

            let textBoxValue = Number(colourValueInputElement.value);

            if (isNaN(textBoxValue) || textBoxValue > 255) {
                colourValueInputElement.value = Number(255).toString();
            }

            
            switch (event.keyCode.valueOf()) {
                case 32: // enter
                    if (colourValueInputElement.value.length >= 3) {
                        nextIndex = (parseInt(colourValueTextBoxIndex) + 1 == 4) ? 1 : parseInt(colourValueTextBoxIndex) + 1;
                    }
                    break;
                case 68: // d
                    nextIndex = (parseInt(colourValueTextBoxIndex) + 1 == 4) ? 1 : parseInt(colourValueTextBoxIndex) + 1;
                    break;
                case 65: // a
                    nextIndex = (parseInt(colourValueTextBoxIndex) - 1 == 0) ? 3 : parseInt(colourValueTextBoxIndex) - 1;
                    break;
                case 8: // backspace
                    if (colourValueInputElement.value.length == 0) {
                        nextIndex = (parseInt(colourValueTextBoxIndex) - 1 == 0) ? 1 : parseInt(colourValueTextBoxIndex) - 1;
                    }
                    break;
                case 67: // c
                    colourValueInputElement.value = "";
                    break;
                case 90: // z
                    (<HTMLInputElement>document.getElementById("1")).value = "",
                    (<HTMLInputElement>document.getElementById("2")).value = "",
                    (<HTMLInputElement>document.getElementById("3")).value = "";
                    nextIndex = 1;
                    break;
                default:
                    if (event.keyCode >= 48 
                        && event.keyCode <= 57 && 
                        colourValueInputElement.value.length >= 3) {
                        nextIndex = (parseInt(colourValueTextBoxIndex) + 1 == 4) ? 3 : parseInt(colourValueTextBoxIndex) + 1;
                    }
                    break;
            }


            document.getElementById(nextIndex.toString()).focus();
            this.updateColourPreview(
                Number((<HTMLInputElement>document.getElementById("1")).value).valueOf(),
                Number((<HTMLInputElement>document.getElementById("2")).value).valueOf(),
                Number((<HTMLInputElement>document.getElementById("3")).value).valueOf(),
            );
        }

        updateColourPreview(r: number, g: number, b: number) {
            let colourPreviewer = <HTMLDivElement>document.getElementById("colour-preview");
            let controlBar = <HTMLDivElement>document.getElementById("control-bar");
            let rgb = new RGB(r, g, b).toString();

            colourPreviewer.style.background = rgb;
            controlBar.style.background = rgb;
        }
    }

    class Button {
        private canvas: HTMLCanvasElement;
        private context: CanvasRenderingContext2D;

        private x: number;
        private y: number;
        private w: number;
        private h: number;

        constructor(x: number, y: number, w: number, h: number) {
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;

            this.canvas = <HTMLCanvasElement>document.getElementById('canvas');
            this.context = this.canvas.getContext("2d");

            console.log("new Button");
        }

        getX() {
            return this.x;
        }

        getY() {
            return this.y;
        }

        getWidth() {
            return this.w;
        }

        getHeight() {
            return this.h;
        }

        draw() {
            const path = new Path2D()
            path.rect(this.x, this.y, this.w, this.h);
            path.closePath();

            this.context.fillStyle = "#FFFFFF";
            this.context.fillStyle = "rgba(225,225,225,0.5)";
            this.context.fill(path);
            this.context.lineWidth = 2;
            this.context.strokeStyle = "#000000";
            this.context.stroke(path);

        }
    }
}