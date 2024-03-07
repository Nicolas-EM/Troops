import NPC from './NPC.ts';
import Player from '../player.ts';

export default abstract class AttackUnit extends NPC {
    protected _attackRange: number;
    protected _damage: number;
    
    /**
     * @summary constructor for attacking class (must have offensive abilities)
     * @returns instance of attackUnit
     */
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string | Phaser.Textures.Texture, owner: Player, health: number, id: string, visionRange: number, attackRange: number, damage: number, frame?: string | number) {
        super(scene, x, y, texture, owner, health, id, visionRange, frame);

        this._attackRange = attackRange;
        this._damage = damage;
    }

    /**
     * @summary this is the attack order, it does NOT guarantee a hit on the opponent
     * (must take into account range of unit, since archers stop order when in range by default)
     */
    protected abstract attack(attackedEntity: NPC);

    /**
     * @summary attack confirmed, hit sends onHitReceived to target unit
     */
    protected abstract hit(damage: number);
}