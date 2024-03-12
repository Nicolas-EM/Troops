import Phaser from 'phaser'

export default class Hud extends Phaser.Scene {
    private woodCounter: number;
    private goldCounter: number;
    private sheepCounter: number;
    private displayedEntity: Phaser.GameObjects.Sprite;
    constructor() {
        super({ key: 'hud' });
    }

    preload() {
        this.load.setPath('assets/sprites/');
    }

    create() {
        // Player Icon
        this.add.image(40, 35, 'Carved_Big');

        // Wood
        let woodIcon = this.add.image(-20, -20, 'Wood');
        woodIcon.scale = 0.75;

        let woodContainer = this.add.container(120, 45);
        woodContainer.add(this.add.nineslice(0, 0, 'Connection_Up', undefined, 185, 65, 5, 5, 0, 1));
        woodContainer.add(woodIcon);

        // Food
        let foodIcon = this.add.image(-25, -12, 'Food');
        foodIcon.scale = 0.70;

        let foodContainer = this.add.container(235, 45);
        foodContainer.add(this.add.nineslice(0, 0, 'Connection_Up', undefined, 185, 65, 5, 5, 0, 1));
        foodContainer.add(foodIcon);

        // Gold
        let goldIcon = this.add.image(-27, -8, 'Gold');
        goldIcon.scale = 0.60;

        let goldContainer = this.add.container(350, 45);
        goldContainer.add(this.add.nineslice(0, 0, 'Connection_Up', undefined, 185, 65, 5, 5, 0, 1));
        goldContainer.add(goldIcon);

        // Population
        this.add.nineslice(this.cameras.main.width / 2, 45, 'Connection_Up', undefined, 240, 70, 5, 5, 1, 1);

        // options button
        let optionsContainer = this.add.container(this.cameras.main.width - 55, 45);
        optionsContainer.add(this.add.image(0, 0, 'Yellow'));
        optionsContainer.add(this.add.image(0, 0, 'Settings'));
    }
}