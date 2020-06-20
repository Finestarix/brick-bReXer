import {lightColor} from "../utility/colors.js";

const gapBottomPaddle = 10;

export default class Paddle {

    constructor(canvasContext, screenWidth, screenHeight) {
        this.canvasContext = canvasContext;

        this.width = 150;
        this.height = 20;

        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;

        this.currentSpeed = 0;
        this.speed = 15;

        this.position = {
            x: (this.screenWidth / 2) - (this.width / 2),
            y: this.screenHeight - this.height - gapBottomPaddle
        }
    }

    update() {
        this.position.x += this.currentSpeed;

        if (this.position.x < 0)
            this.position.x = 0;
        else if (this.position.x + this.width > this.screenWidth)
            this.position.x = this.screenWidth - this.width;

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


}