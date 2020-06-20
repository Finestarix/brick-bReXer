import {dangerColor} from "../utility/colors.js";

export default class Life {

    constructor(canvasContext, position) {
        this.canvasContext = canvasContext;

        this.size = 30;
        this.position = position;
    }

    update() {
        this.draw();
    }

    draw() {
        this.canvasContext.beginPath();

        this.canvasContext.fillStyle = dangerColor;

        this.canvasContext.moveTo(this.position.x, this.position.y + this.size / 4);
        this.canvasContext.quadraticCurveTo(this.position.x, this.position.y, this.position.x + this.size / 4, this.position.y);
        this.canvasContext.quadraticCurveTo(this.position.x + this.size / 2, this.position.y, this.position.x + this.size / 2, this.position.y + this.size / 4);
        this.canvasContext.quadraticCurveTo(this.position.x + this.size / 2, this.position.y, this.position.x + this.size * 3 / 4, this.position.y);
        this.canvasContext.quadraticCurveTo(this.position.x + this.size, this.position.y, this.position.x + this.size, this.position.y + this.size / 4);
        this.canvasContext.quadraticCurveTo(this.position.x + this.size, this.position.y + this.size / 2, this.position.x + this.size * 3 / 4, this.position.y + this.size * 3 / 4);
        this.canvasContext.lineTo(this.position.x + this.size / 2, this.position.y + this.size);
        this.canvasContext.lineTo(this.position.x + this.size / 4, this.position.y + this.size * 3 / 4);
        this.canvasContext.quadraticCurveTo(this.position.x, this.position.y + this.size / 2, this.position.x, this.position.y + this.size / 4);
        this.canvasContext.fill();
    }

}


