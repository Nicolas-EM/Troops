
import * as Phaser from 'phaser';
import Player from './player';

export default abstract class Entity extends Phaser.GameObjects.Sprite {
    // protected attributes:
    protected _owner: Player;
    protected _health: number;
    protected _visionRange: number;

    /**
     * @constructor
     * @param owner is the player who created the entity, not optional.
     * @returns Object
     */
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string | Phaser.Textures.Texture, owner: Player, health: number, visionRange: number, frame?: string | number) {
        super(scene, x, y, texture, frame);
        this._owner = owner;
        this._health = health;
        this._visionRange = visionRange;
    }
    
    /**
     * @param damage
     */
    onAttackReceived(damage: number): void {
        this._health -= damage;
    }
}