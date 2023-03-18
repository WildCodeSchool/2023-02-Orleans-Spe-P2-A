export default class CatShoot extends Phaser.Scene {
    constructor() {
        super({key: "CatShoot"});
    }

    preload() {
        this.load.svg('catboss', './src/assets/catBoss.svg');
        this.load.svg('catminion', './src/assets/catminion.svg');
        this.load.svg('catpaws', './src/assets/catpaws.svg');
        this.load.audio("catsound", "./src/assets/cats-meow2.mp3");
        this.load.audio("catboss", "./src/assets/angry-cat.mp3");
    }

    create() {
        this.player = this.physics.add.sprite(950, 450, 'catpaws').setScale(0.3);


        this.chrono = 35;
        this.gameOver = false;
        this.score = 0;

        this.player.canShot = true;

        this.bullets = this.physics.add.group();
        this.player.setCollideWorldBounds(true);
        this.bullets.onWorldsBounds = true;


        this.meow = this.sound.add("catsound");
        this.bossMeow = this.sound.add("catboss");

        this.meowConfig = {
            volume: 2,
            delay: 0,
            loop: false,
        }

        this.meow.play(this.meowConfig);


        for (let i = 0; i < 70; i++) {
            const xx = Phaser.Math.Between(50, 1800);
            const yy = Phaser.Math.Between(50, 350);
            this.catMinion = this.physics.add.group({
                key: 'catminion',
                repeat: 0,
                setXY: {x: xx, y: yy, stepX: 70},
                setVelocityX: -200
            });
        }

        for (let i = 0; i < 1; i++) {
            const x = Phaser.Math.Between(50, 1500);
            const y = Phaser.Math.Between(50, 300);
            this.catBoss = this.physics.add.sprite(x, y, 'catboss').setScale(1.2).refreshBody();
        }

        for (let i = 0; i < 20; i++) {
            const xx = Phaser.Math.Between(50, 1800);
            const yy = Phaser.Math.Between(50, 350);
            this.catMinion = this.physics.add.group({
                key: 'catminion',
                repeat: 0,
                setXY: {x: xx, y: yy, stepX: 70},
                setVelocityX: -200
            });
        }


        this.physics.add.overlap(this.bullets, this.catBoss, this.killAlien, null, this);

        // Supprimer les balles qui sortent du monde
        this.physics.world.on("worldbounds", function (body) {
            // on récupère l'objet surveillé
            this.outBullet = body.gameObject;
            // s'il s'agit d'une balle
            if (this.bullets.contains(outBullet)) {
                // on le détruit
                this.outBullet.destroy();
            }
        });

        this.add.text(100, 600, "Trouve et élimine le boss chat !", {
            fontSize: "30px",
            fill: "#000"
        })


        // création du timer
        this.timer = this.time.addEvent({
            delay: 100,
            callback: this.countdown,
            callbackScope: this,
            loop: true
        });


        // affichage du timer
        this.chronoText = this.add.text(this.physics.world.bounds.width / 2, this.physics.world.bounds.height / 2
            , "Chrono: 0", {
                fontSize: "24px",
                fill: "#00000"
            });

        this.chronoText.setScrollFactor(0);

        this.cursors = this.input.keyboard.createCursorKeys();

    }

    countdown() {

        if (this.score === 1) {
            this.timer.paused = true;
            this.bossMeow.play(this.meowConfig);
            this.successText = this.add.text(800, 600, "Bravo tu as réussi...", {
                fontSize: "40px",
                fill: "red"

            });
            this.time.addEvent({
                delay: 1000,
                callback: this.win,
                callbackScope: this,
                loop: false
            });
        }
        if (this.chrono > 0 && this.gameOver === false) {
            this.chrono = this.chrono - 1; // on decremente le chronometre
        } else {
            this.timer.paused = true;
            this.gameOver = true;
            this.gameOverText = this.add.text(800, 600, "Oh non tu as perdu", {
                fontSize: "40px",
                fill: "black"
            });
            this.time.addEvent({
                delay: 1000,
                callback: this.loose,
                callbackScope: this,
                loop: false
            });
        }
        this.chronoText.setText("Chrono: " + this.chrono); //on raffraichi le chrono;
    }


    loose() {
        this.scene.start("pong");
    }

    win() {
        this.scene.start('EndGame');
    }

    killAlien(bullets, catBoss) {
        //on supprime la cible et la balle quand ils se rencontrent et on incremente le compteur score
        catBoss.destroy();
        bullets.destroy();
        this.score = this.score + 1;
    }

    update() {
        if (this.gameOver === false) {
            if (this.cursors.left.isDown) {
                this.player.setVelocityX(-500);

            } else if (this.cursors.right.isDown) {
                this.player.setVelocityX(500);

            } else {
                this.player.setVelocityX(0);
            }

            if (this.cursors.space.isDown) {
                if (this.player.canShot === true) {
                    //on créer la balle avec sa vélocité/direction pour tirer
                    const bullet = this.bullets.create(this.player.x, this.player.y, 'catpaws').setScale(0.2);
                    bullet.setVelocityY(-450);
                    this.player.canShot = false; // on désactive la possibilté de tirer

                    // on la réactive dans 1.2 secondes avec un timer
                    let timerShotOk = this.time.delayedCall(800,
                        function () {
                            this.player.canShot = true;
                        },
                        null, this);
                }
            }
        }
    }
}


