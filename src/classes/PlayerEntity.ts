
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
        // Enable arcade physics for moving with velocity
        this.scene.physics.world.enable(this);
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
        if (this._path && this._path.length > 0) this._currentTarget = this._path.shift();
        else this._currentTarget = null;
    }

    update(time: number, deltaTime: number) {
        if (!this.body) return;
        this.body.velocity.set(0);

        if (this._currentTarget) {
            const { x, y } = this._currentTarget;
            const distance = Phaser.Math.Distance.Between(this.x, this.y, x, y);

            if (distance < 5) {
                if (this._path.length > 0) this._currentTarget = this._path.shift();
                else this._currentTarget = null;
            }
            let speed = 400;
            if (this._path.length === 0 && distance < 50) {
                speed = map(distance, 50, 0, 400, 50);
            }
            if (this._currentTarget) this.moveTowards(this._currentTarget, speed, deltaTime / 1000);
        }
    }

    moveTowards(targetPosition: Phaser.Math.Vector2, maxSpeed = 200, elapsedSeconds: number) {
        const { x, y } = targetPosition;
        const angle = Phaser.Math.Angle.Between(this.x, this.y, x, y);
        const distance = Phaser.Math.Distance.Between(this.x, this.y, x, y);
        const targetSpeed = distance / elapsedSeconds;
        const magnitude = Math.min(maxSpeed, targetSpeed);

        this.scene.physics.velocityFromRotation(angle, magnitude, this.body.velocity);
        this.rotation = angle;
    }

    destroy() {
        if (this.scene) this.scene.events.off("update", this.update, this);
        super.destroy();
    }
}
}