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
        this.createTopHud();
        this.createBottomHud();
    }

    createTopHud() {
        const midX = this.cameras.main.width / 2;

        // Wood
        let woodIcon = this.add.image(-20, -20, 'Wood');
        woodIcon.scale = 0.75;

        let woodContainer = this.add.container(100, 45);
        woodContainer.add(this.add.nineslice(0, 0, 'Connection_Up', undefined, 185, 65, 5, 5, 0, 1));
        woodContainer.add(woodIcon);

        // Food
        let foodIcon = this.add.image(-25, -12, 'Food');
        foodIcon.scale = 0.70;

        let foodContainer = this.add.container(215, 45);
        foodContainer.add(this.add.nineslice(0, 0, 'Connection_Up', undefined, 185, 65, 5, 5, 0, 1));
        foodContainer.add(foodIcon);

        // Gold
        let goldIcon = this.add.image(-27, -8, 'Gold');
        goldIcon.scale = 0.60;

        let goldContainer = this.add.container(330, 45);
        goldContainer.add(this.add.nineslice(0, 0, 'Connection_Up', undefined, 185, 65, 5, 5, 0, 1));
        goldContainer.add(goldIcon);

        // Population
        let soldierIcon = this.add.image(-40, 0, "Soldier_Blue");
        soldierIcon.scale = 0.35;

        let villagerIcon = this.add.image(-20, 0, "Villager_Blue");
        villagerIcon.scale = 0.4;

        let populationContainer = this.add.container(midX, 45);
        populationContainer.add(this.add.nineslice(0, 0, 'Connection_Up', undefined, 240, 70, 5, 5, 1, 1));
        populationContainer.add(soldierIcon);
        populationContainer.add(villagerIcon);

        // options button
        let optionsContainer = this.add.container(this.cameras.main.width - 55, 45);
        let settingsButton = this.add.image(0, 0, 'Yellow')
        optionsContainer.add(settingsButton);
        optionsContainer.add(this.add.image(0, 0, 'Settings'));

        settingsButton.setInteractive().on("pointerup", this.openOptions);
        const el = document.getElementById("game")!;
        el.addEventListener("fullscreenchange", this.fullscreenchanged);
    }

    createBottomHud() {
        const midX = this.cameras.main.width / 2;
        const botY = this.cameras.main.height - 55;

        // Health
        let healthBackground = this.add.image(0, 0, "Carved_Rectangle_Shadow");
        healthBackground.scale = 0.75;

        let healthContainer = this.add.container(midX - 120, botY + 25);
        healthContainer.add(healthBackground);

        // Selected Icon
        let shadowIcon = this.add.image(0, 0, "Carved_Big_Shadow");
        shadowIcon.scale = 0.5;
        let leftRibbon = this.add.image(55, -20, "Blue_Left");
        leftRibbon.scale = 0.45;
        let rightRibbon = this.add.image(-55, -20, "Blue_Right");
        rightRibbon.scale = 0.45;

        let selectedContainer = this.add.container(midX, botY);
        selectedContainer.add(leftRibbon);
        selectedContainer.add(rightRibbon);
        selectedContainer.add(shadowIcon);

        // Action
        let actionBackground = this.add.image(0, 0, "Carved_Rectangle_Shadow");
        actionBackground.scale = 0.75;
        let actionContainer = this.add.container(midX + 120, botY + 25);
        actionContainer.add(actionBackground);
    }

    fullscreenchanged(e) {
        if (document.fullscreenElement) {
            console.log(`Element: ${document.fullscreenElement.id} entered fullscreen mode.`);
        } else {
            console.log("Leaving fullscreen mode.");
        }
    }

    openOptions() {
        console.log("here");
        if (document.fullscreenElement) {
            // exitFullscreen is only available on the Document object.
            document.exitFullscreen();
        } else {
            const el = document.getElementById("game")!;
            el.requestFullscreen();
        }
    }
}