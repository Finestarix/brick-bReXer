import Title from '../object/title.js';
import MotionCircle from "../object/motionCircle.js";
import Button from "../object/button.js";

import MoveListener from "../listener/moveListener.js";
import ClickListener from "../listener/clickListener.js";

import {backgroundColor} from '../utility/colors.js';
import {canvasID, canvasTitle} from "../utility/string.js";

const screenWidth = 1200;
const screenHeight = 600;

const totalButton = 2;
const totalMotionCircle = 30;

let mousePosition = {
    x: screenWidth / 2,
    y: screenHeight / 2
}

function initializeCanvas() {
    const canvasObject = document.getElementById(canvasID);
    canvasObject.style.cursor = 'none';
    canvasObject.width = screenWidth;
    canvasObject.height = screenHeight;

    return canvasObject;
}

function initializeTitle(canvasContext) {
    const x = screenWidth / 2;
    const y = 50;
    return new Title(canvasContext, x, y, canvasTitle);
}

function animate() {
    requestAnimationFrame(animate);

    canvasContext.fillStyle = backgroundColor;
    canvasContext.fillRect(0, 0, screenWidth, screenHeight);

    title.update();
}

const canvasObject = initializeCanvas();
const canvasContext = canvasObject.getContext('2d');

const title = initializeTitle(canvasContext);

animate();
