
export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super('PreloadScene');
    }

    preload() {
        this.load.image('sky', 'assets/sky.png');
        this.load.spritesheet('bird', 'assets/birdSprite.png', {frameWidth: 16, frameHeight: 16});
        this.load.image('wall', 'assets/wall.png');
        this.load.image('pause', 'assets/pause.png');
    }

    create() {
        this.scene.start('MenuScene')
    }

}