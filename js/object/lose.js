import {lightColor} from "../utility/colors.js";
import {titleFont} from "../utility/font.js";

export default class Lose {

    constructor(canvasContext, screenWidth, screenHeight, text, score) {
        this.canvasContext = canvasContext;

        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;

        this.text = text;
        this.score = score;
    }

    update() {
        this.draw();
    }

    draw() {
        const measureText1 = this.canvasContext.measureText(this.text);
        const measureText2 = this.canvasContext.measureText('Score: ' + this.score);

        this.canvasContext.font = titleFont;
        this.canvasContext.fillStyle = lightColor;

        const position1 = {
            x: (this.screenWidth / 2) - (measureText1.width / 2),
            y: (this.screenHeight / 2) - 40
        }

        const position2 = {
            x: (this.screenWidth / 2) - (measureText2.width / 2),
            y: (this.screenHeight / 2) + 40
        }

        this.canvasContext.fillText(this.text, position1.x, position1.y);
        this.canvasContext.fillText('Score: ' + this.score, position2.x, position2.y);
    }

}