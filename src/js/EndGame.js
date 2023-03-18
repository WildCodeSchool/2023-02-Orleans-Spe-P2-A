export default class EndGame extends Phaser.Scene {
    constructor() {
        super({key: "EndGame"});
    }

    preload() {
    }

    create() {
        this.add.text(100, 100, "Wow vous ne le saviez surrement pas mais vous venez de battre la mafia des chats", {
            font: "30px",
            fill: "#000000"
        });

        this.add.text(100, 200, "Bon après d'autres prendrons la place mais une victoire est une victoire hein ?", {
            font: "25px",
            fill: "#000000"
        });
    }
}