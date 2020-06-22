import {lightColor} from "../utility/colors.js";

import randomInteger from "../utility/random.js";

const startAngle = 0;
const endAngle = Math.PI * 2;
const antiClockwise = false;

export default class Ball {

    constructor(canvasContext, x, y, screenWidth, screenMargin) {
        this.canvasContext = canvasContext;
        this.screenMargin = screenMargin;

        this.radius = 8;

        this.screenWidth = screenWidth;

        this.speed = {x: this.getRandomSpeedX(), y: this.getRandomSpeedY()};

        this.position = {x: x, y: y};
    }

    update() {
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;

        if (this.position.x + this.radius > this.screenWidth - this.screenMargin ||
            this.position.x - this.screenMargin < this.radius)
            this.speed.x = -this.speed.x;
        else if (this.position.y - this.screenMargin - 30 < this.radius)
            this.speed.y = -this.speed.y;

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

}