import * as Phaser from "phaser";

export default class ResourceSpawner extends Phaser.GameObjects.Sprite {
    private _totalResources: number;
    private _remainingResrouces: number;
    private _resourceRate: number;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string | Phaser.Textures.Texture, totalResources: number, resourceRate: number, frame?: string | number) {
        super(scene, x, y, texture, frame)

        this._totalResources = totalResources;
        this._remainingResrouces = totalResources;
        this._resourceRate = resourceRate;
        this.init();
    }

    protected init() {
        this.addEventListeners();
    }

    protected addEventListeners() {
        this.setInteractive();
        this.on('pointerdown', this.onResourceClicked, this);
    }

    onResourceClicked() {
        console.log("Resource : ", this, "has been clicked. Calling menu:");
       // this.scene.events.emit('resourceClicked', this);
    }
}