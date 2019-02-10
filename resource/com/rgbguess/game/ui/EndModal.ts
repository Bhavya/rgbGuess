///<reference path='Modal.ts'/>
///<reference path='../../constants/constants.ts'/>
///<reference path='../../events/StartEvent.ts'/>
///<reference path='../../user/User.ts'/>

module com.rgbguess.game.ui {

    import Constants = com.rgbguess.constants;
    import User = com.rgbguess.user;

    export class EndModal extends Modal {

        constructor() {
            super();
            
            let footer = document.createElement("div");

            let endingMessage = document.createElement("p");
            endingMessage.innerHTML = Constants.END_MESSAGE;
            let score = document.createElement("p");
            score.innerHTML = `<center>SCORE: ${User.score}</center><br/><br/>`;

            this.setHeading("rgb(G,u,ess)");
            this.setSubtitle("A guessing game for people who think they're realllly good at colour matching");
            this.setContent(endingMessage);
            this.setContent(score);
            this.setFooter(footer);

            this.setCancelCallback(function (e) {
                console.log("Ending Game");
            });
        }
    }
}