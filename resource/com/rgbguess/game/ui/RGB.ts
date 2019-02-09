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

        getR(): number {
            return this.r;
        }

        getG(): number {
            return this.g;
        }


        getB(): number {
            return this.b;
        }


        toString() {
            let stringVal = `rgb(${this.r},${this.g},${this.b})`;
            return stringVal;
        }
    }
}