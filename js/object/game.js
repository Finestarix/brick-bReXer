import Paddle from "./paddle.js";
import Score from "./score.js";
import Life from "./life.js";
import Ball from "./ball.js";
import Brick from "./brick.js";

import PaddleListener from "../listener/paddleListener.js";

import {getSideCollision, isCollision} from "../utility/collision.js";
import randomInteger from "../utility/random.js";
import {lightColor} from "../utility/colors.js";

const maximumBrickRow = 12;
const screenMargin = 20;

export default class Game {

    constructor(canvasContext, screenWidth, screenHeight) {
        this.canvasContext = canvasContext;

        this.difficulty = localStorage.getItem('Difficulty');

        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;

        this.totalLife = this.initializeTotalLife();
        this.lifes = this.initializeLife();

        this.scoreMultiplier = this.initializeScoreMultiplier();
        this.totalScore = 0;
        this.score = this.initializeScore();

        this.paddle = this.initializePaddle();
        new PaddleListener(this.paddle);

        this.balls = this.initializeBall();

        this.brickMinimumGenerate = this.initializeBrickMinimumGenerate();
        this.brickMaximumGenerate = this.initializeBrickMaximumGenerate();
        this.brickSpeedGenerate = this.initializeBrickSpeedGenerate();
        this.brickHealthGenerate = this.initializeBrickHealthGenerate();
        this.bricks = [];
        this.generateBrick()
    }

    update() {
        this.checkBallPaddleCollision();
        this.checkBrickPaddleCollision();
        this.draw();
    }

    drawEndLine() {
        this.canvasContext.beginPath();

        this.canvasContext.fillStyle = lightColor;
        this.canvasContext.rect(screenMargin, this.screenHeight - screenMargin * 4, this.screenWidth - screenMargin * 2, 2);
        this.canvasContext.fill();
    }

    draw() {
        this.drawEndLine();

        this.score.update();
        this.paddle.update();
        this.lifes.forEach(life => life.update());
        this.balls.forEach(ball => ball.update());
        this.bricks.forEach(brick => brick.update());
    }

    initializeTotalLife() {
        return (this.difficulty === 'Easy') ?
            3 : (this.difficulty === 'Medium') ?
                2 : (this.difficulty === 'Hard') ?
                    1 : 0;
    }

    initializeLife() {
        const lifes = [];

        for (let i = 0; i < this.totalLife; i++) {
            const position = {x: this.screenWidth - (i * 40) - 30 - screenMargin, y: 10};
            lifes.push(new Life(this.canvasContext, position));
        }

        return lifes;
    }

    initializeScoreMultiplier() {
        return (this.difficulty === 'Easy') ?
            1 : (this.difficulty === 'Medium') ?
                1.3 : (this.difficulty === 'Hard') ?
                    1.5 : 0;
    }

    initializeScore() {
        return new Score(this.canvasContext, screenMargin, 35, this.totalScore);
    }

    initializePaddle() {
        return new Paddle(this.canvasContext, this.screenWidth, this.screenHeight, screenMargin);
    }

    initializeBall() {
        const balls = [];

        const x = this.screenWidth / 2;
        const y = this.screenHeight - 40;
        balls.push(new Ball(this.canvasContext, x, y, this.screenWidth, screenMargin));

        return balls;
    }

    initializeBrickMinimumGenerate() {
        return (this.difficulty === 'Easy') ?
            maximumBrickRow - 7 : (this.difficulty === 'Medium') ?
                maximumBrickRow - 5 : (this.difficulty === 'Hard') ?
                    maximumBrickRow - 3 : 0;
    }

    initializeBrickMaximumGenerate() {
        return (this.difficulty === 'Easy') ?
            maximumBrickRow - 5 : (this.difficulty === 'Medium') ?
                maximumBrickRow - 3 : (this.difficulty === 'Hard') ?
                    maximumBrickRow - 1 : 0;
    }

    initializeBrickSpeedGenerate() {
        return (this.difficulty === 'Easy') ?
            13000 : (this.difficulty === 'Medium') ?
                11000 : (this.difficulty === 'Hard') ?
                    9000 : 0
    }

    initializeBrickHealthGenerate() {
        return (this.difficulty === 'Easy') ?
            1 : (this.difficulty === 'Medium') ?
                1 : (this.difficulty === 'Hard') ?
                    2 : 0;
    }

    generateBrick() {
        const totalGenerateBrick = randomInteger(this.brickMinimumGenerate, this.brickMaximumGenerate);
        const brickMatrix = Array(maximumBrickRow - 1).fill(0);

        for (let i = 0; i < totalGenerateBrick; i++) {
            const randomIndex = randomInteger(0, maximumBrickRow - 1);
            brickMatrix[randomIndex] = 1;
        }

        for (let i = 0; i < maximumBrickRow; i++) {
            if (brickMatrix[i] === 1) {
                this.bricks.push(new Brick(this.canvasContext,
                    {x: i * 98 + screenMargin, y: 70 + screenMargin},
                    this.brickHealthGenerate))
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
            this.balls.push(new Ball(this.canvasContext, ball.position.x, ball.position.y,
                this.screenWidth, screenMargin));
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
                    const collisionSide = getSideCollision(ball, brick);
                    if (collisionSide === 'right' || collisionSide === 'left') ball.speed.x = -ball.speed.x;
                    else ball.speed.y = -ball.speed.y;

                    brick.decreaseHealth();

                    if (brick.currentHealth === 0) {
                        const index = this.bricks.indexOf(brick);
                        this.bricks.splice(index, 1);
                    }
                }
            })
        });
    }


}