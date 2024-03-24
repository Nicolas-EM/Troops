import Client from '../../client';
import Game from '../../scenes/Game';
import { HudInfo, Resources } from '../../utils';
import Player from '../Player';
import NPC from './NPC';

// TODO: Magic numbers
const visionRange = 5;
const VILLAGER_HEALTH = 100;
const VILLAGER_WIDTH = 200;
const VILLAGER_HEIGHT = 200;

export default class Villager extends NPC {
    _hudInfo: HudInfo = {
        entity: this._iconInfo,
        info: {
            isMine: this._owner.getColor() === Client.getMyColor(),
            health: this._health,
            totalHealth: this._totalHealth,
        },
        actions: [{run: () => {}, actionFrame: `House_${this._owner.getColor()}`}, {run: () => {}, actionFrame: `Tower_${this._owner.getColor()}`}, {run: () => {}, actionFrame: `Hut_${this._owner.getColor()}`}] // TODO: set build functions
    };

    // TODO: magic number
    static readonly COST: Resources = { wood: 10, food: 10, gold: 10 };
    
    constructor(scene: Game, x: number, y: number, owner: Player, frame?: string | number) {
        super(scene, x, y, `Villager_${owner.getColor()}`, owner, VILLAGER_HEALTH, VILLAGER_HEALTH, visionRange, { name: `Villager_${owner.getColor()}`, width: VILLAGER_WIDTH, height: VILLAGER_HEIGHT }, frame);
    }

    /**
     * @param buildingId id of the building (town hall, hut, etc...)
     * @param X x coordinate of the soon-to-be built building.
     * @param Y y coordinate of the soon-to-be built building.
     */
    buildOrder(buildingId: number,X: number, Y: number){

    }

    /**
     * @summary build order complete, spawn completed building
     * //TODO
     */
    build(){

    }
    
    gather(){

    }
}