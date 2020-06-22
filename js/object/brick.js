import {dangerColor, gameBackgroundColor, lightColor} from "../utility/colors.js";
import randomInteger from "../utility/random.js";

const brokenMultiplier = 5;

export default class Brick {

    constructor(canvasContext, position, health) {
        this.canvasContext = canvasContext;

        this.maximumHealth = health;
        this.currentHealth = health;
        this.width = 80;
        this.height = 20;

        this.position = position;
    }

    update() {
        this.draw();
    }

    draw() {
        this.canvasContext.beginPath();

        this.canvasContext.fillStyle = lightColor;
        this.canvasContext.rect(this.position.x, this.position.y, this.width, this.height);
        this.canvasContext.fill();

        this.canvasContext.beginPath();
        this.canvasContext.lineWidth = '3';
        this.canvasContext.strokeStyle = gameBackgroundColor;

        const brokenHealth = (this.maximumHealth - this.currentHealth);

        if (brokenHealth > 0) {
            for (let i = 0; i <= brokenHealth * brokenMultiplier ; i++) {
                const x = randomInteger(this.position.x, this.position.x + this.width);
                const y = randomInteger(this.position.y, this.position.y + this.height);

                this.canvasContext.lineTo(x, y);
            }

            this.canvasContext.stroke();
        }
    }

    decreaseHealth() {
        this.currentHealth--;
    }

    changeColor() {
        this.canvasContext.fillStyle = dangerColor;
        this.canvasContext.rect(this.position.x, this.position.y, this.width, this.height);
        this.canvasContext.fill();
    }

}