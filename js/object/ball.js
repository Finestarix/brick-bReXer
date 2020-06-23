import {lightColor} from "../utility/colors.js";

import randomInteger from "../utility/random.js";

import MusicHandler from "./music.js";

const startAngle = 0;
const endAngle = Math.PI * 2;
const antiClockwise = false;

export default class Ball {

    constructor(canvasContext, x, y, screenWidth, screenHeight, screenMargin) {
        this.canvasContext = canvasContext;
        this.screenMargin = screenMargin;

        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;

        this.radius = 8;

        this.comboBrick = 1;

        this.speed = {x: this.getRandomSpeedX(), y: this.getRandomSpeedY()};
        this.position = {x: x, y: y};

        this.music = new MusicHandler();
    }

    update() {
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;

        if (this.position.x + this.radius > this.screenWidth - this.screenMargin ||
            this.position.x - this.screenMargin < this.radius) {
            this.speed.x = -this.speed.x;
            this.music.playCollisionWallSound();
        } else if (this.position.y - this.screenMargin - 30 < this.radius) {
            this.speed.y = -this.speed.y;
            this.music.playCollisionWallSound();
        }

        this.draw();
    }

    draw() {
        this.canvasContext.beginPath();
        this.canvasContext.fillStyle = lightColor;
        this.canvasContext.arc(this.position.x, this.position.y, this.radius, startAngle, endAngle, antiClockwise);
        this.canvasContext.fill();
    }

    getRandomSpeedX() {
        let randomSpeedX = 0;
        while (randomSpeedX <= 4 && randomSpeedX >= -4)
            randomSpeedX = randomInteger(-6, 6);
        return randomSpeedX;
    }

    getRandomSpeedY() {
        let randomSpeedY = 0;
        while (randomSpeedY <= 1 && randomSpeedY >= -1)
            randomSpeedY = randomInteger(-3, 3);
        return randomSpeedY;
    }

    increaseComboBrick() {
        this.comboBrick++;
    }

    resetComboBrick() {
        this.comboBrick = 1;
    }

    isBallOutsideScreen() {
        return this.position.y >= this.screenHeight;
    }

    increaseBallSpeed() {
        this.speed.x += 1;
        this.speed.y += 1;
    }

    decreaseBallSpeed() {
        this.speed.x -= 1;
        this.speed.y -= 1;
    }

}