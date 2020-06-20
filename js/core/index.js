import Title from '../object/title.js';
import MotionCircle from "../object/motionCircle.js";
import Button from "../object/button.js";

import MoveListener from "../listener/moveListener.js";
import ClickListener from "../listener/clickListener.js";

import {menuBackgroundColor} from '../utility/colors.js';
import {canvasHeight, canvasID, canvasTitle, canvasWidth} from "../utility/string.js";

const totalButton = 2;
const totalMotionCircle = 30;

let mousePosition = {
    x: canvasWidth / 2,
    y: canvasHeight / 2
}

function initializeCanvas() {
    const canvasObject = document.getElementById(canvasID);
    canvasObject.style.cursor = 'none';
    canvasObject.width = canvasWidth;
    canvasObject.height = canvasHeight;

    return canvasObject;
}

function initializeTitle(canvasContext) {
    const x = canvasWidth / 2;
    const y = canvasHeight / 2 - 80;
    return new Title(canvasContext, x, y, canvasTitle);
}

function closeWindow() {
    window.close();
}

function redirectToDifficulty() {
    const currentPath = window.location.pathname;
    const currentDirectory = currentPath.substring(0, currentPath.lastIndexOf('/'));
    window.location.replace(currentDirectory + "/difficulty.html");
}

function initializeButton(canvasContext) {
    const buttons = [];

    const width = 400;
    const height = 50;

    const x = (canvasWidth / 2) - (width / 2);
    const y = [
        (canvasHeight / 2) - (height * 2) + 70,
        (canvasHeight / 2) + 70
    ]

    const text = ['Play', 'Exit']
    const isDanger = [false, true]

    for (let i = 0; i < totalButton; i++) {
        const callback = (i === 1) ? closeWindow : redirectToDifficulty;
        buttons.push(new Button(canvasContext, x, y[i], width, height, text[i], isDanger[i], callback))
    }

    return buttons;
}

function initializeMotionCircles(canvasObject, canvasContext) {
    const motionCircles = [];

    for (let i = 0; i < totalMotionCircle; i++)
        motionCircles.push(new MotionCircle(canvasObject, canvasContext));

    return motionCircles;
}

function animate() {
    requestAnimationFrame(animate);

    canvasContext.fillStyle = menuBackgroundColor;
    canvasContext.fillRect(0, 0, canvasWidth, canvasHeight);

    title.update();
    buttons.forEach(button => button.update());
    motionCircles.forEach(motionCircle => motionCircle.update(mousePosition));
}

const canvasObject = initializeCanvas();
const canvasContext = canvasObject.getContext('2d');

const title = initializeTitle(canvasContext);
const motionCircles = initializeMotionCircles(canvasObject, canvasContext);
const buttons = initializeButton(canvasContext);

new MoveListener(mousePosition, buttons);
new ClickListener(buttons);

animate();
