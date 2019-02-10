///<reference path='rgbevent.ts'/>

module com.rgbguess.events {

    export const START_EVENT: string = "start";

    export class StartEvent extends RGBEvent {

        constructor() {
            super("");
        }

        dispatch() {
            let event = new CustomEvent(START_EVENT,
                {
                    detail: {
                        startTime: ""
                    }
                }
            );

            this.eventBus.dispatchEvent(event);
        }

    }
}