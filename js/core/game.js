import Game from "../object/game.js";

import {canvasID, canvasWidth, canvasHeight} from "../utility/string.js";
import {gameBackgroundColor} from "../utility/colors.js";

function initializeCanvas() {
    const canvasObject = document.getElementById(canvasID);
    canvasObject.style.cursor = 'none';
    canvasObject.width = canvasWidth;
    canvasObject.height = canvasHeight;

    return canvasObject;
}

function animate() {
    requestAnimationFrame(animate);

    canvasContext.fillStyle = gameBackgroundColor;
    canvasContext.fillRect(0, 0, canvasWidth, canvasHeight);

    game.update();
}

const canvasObject = initializeCanvas();
const canvasContext = canvasObject.getContext('2d');

const game = new Game(canvasContext, canvasWidth, canvasHeight);
animate();

setInterval(test, game.brickAttribute.speed)
function test() {
    // game.mutateBall();
    game.increaseBallY();
    game.generateBrick();
}

/*
Power Up:
1. Increase Width Paddle
2. Decrease Width Paddle
3. Increase Life
4. Mutate Ball
5. Increase Ball Speed
6. Decrease Ball Speed
7. Score Multiplier
 */
