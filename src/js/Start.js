export default class Start extends Phaser.Scene {
    constructor() {
        super({key: "Start"});
    }


    preload() {
        this.load.audio('bgm', './src/assets/music-start.mp3');
    }

    create() {
        this.bgm = this.sound.add('bgm');
        this.bgmConfig = {
            volume: 0.8,
            delay: 0,
            loop: true,
        }
        this.bgm.play(this.bgmConfig);

        this.input.keyboard.on('keydown-SPACE', function (event) {
            this.scene.start('CatShoot');
        }, this);
    }

    upload() {
    }
}
