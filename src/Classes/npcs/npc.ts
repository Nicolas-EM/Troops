
import * as Phaser from 'phaser';
import Player from '../player.ts'
export default abstract class npc extends Phaser.GameObjects.Sprite {
    // protected attributes:
    protected _id: string;
    protected _owner: Player;
    protected _posX: number;
    protected _posY: number;
    protected _health: number;
    protected _visionRange: number;

    /**
     * @constructor
     * @param owner is the player who created the entity, not optional.
     * @returns NPC instance
     */
    public npc(id?: string, owner: Player, X: number, Y: number, health: number, visionRange?: number) {
        this._id = id || "namelessEntity";
        this._owner = owner;
        this._posX = X;
        this._posY = Y;
        this._health = health;
        //TODO @santi abstraer en configFile
        this._visionRange = visionRange || defaultVisionRange;
    }

    /**
     * @summary executes move order on X Y cordinates
     * @param x is X coordinate to move on board
     * @param y is Y coordinate to move on board
     */
    protected abstract move(X: number, Y: number): void;

    /**
     * @summary describes behaviour after getting hit
     */
    protected abstract onAttackReceived(damage: number): void;
}