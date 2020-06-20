import {normalFont} from "../utility/font.js";
import {lightColor} from "../utility/colors.js";

export default class Score {

    constructor(canvasContext, x, y, text) {
        this.canvasContext = canvasContext;

        this.x = x;
        this.y = y;

        this.text = text;
    }

    update() {
        this.draw();
    }

    draw() {
        this.canvasContext.font = normalFont;
        this.canvasContext.fillStyle = lightColor;

        this.canvasContext.fillText('Score: ' + this.text, this.x, this.y);
    }

    changeScore() {

    }

}