module com.rgbguess.game.ui {

    export class Modal {

        private modalContext: HTMLDivElement = <HTMLDivElement>document.getElementById("modal");;
        private modal: HTMLDivElement = document.createElement("div");
        private closeButton: HTMLSpanElement = document.createElement("span");
        private isConstructed: boolean;

        private header = document.createElement("header");
        private heading =  document.createElement("h1");
        private subtitle = document.createElement("h2");
        private content = document.createElement("div");
        private footer = this.footer = document.createElement("footer");

        constructor() {
            this.modal.className = "modal-content";
            this.modalContext.appendChild(this.modal);
            this.closeButton.className = "close";
            this.closeButton.innerHTML = "&times;";
            this.modal.appendChild(this.closeButton);

            //this.modalContext.style.display = "none";

            this.closeButton.addEventListener("click", function (e) {
                (<HTMLDivElement>document.getElementById("modal")).style.display = "none";
            })
        }

        show(): void {
            this.modal.style.display = "block";
        }

        close(): void {
            this.modalContext.style.display = "none";
            console.log("closing");
        }

        setHeading(heading: string): void {
           this.heading.append(heading);
        }

        setSubtitle(subtitle: string): void {
            this.subtitle.append(subtitle);
        }

        setContent(content: HTMLElement): void {
            this.content.append(content);
        }

        setFooter(footer: HTMLElement): void {
            this.footer.append(footer);
        }

        isShowing(): boolean {
            return false;
        }

        construct() {
            this.header.appendChild(this.heading);
            this.header.appendChild(this.subtitle);
            this.modal.appendChild(this.header);
            this.modal.appendChild(this.content);
            this.modal.appendChild(this.footer);
            this.modalContext.appendChild(this.modal);
        }

        destroy() {
            this.close();
            this.modalContext.removeChild(this.modal);
        }
    }
}