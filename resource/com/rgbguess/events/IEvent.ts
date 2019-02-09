
module com.rgbguess.events {

    export interface IEvent {
        eventBus: Window;
        dispatch(): void;
    }
}