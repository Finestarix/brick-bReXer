import Paddle from "./paddle.js";
import Score from "./score.js";
import Life from "./life.js";
import Ball from "./ball.js";
import Brick from "./brick.js";
import Power from "./power.js";

import PaddleListener from "../listener/paddleListener.js";

import {getSideCollision, isCollision} from "../utility/collision.js";
import randomInteger from "../utility/random.js";

import {gameBackgroundColor, lightColor} from "../utility/colors.js";
import {powerType, totalPowerType} from "./power.js";

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
        this.scoreCounter = 1;
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
        this.generateBrick();

        this.powers = [];
    }

    update() {
        this.checkBallPaddleCollision();
        this.checkBallBrickCollision();
        this.checkPowerPaddleCollision();

        this.checkBallCondition();

        this.draw();
    }

    drawEndLine() {
        this.canvasContext.beginPath();

        this.canvasContext.fillStyle = lightColor;
        this.canvasContext.rect(screenMargin, this.screenHeight - screenMargin * 4,
            this.screenWidth - screenMargin * 2, 2);
        this.canvasContext.fill();
    }

    draw() {
        this.canvasContext.fillStyle = gameBackgroundColor;
        this.canvasContext.fillRect(0, 0, this.screenWidth, this.screenHeight);

        this.drawEndLine();

        this.score.update();
        this.paddle.update();
        this.lifes.forEach(life => life.update());
        this.balls.forEach(ball => ball.update());
        this.bricks.forEach(brick => brick.update());
        this.powers.forEach(power => power.update());
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
        balls.push(new Ball(this.canvasContext, x, y, this.screenWidth, this.screenHeight, screenMargin));

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
                2 : (this.difficulty === 'Hard') ?
                    3 : 0;
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

    checkBallPaddleCollision() {
        this.balls.forEach(ball => {
            if (isCollision(ball, this.paddle)) {
                ball.speed.y = -ball.speed.y;
                ball.position.y = this.paddle.position.y - ball.radius;

                ball.resetComboBrick();
            }
        });
    }

    checkBallBrickCollision() {

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

                        if (this.isGetPower()) {
                            this.createPower(brick.position);
                        }
                    }

                    this.increaseScore(ball.comboBrick);
                    ball.increaseComboBrick();
                }
            })
        });
    }

    checkPowerPaddleCollision() {
        this.powers.forEach(power => {
            if (isCollision(power, this.paddle)) {
                const index = this.powers.indexOf(power);
                this.powers.splice(index, 1);

                for (let i = 0; i < totalPowerType; i++)
                    if (power.powerType === powerType[i])
                        switch (i) {
                            case 0:
                                this.paddle.increasePaddleWidth();
                                break;
                            case 1:
                                this.paddle.decreasePaddleWidth();
                                break;
                            case 2:
                                this.increaseLife();
                                break;
                            case 3:
                                this.mutateBall();
                                break;
                            case 4:
                                this.balls.forEach(ball => ball.increaseBallSpeed());
                                break;
                            case 5:
                                this.balls.forEach(ball => ball.decreaseBallSpeed());
                                break;
                            case 6:
                                this.increaseScoreMultiplier();
                                break;
                        }
            }
        });
    }

    increaseScore(currentCombo) {
        this.totalScore += 10 * this.scoreMultiplier * this.scoreCounter * currentCombo;
        this.score.setScore(this.totalScore);
    }

    isGetPower() {
        const randomThreshold = (this.difficulty === 'Easy') ?
            30 : (this.difficulty === 'Medium') ?
                20 : (this.difficulty === 'Hard') ?
                    10 : 0;

        return randomInteger(1, 100) <= randomThreshold;
    }

    createPower(position) {
        position.y += 20;
        console.log('push');
        this.powers.push(new Power(this.canvasContext, position));
    }

    checkAnimationCondition() {
        let isOver = false;

        this.bricks.forEach(brick => {
            if (brick.position.y > this.screenHeight - screenMargin * 4)
                isOver = true;
        });

        if (this.lifes.length === 0)
            isOver = true;

        return isOver;
    }

    checkBallCondition() {
        this.balls.forEach(ball => {
            if (ball.isBallOutsideScreen()) {
                if (this.balls.length === 1)
                    this.decreaseLife();

                const index = this.balls.indexOf(ball);
                this.balls.splice(index, 1);
            }
        });
    }

    decreaseLife() {
        this.totalLife--;
        this.lifes.pop();
    }

    increaseBallY() {
        this.bricks.forEach(brick => {
            brick.position.y += 40;
        });
    }

    increaseLife() {
        const position = {x: this.screenWidth - (this.totalLife * 40) - 30 - screenMargin, y: 10};
        this.lifes.push(new Life(this.canvasContext, position));
        this.totalLife++;
    }

    mutateBall() {
        this.balls.forEach(ball => {
            this.balls.push(new Ball(this.canvasContext, ball.position.x, ball.position.y,
                this.screenWidth, this.screenHeight, screenMargin));
        });
    }

    increaseScoreMultiplier() {
        this.scoreMultiplier += 0.2;
    }
}