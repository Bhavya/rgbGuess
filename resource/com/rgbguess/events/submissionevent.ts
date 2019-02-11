///<reference path='../game/ui/RGB.ts'/>
///<reference path='rgbevent.ts'/>
module com.rgbguess.events {

    import RGB = com.rgbguess.game.ui.RGB;

    export const SUBMISSION_EVENT: string = "submission";

    export class SubmissionEvent extends RGBEvent {
        private rgb: RGB;

        constructor(rgb: RGB) {
            super(rgb);

            if(rgb == null) {
                this.rgb = new RGB(0,0,0);
            } else {
                this.rgb = rgb;
            }
        }

        dispatch() {
            let event = new CustomEvent(SUBMISSION_EVENT,
                {
                    detail: {
                        r: this.rgb.getR(),
                        g: this.rgb.getG(),
                        b: this.rgb.getB()
                    }
                }
            );

            this.eventBus.dispatchEvent(event);
        }

    }
}