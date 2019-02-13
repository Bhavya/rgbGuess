///<reference path='Modal.ts'/>
///<reference path='../../constants/constants.ts'/>
///<reference path='../../events/StartEvent.ts'/>

module com.rgbguess.game.ui {

    import Constants = com.rgbguess.constants;
    import StartEvent = com.rgbguess.events.StartEvent;
    import ModalType = com.rgbguess.events.ModalType;

    export class StartingModal extends Modal {

        constructor() {
            super();

            this.setType(ModalType.STARTING_MODAL);

            let buttonTut = document.createElement("input");
            buttonTut.type = "button";
            buttonTut.className = "primary"
            buttonTut.value = "Play Tutorial";

            let buttonPlay = document.createElement("input");
            buttonPlay.type = "button";
            buttonPlay.className = "special"
            buttonPlay.value = "START";

            let footer = document.createElement("div");
            footer.appendChild(buttonTut);
            footer.appendChild(buttonPlay);

            let rules = document.createElement("p");
            rules.innerHTML = Constants.RULES;
            let scoring = document.createElement("p");
            scoring.innerHTML = Constants.SCORING;

            this.setHeading("rgb(G,u,ess)");
            this.setSubtitle("A guessing game for people who think they're realllly good at colour matching");
            this.setContent(rules);
            this.setContent(scoring);
            this.setFooter(footer);

            this.setCancelCallback(function (e) {


            });

            buttonPlay.addEventListener("click", function (e) {
                console.log("Starting Game");
                new StartEvent().dispatch()
                buttonPlay.removeEventListener("click", function () { });
            });
        }
    }
}