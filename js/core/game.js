import Game from "../object/game.js";

import {canvasHeight, canvasID, canvasWidth} from "../utility/string.js";

let intervalID = null;

function initializeCanvas() {
    const canvasObject = document.getElementById(canvasID);
    canvasObject.style.cursor = 'none';
    canvasObject.width = canvasWidth;
    canvasObject.height = canvasHeight;

    return canvasObject;
}

function update() {
    requestAnimationFrame(update);

    if (game.checkAnimationCondition())
        clearInterval(intervalID);

    game.update();
}

function generateBrick() {
    game.increaseBallY();
    game.generateBrick();
}

const canvasObject = initializeCanvas();
const canvasContext = canvasObject.getContext('2d');

const game = new Game(canvasContext, canvasWidth, canvasHeight);
update();

intervalID = setInterval(generateBrick, game.brickSpeedGenerate);