
// chargement des librairies

//import title from "/src/js/title.js";
import pong from "/src/js/Pong.js";
//import cat from "/src/js/cat.js";
//import pong2 from "/src/js/pong2.js";
// Config générale du jeu
const config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    backgroundColor: "000",
    physics: {
        default: 'arcade',
        arcade: {
            gravity: false
        },
        debug: false
    },
    scene: [pong]
};

const game = new Phaser.Game(config);
game.scene.start("pong");