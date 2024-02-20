import npc from './npc';
import Player from '../player.ts';
export default abstract class attackUnit extends npc {

    protected _attackRange: number;
    protected _damage: number;
    /**
     * @summary constructor for attacking class (must have offensive abilities)
     * @returns instance of attackUnit
     */
    public attackUnit(id?: string, owner: Player, X: number, Y: number, health: number, visionRange?: number) {
        super(id, owner, X, Y, health, visionRange);
    }
    /**
     * @summary this is the attack order, it does NOT guarantee a hit on the opponent
     * (must take into account range of unit, since archers stop order when in range by default)
     */
    protected abstract attack(attackedEntity: npc);

    /**
     * @summary attack confirmed, hit sends onHitReceived to target unit
     */
    protected abstract hit(damage: number);

}