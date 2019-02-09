///<reference path='../game/ui/ui.ts'/>
///<reference path='IEvent.ts'/>
module com.rgbguess.events {

    import RGB = com.rgbguess.game.ui.RGB;

    export class RGBEvent implements IEvent {
        eventBus: Window = window;

        constructor(parameters: Object) {
        }

        dispatch() {
        }

    }
}