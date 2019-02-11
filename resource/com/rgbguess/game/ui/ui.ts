///<reference path='../../constants/constants.ts'/>
///<reference path='../../events/submissionevent.ts'/>

module com.rgbguess.game.ui {

    export class UIControls {
        private canvas: HTMLCanvasElement;
        private context: CanvasRenderingContext2D;
        private rgbResult: RGB;

        constructor() {
            this.canvas = <HTMLCanvasElement>document.getElementById('canvas');
            this.context = this.canvas.getContext("2d");

            this.canvas.width = com.rgbguess.constants.CANVAS_WIDTH.valueOf();//horizontal resolution (?) - increase for better looking text
            this.canvas.height = com.rgbguess.constants.CANVAS_HEIGHT.valueOf();;//vertical resolution (?) - increase for better looking text
        }

        initUI() {

        }

        validatePassKey(colourValueInputElement: HTMLInputElement, event: KeyboardEvent) {
            let colourValueTextBoxIndex = colourValueInputElement.id;
            let nextIndex: number = parseInt(colourValueTextBoxIndex);

            this.stripNonNumericInTextBox(colourValueInputElement);

            let inputValue = colourValueInputElement.value;

            let textBoxValue = Number(inputValue);
            if (isNaN(textBoxValue) || textBoxValue > 255) {
                colourValueInputElement.value = Number(255).toString();
            }

            let currentValue = 0;
            console.log(event.keyCode);

            switch (event.keyCode.valueOf()) {
                case 32: // space bar d -> go forward and wrap around
                    if (colourValueInputElement.value.length >= 3) {
                        nextIndex = (parseInt(colourValueTextBoxIndex) + 1 == 4) ? 1 : parseInt(colourValueTextBoxIndex) + 1;
                    }
                    break;
                case 68: // d -> go forward and wrap around
                    nextIndex = (parseInt(colourValueTextBoxIndex) + 1 == 4) ? 1 : parseInt(colourValueTextBoxIndex) + 1;
                    break;
                case 65: // a -> go back and wrap around
                    nextIndex = (parseInt(colourValueTextBoxIndex) - 1 == 0) ? 3 : parseInt(colourValueTextBoxIndex) - 1;
                    break;
                case 87: // w -> increment value
                    currentValue = parseInt(colourValueInputElement.value) + 5;
                    currentValue = currentValue > 255 ? 255 : currentValue;
                    colourValueInputElement.value = new String(currentValue).toString();
                    this.updateColourPreview(
                        Number((<HTMLInputElement>document.getElementById("1")).value).valueOf(),
                        Number((<HTMLInputElement>document.getElementById("2")).value).valueOf(),
                        Number((<HTMLInputElement>document.getElementById("3")).value).valueOf(),
                    );
                    break;
                case 83: // s -> decrement value
                    currentValue = parseInt(colourValueInputElement.value) - 5;
                    currentValue = currentValue < 0 ? 0 : currentValue;
                    colourValueInputElement.value = new String(currentValue).toString();
                    this.updateColourPreview(
                        Number((<HTMLInputElement>document.getElementById("1")).value).valueOf(),
                        Number((<HTMLInputElement>document.getElementById("2")).value).valueOf(),
                        Number((<HTMLInputElement>document.getElementById("3")).value).valueOf(),
                    );
                    break;
                case 8: // backspace -> go back and stop at 1
                    if (colourValueInputElement.value.length == 0) {
                        nextIndex = (parseInt(colourValueTextBoxIndex) - 1 == 0) ? 1 : parseInt(colourValueTextBoxIndex) - 1;
                    }
                    break;
                case 67: // c -> clear box
                    colourValueInputElement.value = "";
                    break;
                case 90: // z -> clear all
                    (<HTMLInputElement>document.getElementById("1")).value = "000",
                        (<HTMLInputElement>document.getElementById("2")).value = "000",
                        (<HTMLInputElement>document.getElementById("3")).value = "000";
                    nextIndex = 1;
                    break;
                case 13: // enter -> submit
                    this.submit();
                    (<HTMLInputElement>document.getElementById("1")).value = "000",
                        (<HTMLInputElement>document.getElementById("2")).value = "000",
                        (<HTMLInputElement>document.getElementById("3")).value = "000";
                    nextIndex = 1;
                    break;
                default: // if you have typed 3 digits go to the next box
                    if (event.keyCode >= 48
                        && event.keyCode <= 57 &&
                        colourValueInputElement.value.length >= 3) {
                        nextIndex = (parseInt(colourValueTextBoxIndex) + 1 == 4) ? 3 : parseInt(colourValueTextBoxIndex) + 1;
                    }
                    break;
            }

            document.getElementById(nextIndex.toString()).focus();
            this.stripNonNumericInTextBox(<HTMLInputElement>document.getElementById(nextIndex.toString()));
            this.updateColourPreview(
                Number((<HTMLInputElement>document.getElementById("1")).value).valueOf(),
                Number((<HTMLInputElement>document.getElementById("2")).value).valueOf(),
                Number((<HTMLInputElement>document.getElementById("3")).value).valueOf(),
            );
        }

        stripNonNumericInTextBox(colourValueInputElement: HTMLInputElement) {
            let value: string = colourValueInputElement.value;
            value = value.replace(/[^0-9]/g, '');
            colourValueInputElement.value = value;
        }

        stripNonNumeric(value: string): string {
            return value.replace(/[^0-9]/g, '');
        }   

        updateColourPreview(r: number, g: number, b: number) {
            let colourPreviewer = <HTMLDivElement>document.getElementById("colour-preview");
            let controlBar = <HTMLDivElement>document.getElementById("control-bar");

            this.rgbResult = new RGB(r, g, b);
            let rgb = this.rgbResult.toString();

            colourPreviewer.style.background = rgb;
            controlBar.style.background = rgb;
        }

        submit() {
            let submissionEvent = new com.rgbguess.events.SubmissionEvent(this.rgbResult).dispatch();
        }
    }
}