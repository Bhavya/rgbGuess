module com.rgbguess.constants {

    export var CANVAS_WIDTH = new Number(1000);
    export var CANVAS_HEIGHT = new Number(500);

    export var RULES = `How to play:
                        <ul>
                            <li>You will guess the RGB value of the background, and type your guess in as quickly as possible. Once you
                                submit your guess, the colour will change.</li>
                            <li>You will have 2 minutes to make as many close guesses as possible.</li>
                        </ul>`;
    export var SCORING = `Contols:
                            <ul>
                                <li>W: increment value in input field.
                                </li>
                                <li>S: decrement value in input field.
                                </li>
                                <li>A: move left.
                                </li>
                                <li>D: move right
                                </li>
                                <li>C: clear input field.
                                </li>
                                <li>Z: Clear all input fields.
                                </li>
                                <li>Enter: submit (must be on G input)
                                </li>
                            </ul>`;

    export var END_MESSAGE = `<center><h1>GAME OVER<h1></center>`;

    export var CREDITS = `<center>rgb(G,u,ess) and game audio © Bhavya Kashyap 2019</center><br/>`;
}