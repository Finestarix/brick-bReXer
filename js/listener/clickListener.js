export default class ClickListener {

    constructor(buttons) {
        document.addEventListener('click', (event) => {

            buttons.forEach(button => {
                if (event.x > button.rect.x &&
                    event.x < button.rect.x + button.rect.width &&
                    event.y > button.rect.y &&
                    event.y < button.rect.y + button.rect.height)
                    button.executeClick();
            });
        });
    }

}