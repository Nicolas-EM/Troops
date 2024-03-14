
import * as Phaser from 'phaser';
import Player from './Player';

export default abstract class PlayerEntity extends Phaser.GameObjects.Sprite {
    // protected attributes:
    protected _owner: Player;
    protected _health: number;
    protected _visionRange: number;
    protected _path;
    protected _navMesh;
    protected _currentTarget;
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

    goTo(targetPoint: Phaser.Math.Vector2): void {
        // Find a path to the target
        this._path = this._navMesh.findPath(new Phaser.Math.Vector2(this.x, this.y), targetPoint);
    
        // If there is a valid path, grab the first point from the path and set it as the target
        if (this._path && this._path.length > 0) this._currentTarget = this._path.shift();
        else this._currentTarget = null;
    }
}