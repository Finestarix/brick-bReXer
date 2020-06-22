import {lightColor} from "../utility/colors.js";

const paddleIncreaseDecreaseValue = 20;

export default class Paddle {

    constructor(canvasContext, screenWidth, screenHeight, screenMargin) {
        this.canvasContext = canvasContext;
        this.screenMargin = screenMargin;

        this.width = 150;
        this.height = 20;

        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;

        this.currentSpeed = 0;
        this.speed = 15;

        this.position = {
            x: (this.screenWidth / 2) - (this.width / 2),
            y: this.screenHeight - this.height - this.screenMargin
        }
    }

    update() {
        this.position.x += this.currentSpeed;

        if (this.position.x < this.screenMargin)
            this.position.x = this.screenMargin;
        else if (this.position.x + this.width > this.screenWidth - this.screenMargin)
            this.position.x = this.screenWidth - this.width - this.screenMargin;

        this.draw();
    }

    draw() {
        this.canvasContext.fillStyle = lightColor;
        this.canvasContext.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    moveLeft() {
        this.currentSpeed = -this.speed;
    }

    moveRight() {
        this.currentSpeed = this.speed;
    }

    stop() {
        this.currentSpeed = 0;
    }

    increasePaddleWidth() {
        this.width += paddleIncreaseDecreaseValue;
    }

    decreasePaddleWidth() {
        this.width -= paddleIncreaseDecreaseValue;
    }

}