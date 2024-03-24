import Game from '../../scenes/Game';
import { HudInfo } from '../../utils';
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
            health: this._health,
            totalHealth: this._totalHealth,
        },
        actions: [{run: () => {}, id: 16}, {run: () => {}, id: 20}, {run: () => {}, id: 24}] // TODO
    };
    
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