import Phaser from "phaser";
import {
    CENTER_OF_SCREEN,
    HORIZONTAL_DISTANCE,
    PADDING, VELOCITY,
    VERTICAL_DISTANCE_RANGE,
    WALL_TO_RENDER
} from "../constants";
import BaseScene from "./BaseScene";
import {styledMenu} from "../styles";

export default class GameScene extends BaseScene {

    constructor(config) {
        super('GameScene', config);

        this.bird = null;
        this.walls = null;

        this.wallHorizontalDistance = HORIZONTAL_DISTANCE;

        this.score = 0;
        this.scoreText = '';
    }

    create() {
        super.create();
        this.createBird();
        this.createBirdAnimation();
        this.createWalls();
        this.createColliders();
        this.createScore();
        this.handleInputs();
        this.createPause();
        this.resumeListener();
    }

    update() {
        if (this.bird.getBounds().bottom >= this.config.height || this.bird.getBounds().top <= 0) {
            this.restartGame()
        }

        this.reuseWalls();
    }

    // Create functions:

    createBird() {
        this.bird = this.physics.add.sprite(this.config.initialPosition.width, this.config.initialPosition.height, 'bird')
                    .setScale(4).setOrigin(0).setFlipX(true);

        this.bird.setBodySize(this.bird.width, this.bird.height-8);
        this.bird.body.gravity.y = 300;
        this.bird.setCollideWorldBounds(true);
    }

    createBirdAnimation() {
        this.anims.create({
            key: 'fly',
            frames: this.anims.generateFrameNumbers('bird', {start: 8, end: 15}),
            frameRate: 8,
            repeat: -1
        })
        this.bird.play('fly');
    }

    createWalls() {

        this.walls = this.physics.add.group()

        for (let i = 0; i < WALL_TO_RENDER; i++) {
            const topWall = this.walls.create(0, 0, 'wall').setImmovable(true).setOrigin(0, 1);
            const botWall = this.walls.create(0, 0, 'wall').setImmovable(true).setOrigin(0);

            this.placeWall(topWall, botWall);
        }
        this.walls.setVelocityX(-VELOCITY)
    }

    handleInputs() {
        this.input.on('pointerdown', this.fly, this);
        this.input.keyboard.on('keydown-SPACE', this.fly, this);
    }

    createColliders() {
        this.physics.add.collider(this.bird, this.walls, this.restartGame, null, this)
    }

    createScore() {
        this.score = 0;
        this.scoreText = this.add.text(8, 8, `Score: ${this.score}`);
        const bestScore = localStorage.bestScore ? +localStorage.getItem('bestScore') : null;
        if (bestScore) {
            this.add.text(8, 24, `Best score: ${bestScore}`)
        }
    }

    createPause() {
        const button = this.add.image(this.config.width - 56, this.config.height - 56, 'pause').setScale(3).setOrigin(0).setInteractive();
        button.on('pointerdown', () => {
            this.physics.pause();
            this.scene.pause();
            this.scene.launch('PauseScene')
        })
    }

    // Game functions:

    resumeListener() {
        if (this.pauseEvent) return;

        this.pauseEvent = this.events.on('resume', () => {
            this.initialTime = 3;
            this.countDownText = this.add.text(...CENTER_OF_SCREEN, `Resume in: ${this.initialTime}`, styledMenu).setOrigin(0.5, 1);
            this.timedEvent = this.time.addEvent({
                delay: 1000,
                callback: this.countDown,
                callbackScope: this,
                loop: true
            })
        })
    }

    countDown() {
        this.initialTime--;
        this.countDownText.setText(`Resume in: ${this.initialTime}`).setOrigin(0.5, 1)
        if (this.initialTime <= 0) {
            this.countDownText.setText('');
            this.physics.resume();
            this.timedEvent.remove()
        }
    }

    fly() {
        this.bird.body.velocity.y = -VELOCITY;
    }

    restartGame() {
        this.physics.pause();
        this.bird.setTint(0xee4824);
        this.time.addEvent({
            delay: 1000,
            loop: false,
            callback: () => this.scene.restart()
        })
        const bestScore = localStorage.bestScore ? +localStorage.getItem('bestScore') : null;
        if (!bestScore || bestScore < this.score) {
            localStorage.setItem('bestScore', this.score)
            this.add.text(8, 24, `Best score: ${this.score}`)
        }
    }

    getWallVerticalDistance() {
        return Phaser.Math.Between(...VERTICAL_DISTANCE_RANGE);
    };

    getWallVerticalPosition(getWallVerticalDistance) {
        return Phaser.Math.Between(PADDING, (this.config.height - PADDING) - getWallVerticalDistance);
    }

    getRightMostWall() {
        let rightMostX = 0;

        this.walls.getChildren().forEach(wall => rightMostX = Math.max(wall.x, rightMostX))

        return rightMostX;
    }

    placeWall(topWall, botWall) {
        const rightMostX = this.getRightMostWall();
        const wallVerticalDistance = this.getWallVerticalDistance();
        const wallVerticalPosition = this.getWallVerticalPosition(wallVerticalDistance);

        topWall.x = rightMostX + this.wallHorizontalDistance
        topWall.y = wallVerticalPosition;

        botWall.x = topWall.x;
        botWall.y = topWall.y + wallVerticalDistance
    }

    reuseWalls() {
        const tempWalls = [];
        this.walls.getChildren().forEach(wall => {
            if (wall.getBounds().right <= 0) {
                tempWalls.push(wall)
                if (tempWalls.length === 2) {
                    this.placeWall(...tempWalls);
                    this.updateScore();
                }
            }
        })
    }

    updateScore() {
        this.score++;
        this.scoreText.setText(`Score: ${this.score}`);
    }


}