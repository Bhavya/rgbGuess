module com.rgbguess.game.ui {

    export class Overlay {

        private overlayContext: HTMLDivElement = <HTMLDivElement>document.getElementById("overlay");
        private overlay: HTMLDivElement;
        private message: string = ""

        constructor() {
            this.overlayContext.style.display = "none";
        }

        setMessage(message: string) {
            this.overlay = document.createElement("div");
            this.overlay.id = "overlay-content";
            this.overlay.className = "overlay-content";
            this.message = message;
            this.overlay.innerHTML = this.message;
        }

        blast() {
            this.overlayContext.style.display = "block";
            this.overlayContext.appendChild(this.overlay);
            this.overlay.addEventListener("animationend", function () {
                if ((<HTMLDivElement>document.getElementById("overlay-content")) != null) {
                    (<HTMLDivElement>document.getElementById("overlay-content")).removeEventListener("animationend", function () { });
                    (<HTMLDivElement>document.getElementById("overlay")).removeChild((<HTMLDivElement>document.getElementById("overlay-content")));
                }
                (<HTMLDivElement>document.getElementById("overlay")).style.display = "none";
            })
        }
    }
}