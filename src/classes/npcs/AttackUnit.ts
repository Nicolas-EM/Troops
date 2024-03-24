import NPC from './NPC';
import Player from '../Player';
import Game from '../../scenes/Game';
import { HudInfo, IconInfo, Resources } from '../../utils';
import Client from '../../client';

export default abstract class AttackUnit extends NPC {
    
    protected _attackRange: number;
    protected _damage: number;

    _hudInfo: HudInfo = {
        entity: this._iconInfo,
        info: {
            isMine: this._owner.getColor() === Client.getMyColor(),
            health: this._health,
            totalHealth: this._totalHealth,
        },
        actions: []
    };
    
    /**
     * @summary constructor for attacking class (must have offensive abilities)
     * @returns instance of attackUnit
     */
    constructor(scene: Game, x: number, y: number, texture: string | Phaser.Textures.Texture, owner: Player, health: number, totalHealth: number, spawningTime: number, spawningCost: Resources, visionRange: number, movementSpeed: number, iconInfo: IconInfo, attackRange: number, damage: number, frame?: string | number) {
        super(scene, x, y, texture, owner, health, totalHealth, spawningTime, spawningCost, visionRange, movementSpeed, iconInfo, frame);

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
}