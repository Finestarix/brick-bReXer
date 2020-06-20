import {lightColor} from "../utility/colors.js";
import {titleFont} from "../utility/font.js";

export default class Title {

    constructor(canvasContext, x, y, text) {
        this.canvasContext = canvasContext;

        this.font = titleFont;
        this.text = text;

        this.position = this.getPosition(x, y);

        this.color = lightColor;
    }

    getPosition(x, y) {
        this.canvasContext.font = this.font;
        const measureText = this.canvasContext.measureText(this.text);

        return {x: x - measureText.width / 2, y: y}
    }

    update() {
        this.draw();
    }

    draw() {
        this.canvasContext.font = this.font;
        this.canvasContext.fillStyle = this.color;

        this.canvasContext.fillText(this.text, this.position.x, this.position.y);
    }
}
