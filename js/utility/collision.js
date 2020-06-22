export function isCollision(ball, gameObject) {

    return ball.position.x + ball.radius > gameObject.position.x &&
        ball.position.x - ball.radius < gameObject.position.x + gameObject.width &&
        ball.position.y + ball.radius > gameObject.position.y &&
        ball.position.y - ball.radius < gameObject.position.y + gameObject.height
}

export function getSideCollision(ball, gameObject) {
    const dx = (ball.position.x + ball.radius / 2) - (gameObject.position.x + gameObject.width / 2);
    const dy = (ball.position.y + ball.radius / 2) - (gameObject.position.y + gameObject.height / 2);

    const width = (ball.radius * 2 + gameObject.width) / 2;
    const height = (ball.radius * 2 + gameObject.height) / 2;

    const crossWidth = width * dy;
    const crossHeight = height * dx;

    let collision = 'none';
    if (Math.abs(dx) <= width && Math.abs(dy) <= height) {
        if (crossWidth > crossHeight)
            collision = (crossWidth > (-crossHeight)) ? 'bottom' : 'left';
        else
            collision = (crossWidth > -(crossHeight)) ? 'right' : 'top';
    }

    return (collision);
}