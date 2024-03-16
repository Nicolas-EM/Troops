import * as Phaser from "phaser";
import { IconInfo } from "../../utils";

 export default class ResourceSpawner extends Phaser.GameObjects.Sprite {
    // Attributes
    private _iconInfo: IconInfo;
    private _resourceIconInfo: IconInfo;
    private _totalResources: number;
    private _remainingResources: number;
    private _resourceRate: number;

    // Constructor
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string | Phaser.Textures.Texture, iconInfo: IconInfo, resourceIconInfo: IconInfo, totalResources: number, resourceRate: number, frame?: string | number) {
        super(scene, x, y, texture, frame)

        this._iconInfo = iconInfo;
        this._resourceIconInfo = resourceIconInfo;
        this._totalResources = totalResources;
        this._remainingResources = totalResources;
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
        console.log("Resource : ", this, "has been clicked. Calling menu");
        const resourceInfo = {
            entity: this._iconInfo,
            info: {
                remainingResources: this._remainingResources,
                resource: this._resourceIconInfo
            },
            actions: []
        };
        this.scene.events.emit('entityClicked', resourceInfo);
    }
}