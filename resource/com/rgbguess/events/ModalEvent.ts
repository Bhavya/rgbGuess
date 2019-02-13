///<reference path='rgbevent.ts'/>
///<reference path='../game/ui/Modal.ts'/>

module com.rgbguess.events {

    export const MODAL_EVENT: string = "modalReady";

    export enum ModalType {
        STARTING_MODAL,
        ENDING_MODAL,
        DEFAULT
    }

    export enum ModalState {
        SHOWING,
        HIDDEN
    }

    export class ModalEvent extends RGBEvent {
        private modalType: ModalType;
        private state: ModalState = ModalState.SHOWING;

        constructor(modalType: ModalType, state: ModalState) {
            super("");
            this.modalType = modalType;
            this.state = state;
        }

        dispatch() {
            let event = new CustomEvent(MODAL_EVENT,
                {
                    detail: {
                        type: this.modalType,
                        state: this.state
                    }
                }
            );

            this.eventBus.dispatchEvent(event);
        }

    }
}