
import * as Phaser from 'phaser';
import Player from './Player';
import Game from '../scenes/Game';
import { IconInfo } from '../utils';

export default abstract class PlayerEntity extends Phaser.GameObjects.Sprite {
    // protected attributes:
    protected _owner: Player;
    protected _health: number;
    protected _totalHealth: number;
    protected _visionRange: number;
    protected _iconInfo: IconInfo

    /**
     * @constructor
     * @param owner is the player who created the entity, not optional.
     * @returns Object
     */
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string | Phaser.Textures.Texture, owner: Player, health: number, totalHealth: number, visionRange: number, iconInfo: IconInfo, frame?: string | number) {
        super(scene, x, y, texture, frame);
        this._owner = owner;
        this._health = health;
        this._totalHealth = totalHealth;
        this._visionRange = visionRange;
        this._iconInfo = iconInfo;
        this.init();
    }

    protected init() {
        this.addEventListeners();
    }
    
    protected addEventListeners() {
        this.setInteractive();
        this.on('pointerdown', () => {
            if (this.scene instanceof Game) {
                (this.scene.handleClick(this))();
            }
        })
    }    

    abstract onClick(): void;

    /**
     * @param damage
     */
    onAttackReceived(damage: number): void {
        this._health -= damage;
    }

    
}