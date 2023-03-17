export default class Start extends Phaser.Scene {
    constructor() {
        super({key: "Start"});
    }


    preload() {
        this.load.svg('catpaws', './src/assets/catpaws.svg');
    }

    create() {
        this.player = this.physics.add.sprite(950, 450, 'catpaws').setScale(0.3);
        this.cursors = this.input.keyboard.createCursorKeys();

        this.input.keyboard.on('keydown-SPACE', function (event) {
            this.scene.start('CatShoot');
        }, this);
    }

    upload() {
    }
}
