///<reference path='../../constants/constants.ts'/>

module com.rgbguess.game.ui {

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
            let buttonX = new Number(this.canvas.width/2 - buttonWidth.valueOf()/2);
            let buttonY = new Number(this.canvas.height/2 - buttonHeight.valueOf())

            let button = new Button(buttonX.valueOf(), buttonY.valueOf(), buttonWidth.valueOf(), buttonHeight.valueOf());
            button.draw();
        }

        clearStartButton() {

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