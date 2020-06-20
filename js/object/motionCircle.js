import {motionCircleColors} from '../utility/colors.js';
import {randomInteger} from '../utility/random.js';

export default class MotionCircle {

    constructor(canvasObject, canvasContext) {
        this.canvasContext = canvasContext;

        this.position = {
            x: canvasObject.width / 2,
            y: canvasObject.height / 2
        }
        this.radius = randomInteger(2, 4);
        this.velocity = 0.05;

        this.radians = Math.random() * Math.PI * 2;
        this.disctanceFromCenter = randomInteger(5, 20);

        this.color = motionCircleColors[randomInteger(0, motionCircleColors.length)];
    }

    update(mousePosition) {
        const lastPosition = {
            x: this.position.x,
            y: this.position.y
        }

        this.radians += this.velocity;
        this.position.x = mousePosition.x + Math.cos(this.radians) * this.disctanceFromCenter;
        this.position.y = mousePosition.y + Math.sin(this.radians) * this.disctanceFromCenter;

        this.draw(lastPosition)
    }

    draw(lastPosition) {
        this.canvasContext.beginPath();

        this.canvasContext.strokeStyle = this.color;
        this.canvasContext.lineWidth = this.radius;

        this.canvasContext.moveTo(lastPosition.x, lastPosition.y);
        this.canvasContext.lineTo(this.position.x, this.position.y);
        this.canvasContext.stroke();

        this.canvasContext.closePath();
    }

}