import NPC from './NPC';
import Player from '../Player';
import Game from '../../scenes/Game';
import { IconInfo } from '../../utils';

export default abstract class AttackUnit extends NPC {
    protected _attackRange: number;
    protected _damage: number;
    
    /**
     * @summary constructor for attacking class (must have offensive abilities)
     * @returns instance of attackUnit
     */
    constructor(scene: Game, x: number, y: number, texture: string | Phaser.Textures.Texture, owner: Player, health: number, totalHealth: number, visionRange: number, iconInfo: IconInfo, attackRange: number, damage: number, frame?: string | number) {
        super(scene, x, y, texture, owner, health, totalHealth, visionRange, iconInfo, frame);

        this._attackRange = attackRange;
        this._damage = damage;
    }

    onClick() {
        const attackUnitInfo = {
            entity: this._iconInfo,
            info: {
                health: this._health,
                totalHealth: this._totalHealth,
                damage: this._damage
            },
            actions: []
        };
        this.scene.events.emit('entityClicked', attackUnitInfo);
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

    getHudInfo() {
        throw new Error("Method not implemented.");
    }
}