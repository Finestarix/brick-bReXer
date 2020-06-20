import {gameBackgroundColor, lightColor} from "../utility/colors.js";

export default class Brick {

    constructor(canvasContext, position, health) {
        this.canvasContext = canvasContext;

        this.health = health;
        this.width = 105;
        this.height = 35;

        this.position = position;
    }

    update() {
        this.draw();
    }

    draw() {
        this.canvasContext.beginPath();

        this.canvasContext.strokeStyle = gameBackgroundColor;
        this.canvasContext.lineWidth = '5';
        this.canvasContext.fillStyle = lightColor;
        this.canvasContext.rect(this.position.x, this.position.y, this.width, this.height);

        this.canvasContext.stroke();
        this.canvasContext.fill();
    }

}