import Game from '../../Scenes/Game';
import Player from '../Player';
import NPC from './NPC';

// TODO: Magic numbers
const visionRange = 5;
const VILLAGER_HEALTH = 100;
const VILLAGER_ICON = "Villager_Blue";
const VILLAGER_WIDTH = 200;
const VILLAGER_HEIGHT = 200;

export default class Villager extends NPC {
    constructor(scene: Game, x: number, y: number, texture: string | Phaser.Textures.Texture, owner: Player, frame?: string | number) {
        super(scene, x, y, texture, owner, VILLAGER_HEALTH, VILLAGER_HEALTH, visionRange, { name: VILLAGER_ICON, width: VILLAGER_WIDTH, height: VILLAGER_HEIGHT }, frame);
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