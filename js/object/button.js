import {normalFont} from "../utility/font.js";
import {dangerColor, buttonHoverColor, buttonNormalColor, darkColor, lightColor} from "../utility/colors.js";

export default class Button {

    constructor(canvasContext, x, y, width, height, text, isDanger, callback) {
        this.canvasContext = canvasContext;

        this.rect = {x: x, y: y, width: width, height: height}

        this.font = normalFont;
        this.text = this.getTextPosition(text);

        this.isDanger = isDanger;
        this.isHover = false;

        this.callback = callback;
    }

    getTextPosition(text) {
        this.canvasContext.font = this.font;
        const measureText = this.canvasContext.measureText(text)

        return {
            x: this.rect.x + (this.rect.width / 2) - (measureText.width / 2),
            y: this.rect.y + (this.rect.height / 2) + 10,
            text: text
        };
    }

    update() {
        this.draw();
    }

    draw() {
        this.canvasContext.font = this.font;

        this.canvasContext.fillStyle = (this.isHover) ?
            buttonHoverColor : (this.isDanger) ?
                dangerColor : buttonNormalColor;

        this.canvasContext.fillRect(this.rect.x, this.rect.y, this.rect.width, this.rect.height);

        this.canvasContext.fillStyle = (this.isHover) ? lightColor : darkColor;
        this.canvasContext.fillText(this.text.text, this.text.x, this.text.y);
    }

    setHover(isHover) {
        this.isHover = isHover;
    }

    executeClick() {
        this.callback(this.text.text);
    }

}