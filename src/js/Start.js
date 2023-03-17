export default class Start extends Phaser.Scene {
    constructor() {
        super({key: "Start"});
    }


    preload() {
        this.load.audio('bgm', './src/assets/music-start.mp3');
        this.load.image('bg-start', './src/assets/bg-start1.png');
    }

    create() {
        this.add.image(1000, 500, 'bg-start').setScale(.9);

        this.add.text(500, 100, "CRAZYGAME", {
                fontSize: "100px",
                fill: "#000000"
            });

        this.add.text(450, 200, "Un pong ? un shooter ? Des chats ?", {
            fontSize: "35px",
            fill: "#000000"
        });

        this.add.text(700, 400, "Appuie sur espace pour commencer", {
            fontSize: "30px",
            fill: "#000000"
        });

        this.bgm = this.sound.add('bgm');
        this.bgmConfig = {
            volume: 0.8,
            delay: 0,
            loop: true,
        }
        this.bgm.play(this.bgmConfig);

        this.input.keyboard.on('keydown-SPACE', function (event) {
            this.scene.start('pong');
        }, this);
    }

}
