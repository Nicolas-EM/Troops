import Client from '../../client';
import Game from '../../scenes/Game';
import { HudInfo, Resources } from '../../utils';
import Player from '../Player';
import NPC from './NPC';
import NPCsData from "../../magic_numbers/npcs_data";

export default class Villager extends NPC {
    static readonly COST: Resources = NPCsData.VILLAGER_SPAWNING_COST;
    static readonly SPAWN_TIME_MS: number = NPCsData.VILLAGER_SPAWNING_TIME;

    constructor(scene: Game, x: number, y: number, texture: string | Phaser.Textures.Texture, owner: Player, frame?: string | number) {
        let iconInfo = NPCsData.VILLAGER_ICON_INFO;
        iconInfo.name += owner.getColor();
        super(scene, x, y, texture, owner, NPCsData.VILLAGER_HEALTH, NPCsData.VILLAGER_HEALTH, NPCsData.VILLAGER_SPAWNING_TIME, NPCsData.VILLAGER_SPAWNING_COST, NPCsData.VILLAGER_VISION_RANGE, NPCsData.VILLAGER_SPEED, iconInfo, frame);
    }

    _hudInfo: HudInfo = {
        entity: this._iconInfo,
        info: {
            isMine: this._owner.getColor() === Client.getMyColor(),
            health: this._health,
            totalHealth: this._totalHealth,
        },
        actions: [{run: () => {}, actionFrame: `House_${this._owner.getColor()}`}, {run: () => {}, actionFrame: `Tower_${this._owner.getColor()}`}, {run: () => {}, actionFrame: `Hut_${this._owner.getColor()}`}] // TODO: set build functions
    };

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