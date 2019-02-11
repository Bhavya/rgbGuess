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
            let formattedScore = User.score.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
            score.innerHTML = `<center><h1>SCORE: ${formattedScore}</h1></center><br/><br/>`;

            let credits = document.createElement("p");
            credits.innerHTML = Constants.CREDITS;

            this.setHeading("rgb(G,u,ess)");
            this.setSubtitle("A guessing game for people who think they're realllly good at colour matching");
            this.setContent(endingMessage);
            this.setContent(score);
            this.setContent(credits);
            this.setFooter(footer);

            this.setCancelCallback(function (e) {
                console.log("Ending Game");
            });
        }
    }
}