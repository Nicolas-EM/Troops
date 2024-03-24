import Game from '../../scenes/Game';
import Player from '../Player';
import NPC from './NPC';
import NPCsData from "../../magic_numbers/npcs_data";

export default class Villager extends NPC {
    constructor(scene: Game, x: number, y: number, texture: string | Phaser.Textures.Texture, owner: Player, frame?: string | number) {
        let iconInfo = NPCsData.VILLAGER_ICON_INFO;
        iconInfo.name += owner.getColor();
        super(scene, x, y, texture, owner, NPCsData.VILLAGER_HEALTH, NPCsData.VILLAGER_HEALTH, NPCsData.VILLAGER_SPAWNING_TIME, NPCsData.VILLAGER_SPAWNING_COST, NPCsData.VILLAGER_VISION_RANGE, NPCsData.VILLAGER_SPEED, iconInfo, frame);
    }

    getHudInfo() {
        return {
            entity: this._iconInfo,
            info: {
                health: this._health,
                totalHealth: this._totalHealth,
            },
            actions: [16, 20, 24] // TODO
        };
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