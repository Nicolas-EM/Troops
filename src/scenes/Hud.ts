import Phaser from 'phaser'

export default class Hud extends Phaser.Scene {
    constructor() {
        super({ key: 'hud' });
    }

    preload() {
        this.load.setPath('assets/sprites/');
    }

    create() {
        // Fondo transparente para que se vea Game
        this.cameras.main.setBackgroundColor('rgba(0, 0, 0, 0)');

        this.add.rectangle(100, 50, 200, 100, 0xff0000);
    }

}