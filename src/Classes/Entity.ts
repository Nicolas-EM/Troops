
import * as Phaser from 'phaser';
import Player from './player';
export default abstract class Entity extends Phaser.GameObjects.Sprite {
    // protected attributes:
    protected _id: string;
    protected _owner: Player;
    protected _health: number;
    protected _visionRange: number;

    /**
     * @constructor
     * @param owner is the player who created the entity, not optional.
     * @returns Object
     */
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string | Phaser.Textures.Texture, owner: Player, health: number, id: string, visionRange: number, frame?: string | number) {
        super(scene, x, y, texture, frame);
        this._owner = owner;
        this._health = health;
        this._id = id || "namelessEntity";
        this._visionRange = visionRange;
        this.init();
    }

    protected init() {
        this.addEventListeners();
    }

    /**
     * @summary adds event listeners to the NPC for his generic actions (move, receive hit)
     */
    protected addEventListeners() {
        this.setInteractive();
        this.on('pointerdown', this.onEntityClicked, this);
    }

    onEntityClicked() {
        // Create a debug circle around the sprite
        const debugCircle = this.scene.add.image(this.x, this.y, "../../assets/sprites/UI/pointers/selected.png");
        debugCircle.setOrigin(0.5);
        debugCircle.setDepth(1);

        // Rest of the code...
        console.log("Entity: ", this, "has been clicked. Calling menu:");
        let testingEntities = new Array<Phaser.GameObjects.GameObject>();
        testingEntities.push(this);
        this.scene.events.emit('entityClicked', this);
    }
    /**
     * @param damage
     */
    onAttackReceived(damage: number): void {
        this._health -= damage;
    }
}