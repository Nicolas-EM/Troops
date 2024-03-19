import * as Phaser from "phaser";
import { IconInfo } from "../../utils";
import Game from "../../scenes/Game";

export default class ResourceSpawner extends Phaser.GameObjects.Sprite {
    // Attributes
    private _iconInfo: IconInfo;
    private _resourceIcon: string;
    private _totalResources: number;
    private _remainingResources: number;
    private _resourceRate: number;

    // Constructor
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string | Phaser.Textures.Texture, iconInfo: IconInfo, resourceIcon: string, totalResources: number, resourceRate: number, frame?: string | number) {
        super(scene, x, y, texture, frame)

        this._iconInfo = iconInfo;
        this._resourceIcon = resourceIcon;
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
        this.on('pointerdown', () => {
            if (this.scene instanceof Game) {
                (this.scene.handleClick(this))();
            }
        })
    }

    onClick() {
        const resourceInfo = {
            entity: this._iconInfo,
            info: {
                remainingResources: this._remainingResources,
                resource: this._resourceIcon
            },
            actions: []
        };
        this.scene.events.emit('entityClicked', resourceInfo);
    }
}