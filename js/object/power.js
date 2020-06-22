import randomInteger from "../utility/random.js";

import {gameBackgroundColor, lightColor} from "../utility/colors.js";
import {smallFont} from "../utility/font.js";

export const powerType = [
    'Increase Width Paddle',
    'Decrease Width Paddle',
    'Increase Life',
    'Mutate Ball',
    'Increase Ball Speed',
    'Decrease Ball Speed',
    'Score Multiplier'
]
export const totalPowerType = powerType.length;

const startAngle = 0;
const endAngle = Math.PI * 2;
const antiClockwise = false;

const strokeWidth = 3;

export default class Power {

    constructor(canvasContext, position) {
        this.canvasContext = canvasContext;

        this.powerType = this.getPowerType();

        this.radius = 20;
        this.speed = 2;
        this.position = position;
    }

    update() {
        this.position.y += this.speed;

        this.draw();
    }

    draw() {
        this.canvasContext.beginPath();

        this.canvasContext.fillStyle = lightColor;
        this.canvasContext.arc(this.position.x, this.position.y, this.radius, startAngle, endAngle, antiClockwise);
        this.canvasContext.fill();

        this.canvasContext.lineWidth = strokeWidth;
        this.canvasContext.strokeStyle = gameBackgroundColor;

        for (let i = 0; i < totalPowerType; i++)
            if (this.powerType === powerType[i])
                switch (i) {
                    case 0:
                        this.drawIncreaseWidthPaddle();
                        break;
                    case 1:
                        this.drawDecreaseWidthPaddle();
                        break;
                    case 2:
                        this.drawIncreaseLife();
                        break;
                    case 3:
                        this.drawMutateBall();
                        break;
                    case 4:
                        this.drawIncreaseBallSpeed();
                        break;
                    case 5:
                        this.drawDecreaseBallSpeed();
                        break;
                    case 6:
                        this.drawScoreMultiplier();
                        break;
                }
    }

    drawIncreaseWidthPaddle() {
        this.canvasContext.beginPath();
        this.canvasContext.moveTo(this.position.x + (this.radius / 2) - 5, this.position.y - this.radius + 10);
        this.canvasContext.lineTo(this.position.x - this.radius + 15, this.position.y);
        this.canvasContext.lineTo(this.position.x + (this.radius / 2) - 5, this.position.y + this.radius - 10);
        this.canvasContext.stroke();
    }

    drawDecreaseWidthPaddle() {
        this.canvasContext.beginPath();
        this.canvasContext.moveTo(this.position.x - (this.radius / 2) + 5, this.position.y - this.radius + 10);
        this.canvasContext.lineTo(this.position.x + this.radius - 15, this.position.y);
        this.canvasContext.lineTo(this.position.x - (this.radius / 2) + 5, this.position.y + this.radius - 10);
        this.canvasContext.stroke();
    }

    drawIncreaseLife() {
        this.position.x -= this.radius / 2;
        this.position.y -= this.radius / 2;

        this.canvasContext.beginPath();
        this.canvasContext.moveTo(this.position.x, this.position.y + this.radius / 4);
        this.canvasContext.quadraticCurveTo(this.position.x, this.position.y, this.position.x + this.radius / 4, this.position.y);
        this.canvasContext.quadraticCurveTo(this.position.x + this.radius / 2, this.position.y, this.position.x + this.radius / 2, this.position.y + this.radius / 4);
        this.canvasContext.quadraticCurveTo(this.position.x + this.radius / 2, this.position.y, this.position.x + this.radius * 3 / 4, this.position.y);
        this.canvasContext.quadraticCurveTo(this.position.x + this.radius, this.position.y, this.position.x + this.radius, this.position.y + this.radius / 4);
        this.canvasContext.quadraticCurveTo(this.position.x + this.radius, this.position.y + this.radius / 2, this.position.x + this.radius * 3 / 4, this.position.y + this.radius * 3 / 4);
        this.canvasContext.lineTo(this.position.x + this.radius / 2, this.position.y + this.radius);
        this.canvasContext.lineTo(this.position.x + this.radius / 4, this.position.y + this.radius * 3 / 4);
        this.canvasContext.quadraticCurveTo(this.position.x, this.position.y + this.radius / 2, this.position.x, this.position.y + this.radius / 4);
        this.canvasContext.stroke();

        this.position.x += this.radius / 2;
        this.position.y += this.radius / 2;
    }

    drawMutateBall() {
        const smallRadius = 5;

        this.canvasContext.beginPath();
        this.canvasContext.arc(this.position.x, this.position.y - 7, smallRadius,
            startAngle, endAngle, antiClockwise);
        this.canvasContext.stroke();

        this.canvasContext.beginPath();
        this.canvasContext.arc(this.position.x - 7, this.position.y + 7, smallRadius,
            startAngle, endAngle, antiClockwise);
        this.canvasContext.stroke();

        this.canvasContext.beginPath();
        this.canvasContext.arc(this.position.x + 7, this.position.y + 7, smallRadius,
            startAngle, endAngle, antiClockwise);
        this.canvasContext.stroke();
    }

    drawIncreaseBallSpeed() {
        const smallRadius = 7;

        this.canvasContext.beginPath();
        this.canvasContext.moveTo(this.position.x + (this.radius / 2) - 13, this.position.y - this.radius + 10);
        this.canvasContext.lineTo(this.position.x - this.radius + 8, this.position.y);
        this.canvasContext.lineTo(this.position.x + (this.radius / 2) - 13, this.position.y + this.radius - 10);
        this.canvasContext.stroke();

        this.canvasContext.beginPath();
        this.canvasContext.arc(this.position.x + 8, this.position.y, smallRadius,
            startAngle, endAngle, antiClockwise);
        this.canvasContext.stroke();
    }

    drawDecreaseBallSpeed() {
        const smallRadius = 7;

        this.canvasContext.beginPath();
        this.canvasContext.moveTo(this.position.x - (this.radius / 2) + 13, this.position.y - this.radius + 10);
        this.canvasContext.lineTo(this.position.x + this.radius - 8, this.position.y);
        this.canvasContext.lineTo(this.position.x - (this.radius / 2) + 13, this.position.y + this.radius - 10);
        this.canvasContext.stroke();

        this.canvasContext.beginPath();
        this.canvasContext.arc(this.position.x - 8, this.position.y, smallRadius,
            startAngle, endAngle, antiClockwise);
        this.canvasContext.stroke();
    }

    drawScoreMultiplier() {
        this.canvasContext.font = smallFont;
        this.canvasContext.fillStyle = gameBackgroundColor;

        this.canvasContext.fillText('S+', this.position.x - (this.radius / 2) - 2,
            this.position.y + (this.radius / 2) - 3);
    }

    getPowerType(difficulty) {
        const randomPower = randomInteger(0, totalPowerType - 1);
        return powerType[randomPower];
    }

}