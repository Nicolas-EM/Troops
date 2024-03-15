
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
    protected _isSelected: boolean;
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
        //testing
     //   this._navMesh = (<any>this.scene)._map.navmesh;
        console.log("entity navmesh: ", this._navMesh);
        // Enable arcade physics for moving with velocity
        this.scene.physics.world.enable(this);
        this.Interactive();
        this.scene.events.on("rightClick", this.onMapRightClick, this);
    }

    /**
     * @param damage
     */
    onAttackReceived(damage: number): void {
        this._health -= damage;
    }

    onEntityClicked(pointer: Phaser.Input.Pointer): void {
        if (pointer.leftButtonDown()) {
            console.log("Entity clicked");
            this._isSelected = true;
        }
    }

    Interactive(): this {
        super.setInteractive();
        this.on('pointerdown', this.onEntityClicked, this);
        return this;
    }

    goTo(targetPoint: Phaser.Math.Vector2, navMesh): void {
        // Find a path to the target
        this._path = navMesh.findPath(new Phaser.Math.Vector2(this.x, this.y), targetPoint);
        console.log("Path found: ", this._path);
        if (this._path && this._path.length > 0) this._currentTarget = this._path.shift();
        else this._currentTarget = null;
    }

    update(time: number, deltaTime: number) {
        if (!this.body) return;
        // this.body.velocity.set(0);

        if (this._currentTarget) {
            const { x, y } = this._currentTarget;
            const distance = Phaser.Math.Distance.Between(this.x, this.y, x, y);

            if (distance < 5) {
                if (this._path.length > 0) this._currentTarget = this._path.shift();
                else this._currentTarget = null;
            }
            let speed = 400;
            if (this._path.length === 0 && distance < 50) {
                // speed = map(distance, 50, 0, 400, 50);
            }
            if (this._currentTarget) this.moveTowards(this._currentTarget, speed, deltaTime / 1000);
        }
    }

    onMapRightClick(pointer, navMesh): void {
        if (this._isSelected) {
            console.log("Right click on map, entity selected. going....");
            this.goTo(pointer,navMesh);
        }
    }
    

    moveTowards(targetPosition: Phaser.Math.Vector2, maxSpeed = 200, elapsedSeconds: number) {
        const { x, y } = targetPosition;
        const angle = Phaser.Math.Angle.Between(this.x, this.y, x, y);
        const distance = Phaser.Math.Distance.Between(this.x, this.y, x, y);
        const targetSpeed = distance / elapsedSeconds;
        const magnitude = Math.min(maxSpeed, targetSpeed);

        // this.scene.physics.velocityFromRotation(angle, magnitude, this.body.velocity);
        this.rotation = angle;
    }

    destroy() {
        if (this.scene) this.scene.events.off("update", this.update, this);
        super.destroy();
    }
}