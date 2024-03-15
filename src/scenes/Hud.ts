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

        // Team
        let teamContainer = this.add.container(40, 40);
        let squareTeam = this.add.image(0, 0, 'Carved_Square');
        squareTeam.setDisplaySize(45, 45);
        squareTeam.texture.setFilter(Phaser.Textures.FilterMode.LINEAR);
        let king = this.add.image(0, 0, 'King_Purple');
        king.setDisplaySize(25, 25);
        king.texture.setFilter(Phaser.Textures.FilterMode.LINEAR);
        teamContainer.add(squareTeam);
        teamContainer.add(king);

        // Wood
        let woodContainer = this.add.container(120, 45);
        
        let woodBanner = this.add.nineslice(0, 0, 'Connection_Up', undefined, 450, 198, 35, 35, 0, 10);
        woodBanner.setDisplaySize(120, 53);
        woodBanner.texture.setFilter(Phaser.Textures.FilterMode.LINEAR);
        let woodIcon = this.add.image(-20, -15, 'Wood');
        woodIcon.setDisplaySize(70, 70);
        woodIcon.texture.setFilter(Phaser.Textures.FilterMode.LINEAR);
        let woodAmount = this.add.text(0, -10, '150', { color: '#000000' });
        
        woodContainer.add(woodBanner);
        woodContainer.add(woodIcon);
        woodContainer.add(woodAmount);

        // Food
        let foodContainer = this.add.container(222, 45);

        let foodBanner = this.add.nineslice(0, 0, 'Connection_Up', undefined, 450, 198, 35, 35, 0, 10);
        foodBanner.setDisplaySize(120, 53);
        foodBanner.texture.setFilter(Phaser.Textures.FilterMode.LINEAR);
        let foodIcon = this.add.image(-20, -8, 'Food');
        foodIcon.setDisplaySize(60, 60);
        foodIcon.texture.setFilter(Phaser.Textures.FilterMode.LINEAR);
        let foodAmount = this.add.text(0, -10, '230', { color: '#000000' });

        foodContainer.add(foodBanner);
        foodContainer.add(foodIcon);
        foodContainer.add(foodAmount);

        // Gold
        let goldContainer = this.add.container(324, 45);

        let goldBanner = this.add.nineslice(0, 0, 'Connection_Up', undefined, 450, 198, 35, 35, 0, 10);
        goldBanner.setDisplaySize(120, 53);
        goldBanner.texture.setFilter(Phaser.Textures.FilterMode.LINEAR);
        let goldIcon = this.add.image(-25, -8, 'Gold');
        goldIcon.setDisplaySize(60, 60);
        goldIcon.texture.setFilter(Phaser.Textures.FilterMode.LINEAR);
        let goldAmount = this.add.text(0, -10, '100', { color: '#000000' });
        
        goldContainer.add(goldBanner);
        goldContainer.add(goldIcon);
        goldContainer.add(goldAmount);

        // Population
        let soldierIcon = this.add.image(-35, 0, "Soldier_Purple");
        soldierIcon.setDisplaySize(60, 60);
        soldierIcon.texture.setFilter(Phaser.Textures.FilterMode.LINEAR);   
        let villagerIcon = this.add.image(-20, 2, "Villager_Purple");
        villagerIcon.setDisplaySize(60, 60);
        villagerIcon.texture.setFilter(Phaser.Textures.FilterMode.LINEAR);   
        let population = this.add.text(-5, -10, '42/50', { color: '#000000' });

        let populationContainer = this.add.container(midX, 45);
        let populationBanner = this.add.nineslice(0, 0, 'Connection_Up', undefined, 450, 198, 35, 35, 0, 10);
        populationBanner.setDisplaySize(170, 66);
        populationBanner.texture.setFilter(Phaser.Textures.FilterMode.LINEAR);
        populationContainer.add(populationBanner);
        populationContainer.add(soldierIcon);
        populationContainer.add(villagerIcon);
        populationContainer.add(population);

        // options button
        let optionsContainer = this.add.container(this.cameras.main.width - 55, 45);
        let settingsButton = this.add.image(0, 0, 'Yellow');
        settingsButton.setDisplaySize(55, 55);
        settingsButton.texture.setFilter(Phaser.Textures.FilterMode.LINEAR); 
        optionsContainer.add(settingsButton);
        let settingsIcon = this.add.image(0, 0, 'Settings');
        settingsIcon.setDisplaySize(55, 55);
        settingsIcon.texture.setFilter(Phaser.Textures.FilterMode.LINEAR); 
        optionsContainer.add(settingsIcon);

        settingsButton.setInteractive().on("pointerup", this.openOptions);
        const el = document.getElementById("game")!;
        el.addEventListener("fullscreenchange", this.fullscreenchanged);
    }

    createBottomHud() {
        const midX = this.cameras.main.width / 2;
        const botY = this.cameras.main.height - 55;

        // Info area
        let infoBox = this.add.image(0, 0, "Carved_Rectangle_Shadow");
        infoBox.scale = 0.95;
        
        let infoContainer = this.add.container(midX - 145, botY + 25);
        infoContainer.add(infoBox);

        // Selected Entity
        let entityBox = this.add.image(0, 0, "Carved_Big_Shadow");
        entityBox.scale = 0.55;

        let selectedContainer = this.add.container(midX, botY);
        selectedContainer.add(entityBox);
        

        let scene = this;
        let health, woodIcon, woodAmount, foodIcon, foodAmount, goldIcon, goldAmount, leftRibbon, rightRibbon, selectedEntity;

        this.events.on('entityClicked', function(resourceInfo) {
            // Clear HUD
            infoContainer.remove(health);
            infoContainer.remove(woodIcon);
            infoContainer.remove(woodAmount);
            infoContainer.remove(foodIcon);
            infoContainer.remove(foodAmount);
            infoContainer.remove(goldIcon);
            infoContainer.remove(goldAmount);
            selectedContainer.remove(leftRibbon);
            selectedContainer.remove(rightRibbon);
            selectedContainer.remove(selectedEntity);
            if (resourceInfo.type === 'Tree') {
                // Info area
                woodIcon = scene.add.image(-20, -15, 'Wood');
                woodIcon.setDisplaySize(70, 70);
                woodIcon.texture.setFilter(Phaser.Textures.FilterMode.LINEAR);
                woodAmount = scene.add.text(0, -10, resourceInfo.remainingResrouces, { color: '#000000' });
                infoContainer.add(woodIcon);
                infoContainer.add(woodAmount);
            } else if (resourceInfo.type === 'Sheep') {
                // Info area
                foodIcon = scene.add.image(-20, -15, 'Food');
                foodIcon.setDisplaySize(70, 70);
                foodIcon.texture.setFilter(Phaser.Textures.FilterMode.LINEAR);
                foodAmount = scene.add.text(0, -10, resourceInfo.remainingResrouces, { color: '#000000' });
                infoContainer.add(foodIcon);
                infoContainer.add(foodAmount);
            } else if (resourceInfo.type === 'GoldMine') {
                // Info area
                goldIcon = scene.add.image(-20, -15, 'Gold');
                goldIcon.setDisplaySize(70, 70);
                goldIcon.texture.setFilter(Phaser.Textures.FilterMode.LINEAR);
                goldAmount = scene.add.text(0, -10, resourceInfo.remainingResrouces, { color: '#000000' });
                infoContainer.add(goldIcon);
                infoContainer.add(goldAmount);
            } else {
                // Info area
                health = scene.add.image(-37, -7, 'Health', 1);
                health.setDisplaySize(80, 26);
                health.texture.setFilter(Phaser.Textures.FilterMode.LINEAR);
                infoContainer.add(health);
                // Selected Entity
                leftRibbon = scene.add.image(55, -20, "Purple_Left");
                leftRibbon.scale = 0.45;
                rightRibbon = scene.add.image(-55, -20, "Purple_Right");
                rightRibbon.scale = 0.45;
                selectedContainer.add(leftRibbon);
                selectedContainer.add(rightRibbon);
            }

            selectedEntity = scene.add.image(0, 0, `${resourceInfo.type}`);
            selectedContainer.add(selectedEntity);
        });

        // Action
        let actionContainer = this.add.container(midX + 145, botY + 25);

        let actionBox = this.add.image(0, 0, "Carved_Rectangle_Shadow");
        actionBox.scale = 0.95;
        let action1 = this.add.image(-50, 0, 'Icons', 25);
        action1.setDisplaySize(35, 35);
        action1.texture.setFilter(Phaser.Textures.FilterMode.LINEAR);
        let action2 = this.add.image(-5, 0, 'Icons', 21);
        action2.setDisplaySize(35, 35);
        action2.texture.setFilter(Phaser.Textures.FilterMode.LINEAR);
        let action3 = this.add.image(40, 0, 'Icons', 17);
        action3.setDisplaySize(35, 35);
        action3.texture.setFilter(Phaser.Textures.FilterMode.LINEAR);
        
        actionContainer.add(actionBox);
        actionContainer.add(action1);
        actionContainer.add(action2);
        actionContainer.add(action3);
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