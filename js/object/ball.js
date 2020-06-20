import {lightColor} from "../utility/colors.js";

import randomInteger from "../utility/random.js";

export default class Ball {

    constructor(canvasContext, x, y, screenWidth, screenHeight, isRandomDirection) {
        this.canvasContext = canvasContext;

        this.radius = 10;

        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;

        this.speed = {x: 4, y: -2};
        if (isRandomDirection)
            this.getRandomSpeed()

        this.position = {
            x: x,
            y: y
        }
    }

    update() {
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;

        if (this.position.x + this.radius > this.screenWidth || this.position.x < this.radius)
            this.speed.x = -this.speed.x;
        else if (this.position.y < this.radius)
            this.speed.y = -this.speed.y;

        this.draw();
    }

    draw() {
        this.canvasContext.beginPath();
        this.canvasContext.fillStyle = lightColor;
        this.canvasContext.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, true);
        this.canvasContext.fill();
    }

    getRandomSpeed() {
        const randomSpeedX = randomInteger(0, 1);
        const randomSpeedY = randomInteger(0, 1);

        console.log(randomSpeedX);
        console.log(randomSpeedY);

        if (randomSpeedX === 1)
            this.speed.x = -this.speed.x;
        if (randomSpeedY === 1)
            this.speed.y = -this.speed.y;
    }

}