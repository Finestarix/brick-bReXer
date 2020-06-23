const backgroundSound = "sound/music_sound.mp3";
const collisionBrickSound = "sound/collision_brick_sound.mp3";
const collisionPaddleSound = "sound/collision_paddle_sound.mp3";
const collisionWallSound = "sound/collision_wall_sound.mp3";
const lifeLostSound = "sound/life_lost_sound.mp3";

export default class MusicHandler {

    constructor() {
        this.backgroundSound = new Audio(backgroundSound);
        this.collisionBrickSound = new Audio(collisionBrickSound);
        this.collisionPaddleSound = new Audio(collisionPaddleSound);
        this.collisionWallSound = new Audio(collisionWallSound);
        this.lifeLostSound = new Audio(lifeLostSound);

        this.backgroundSound.loop = true;
    }

    playBackgroundSound() {
        this.backgroundSound.play();
    }

    playCollisionBrickSound() {
        this.collisionBrickSound.play();
    }

    playCollisionPaddleSound() {
        this.collisionPaddleSound.play();
    }

    playCollisionWallSound() {
        this.collisionWallSound.play();
    }

    playLifeLostSound() {
        this.lifeLostSound.play();
    }



}