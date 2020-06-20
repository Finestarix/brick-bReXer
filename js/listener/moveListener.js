export default class MoveListener {

    constructor(mousePosition, buttons) {
        document.addEventListener('mousemove', (event) => {

            mousePosition.x = event.x;
            mousePosition.y = event.y + 10;

            buttons.forEach(button => {
                button.setHover(event.x > button.rect.x &&
                    event.x < button.rect.x + button.rect.width &&
                    event.y > button.rect.y &&
                    event.y < button.rect.y + button.rect.height)
            });
        });
    }

}