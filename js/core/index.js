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
    const y = screenHeight / 2 - 80;
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

    const x = (screenWidth / 2) - (width / 2);
    const y = [(screenHeight / 2) - (height * 2) + 70, (screenHeight / 2) + 70]

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

    canvasContext.fillStyle = backgroundColor;
    canvasContext.fillRect(0, 0, screenWidth, screenHeight);

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
