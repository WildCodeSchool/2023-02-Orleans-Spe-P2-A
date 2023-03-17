
export default class Pong extends Phaser.Scene {
    // Constructor de la classe
    constructor() {
        super({ key: "pong"}) //je précice le nom de la classe en tant qu'identifiant
    }

    preload() {
        this.load.image('pongBall', 'src/assets/img/pong_ball.png');
        this.load.image('paddle', 'src/assets/img/paddle.png');
        this.load.image('wall', 'src/assets/img/wall.png');
        this.load.audio('PongPlop', 'src/assets/pong_sound/plop.ogg');
        this.load.audio('PongBeep', 'src/assets/pong_sound/beeep.ogg');
        this.load.audio('PongPeep', 'src/assets/pong_sound/peeeeeep.ogg');
    }

    create() {

        this.isGameStarted = false;
        this.life = 1;
        this.chrono = 50;
        this.initialVelocityX = 500;
        this.initialVelocityY = 500;

        this.pongBall = this.physics.add.sprite(
            this.physics.world.bounds.width / 2,
            this.physics.world.bounds.height / 2,
            'pongBall'
        ).setScale(0.4)
        this.pongBall.setCollideWorldBounds(true);
        this.pongBall.setBounce(1, 1,)

        this.paddle = this.physics.add.sprite(
            this.pongBall.body.width * 2,
            this.physics.world.bounds.height / 2,
            'paddle'
        ).setScale(0.7);

        this.paddle.setImmovable(true);
        this.paddle.setCollideWorldBounds(true);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.turbo = this.input.keyboard.addKey('T');

        this.engage = this.input.keyboard.addKey('E')

        this.wall = this.physics.add.staticGroup();
        
        this.wall.create(this.physics.world.bounds.width, this.physics.world.bounds.height / 2, 'wall').setScale(8).refreshBody();

        /*--ajout du son--*/
        this.physics.add.collider(this.pongBall, this.wall, this.beeep, null, this);
        this.physics.add.collider(this.pongBall, this.paddle, this.plop, null, this);

        //to fix
        this.physics.add.collider(this.pongBall, this.worldBounds, this.peeeeeep, null, this)

        this.nextLevel = this.add.text(
            this.physics.world.bounds.width / 2,
            this.physics.world.bounds.height / 2,
            'Next level !'
        );
        this.nextLevel.setVisible(false);

        this.gameOver = this.add.text(
            this.physics.world.bounds.width / 2,
            this.physics.world.bounds.height / 2,
            "Game Over ! push the 'E key' for another game",
        );

        this.gameOver.setVisible(false);

        /****chrono****/

        this.timer = this.time.addEvent({
            delay: 1000,
            callback: this.countdown,
            callbackScope: this,
            loop: true
        });

        this.chronoText = this.add.text(16, 100, "Chrono: 50", {
            fontSize: "24px",
            fill: "#FFFFFF" //Couleur de l'écriture
        });

        this.chronoText.setScrollFactor(0);

        /*--ajout des sons--*/
        this.pongPlop = this.sound.add('PongPlop');
        this.pongPlop.play({ volume: 2 });
        this.pongPeep = this.sound.add('PongPeep');
        this.pongBeep = this.sound.add('PongBeep');

    }

    update() {
        if (!this.isGameStarted) {

            this.pongBall.setVelocityX(this.initialVelocityX);
            this.pongBall.setVelocityY(this.initialVelocityY);
            this.isGameStarted = true;
        }

        if (this.pongBall.x < this.paddle.body.x / 2) {

            this.pongBall.setVelocityX(0);
            this.pongBall.setVelocityY(0);
            this.life--;
        }

        this.paddle.body.setVelocity(0)

        if (this.cursors.up.isDown) {
            this.paddle.body.setVelocityY(-1050);
        }
        if (this.cursors.down.isDown) {
            this.paddle.body.setVelocityY(1000);
        }
        if (this.turbo.isDown && this.cursors.up.isDown) {
            this.paddle.body.setVelocityY(-2550);
        }
        if (this.turbo.isDown && this.cursors.down.isDown) {
            this.paddle.body.setVelocityY(2550);
        }

        if (this.life === 0) {
            this.gameOver.setVisible(true);
            this.pongBall.setVelocityX(0);
            this.pongBall.setVelocityY(0);
            this.paddle.setVelocityY(0);
            this.timer.paused = true;
            this.time.addEvent({
                delay: 1000,
                callback: this.loose,
                callbackScope: this,
                loop: false
            });
        }
        if (this.engage.isDown) {
            location.reload()
        }

        if (this.chrono <= 40) {
            this.pongBall.setBounce(1.03, 1.03)
        }

        this.newLevel();
    }

    /*-- activation du son sous condition*/
    plop() {
        if (this.physics.add.collider(this.pongBall, this.paddle)) {
            this.pongPlop.play({ volume: 2 })
        };
    }

    beeep() {
        if (this.physics.add.collider(this.pongBall, this.wall)) {
            this.pongBeep.play({ volume: 2 })
        };
    }

    // to fix
    peeeeeep() {
        if (this.physics.add.collider(this.pongBall, this.worldBounds)) {
            this.pongPeep.play({ volume: 2 })
        };
    }

    countdown() {
        this.chrono = this.chrono - 1;
        this.chronoText.setText("Survis: " + this.chrono);

        if (this.chrono === 0 || this.life === 0) {
            this.isGameStarted = false;
            this.timer.paused = true;
        }
    }
    win(){
        this.scene.start('CatShoot');
    }
    loose(){
        this.scene.start('Start');
    }
    newLevel() {
        if (this.chrono === 0 && this.life > 0) {
            this.nextLevel.setVisible(true);
            this.pongBall.setVelocityX(0);
            this.pongBall.setVelocityY(0);
            this.paddle.setVelocityY(0);

            this.time.addEvent({
                delay: 1000,
                callback: this.win,
                callbackScope: this,
                loop: false
            });
        }
    }
}


