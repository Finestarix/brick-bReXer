export default function isCollision(ball, gameObject) {
    let bottomOfBall = ball.position.y + ball.radius;
    let topOfBall = ball.position.y;

    let topOfObject = gameObject.position.y;
    let leftSideOfObject = gameObject.position.x;
    let rightSideOfObject = gameObject.position.x + gameObject.width;
    let bottomOfObject = gameObject.position.y + gameObject.height;

    return (bottomOfBall >= topOfObject &&
        topOfBall <= bottomOfObject &&
        ball.position.x >= leftSideOfObject &&
        ball.position.x + ball.radius <= rightSideOfObject);
}