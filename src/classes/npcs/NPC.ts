import * as Phaser from 'phaser';
import Player from '../Player'
import PlayerEntity from '../PlayerEntity';
import Game from '../../scenes/Game';
import { PhaserNavMesh } from "phaser-navMesh";
import { IconInfo } from '../../utils';

export default abstract class NPC extends PlayerEntity {
    // protected attributes:
    protected _id: string;
    protected _owner: Player;
    protected _health: number;
    protected _visionRange: number;
    protected _movementSpeed: number = 1;   // TODO: Cada NPC debería tener su propia velocidad
    protected _status: string;
    protected _actionClick : string //no tocar, testing.
    /**
     * @constructor
     * @param owner is the player who created the entity, not optional.
     * @returns NPC instance
     */
    constructor(scene: Game, x: number, y: number, texture: string | Phaser.Textures.Texture, owner: Player, health: number, totalHealth: number, visionRange: number, iconInfo: IconInfo, frame?: string | number) {
        super(scene, x, y, texture, owner, health, totalHealth, visionRange, iconInfo, frame);
        this.scene.events.on("update", this.update, this);
    }

    setTarget(targetPoint: Phaser.Math.Vector2, navMesh: PhaserNavMesh, options? : any): void {
        // console.log("setting target");
        if(options)this._actionClick = options;
        // Find a path to the target
        const offset = 35;
        const newTargetPoint = new Phaser.Math.Vector2(targetPoint.x - offset, targetPoint.y - offset);
        this._path = navMesh.findPath(new Phaser.Math.Vector2(this.x, this.y), newTargetPoint);
        if (this._path && this._path.length > 0) {
            this._currentTarget = this._path.shift();
        }
        else this._currentTarget = null;
    }

    moveToTarget(elapsedSeconds: number) {
        const { x, y } = this._currentTarget;
        const angle = Phaser.Math.Angle.Between(this.x, this.y, x, y);
        const distance = Phaser.Math.Distance.Between(this.x, this.y, x, y);
        const targetSpeed = distance / elapsedSeconds;
        const magnitude = Math.min(this._movementSpeed, targetSpeed);

        const velocityX = Math.cos(angle) * magnitude;
        const velocityY = Math.sin(angle) * magnitude;

        this.x += velocityX;
        this.y += velocityY;
    }

    update(time: number, deltaTime: number) {
        if (!this.body) return;
        this.calculateCurrentStatus();
        // this.body.velocity.set(0);
        if (this._currentTarget) {
            const { x, y } = this._currentTarget;
            const distance = Phaser.Math.Distance.Between(this.x, this.y, x, y);

            if (distance < 5) {
                if (this._path.length > 0) this._currentTarget = this._path.shift();
                else this._currentTarget = null;
            }
            if (this._path.length === 0 && distance < 50) {
                // speed = map(distance, 50, 0, 400, 50);
            }
            if (this._currentTarget) this.moveToTarget(deltaTime / 1000);
        }
    }

    protected abstract calculateCurrentStatus(): void;

    protected setStatus(status: string): void {
        this._status = status;
    }
}