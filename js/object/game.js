import Paddle from "./paddle.js";
import Score from "./score.js";
import Life from "./life.js";
import Ball from "./ball.js";
import Brick from "./brick.js";

import PaddleListener from "../listener/paddleListener.js";

import isCollision from "../utility/collision.js";
import randomInteger from "../utility/random.js";

const maximumBrickRow = 10;

export default class Game {

    constructor(canvasContext, screenWidth, screenHeight) {
        this.canvasContext = canvasContext;

        this.difficulty = localStorage.getItem('Difficulty');

        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;

        this.totalLife = 3;
        this.lifes = this.initializeLife();

        this.totalScore = 0;
        this.score = new Score(this.canvasContext, 10, 35, this.totalScore)

        this.paddle = new Paddle(this.canvasContext, this.screenWidth, this.screenHeight);
        new PaddleListener(this.paddle);

        this.balls = this.initializeBall();

        this.brickAttribute = this.getBrickAttribute();
        this.bricks = [];
        this.generateBrick()
    }

    update() {
        this.checkBallPaddleCollision();
        this.checkBrickPaddleCollision();
        this.draw();
    }

    draw() {
        this.lifes.forEach(life => life.update());
        this.score.update();
        this.paddle.update();
        this.balls.forEach(ball => ball.update());
        this.bricks.forEach(brick => brick.update());
    }

    initializeLife() {
        const lifes = [];

        for (let i = 0; i < this.totalLife; i++) {
            const position = {x: this.screenWidth - (i * 40) - 40, y: 10};
            lifes.push(new Life(this.canvasContext, position));
        }

        return lifes;
    }

    initializeBall() {
        const balls = [];

        const x = this.screenWidth / 2;
        const y = this.screenHeight - 40;
        balls.push(new Ball(this.canvasContext, x, y, this.screenWidth, this.screenHeight, false));

        return balls;
    }

    getBrickAttribute() {
        return {
            min: (this.difficulty === 'Easy') ?
                3 : (this.difficulty === 'Medium') ?
                    5 : (this.difficulty === 'Hard') ?
                        7 : 0,
            max: (this.difficulty === 'Easy') ?
                5 : (this.difficulty === 'Medium') ?
                    7 : (this.difficulty === 'Hard') ?
                        10 : 0,
            speed: (this.difficulty === 'Easy') ?
                10000 : (this.difficulty === 'Medium') ?
                    7000 : (this.difficulty === 'Hard') ?
                        5000 : 0,
            health: (this.difficulty === 'Easy') ?
                1 : (this.difficulty === 'Medium') ?
                    2 : (this.difficulty === 'Hard') ?
                        3 : 0
        }
    }

    generateBrick() {
        const totalGenerateBrick = randomInteger(this.brickAttribute.min, this.brickAttribute.max);
        const brickMatrix = Array(maximumBrickRow - 1).fill(0);

        for (let i = 0; i < totalGenerateBrick; i++) {
            const randomIndex = randomInteger(0, maximumBrickRow - 1);
            brickMatrix[randomIndex] = 1;
        }

        for (let i = 0; i < maximumBrickRow; i++) {
            if (brickMatrix[i] === 1) {
                this.bricks.push(new Brick(this.canvasContext, {x: i * 110, y: 70},
                    this.brickAttribute.health))
            }
        }
    }

    increaseLife() {
        const position = {x: this.screenWidth - (this.totalLife * 40) - 40, y: 10};
        this.lifes.push(new Life(this.canvasContext, position));
        this.totalLife++;
    }

    decreaseLife() {
        this.totalLife--;
        this.lifes.pop();
    }

    increaseScore(increasingPoint) {
        this.totalScore += increasingPoint;
    }

    mutateBall() {
        this.balls.forEach(ball => {
            this.balls.push(new Ball(this.canvasContext, ball.position.x, ball.position.y, this.screenWidth, this.screenHeight, true));
        });
    }

    increaseBallY() {
        this.bricks.forEach(brick => {
            brick.position.y += 40;
        });
    }

    checkBallPaddleCollision() {
        this.balls.forEach(ball => {
            if (isCollision(ball, this.paddle)) {
                ball.speed.y = -ball.speed.y;
                ball.position.y = this.paddle.position.y - ball.radius;
            }
        });
    }

    checkBrickPaddleCollision() {
        this.balls.forEach(ball => {
            this.bricks.forEach(brick => {
                if (isCollision(ball, brick)) {
                    ball.speed.y = -ball.speed.y;
                    ball.position.y = brick.position.y - ball.radius;

                    brick.health--;

                    if (brick.health === 0) {
                        const index = this.bricks.indexOf(brick);
                        this.bricks.splice(index, 1);
                    }
                }
            })
        });
    }


}