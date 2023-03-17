import Start from "./js/Start.js";
import CatShoot from "./js/CatShoot.js";

const config = {
    type: Phaser.AUTO,
    width: 1920, // largeur en pixels
    height: 1080, // hauteur en pixels
    parent: 'game-div',
    transparent: true,
    physics: {
        // définition des parametres physiques
        default: "arcade", // mode arcade : le plus simple : des rectangles pour gérer les collisions. Pas de pentes
        arcade: {
            // parametres du mode arcade
            gravity: {
                y: 0 // gravité verticale : acceleration ddes corps en pixels par seconde
            },
            debug: false // permet de voir les hitbox et les vecteurs d'acceleration quand mis à true
        }
    },
    scene: [Start,CatShoot]
};

const game = new Phaser.Game(config);