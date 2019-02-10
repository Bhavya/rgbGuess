module com.rgbguess.constants {

    export var CANVAS_WIDTH = new Number(1000);
    export var CANVAS_HEIGHT = new Number(500);

    export var RULES = `How to play:
                        <ul>
                            <li>A marker will indicate the colour of a random pixel on the screen. Don't worry; the pixel will
                                be magnified.</li>
                            <li>You will guess the RGB value of this pixel and type it in as quickly as possible. Once you
                                submit your guess, the image will change.</li>
                            <li>You will have 2 minutes to make as many close guesses as possible.</li>
                        </ul>`;
     export var SCORING = `Scoring:
                            <ul>
                                <li>Your score is determined by the speed of your guess, the accuracy of your guess, and how many
                                    images
                                    you are able to get through within the two minute window.
                                </li>
                            </ul>`;
}