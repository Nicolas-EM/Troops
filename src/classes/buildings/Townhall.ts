import Game from "../../scenes/Game";
import NPC from "../npcs/NPC";
import Player from "../Player";
import NPCSpawner from "./SpawnerBuilding";
import BuildingsData from "../../magic_numbers/buildings_data";


export default class Townhall extends NPCSpawner {
    
    constructor(scene: Game, x: number, y: number, texture: string | Phaser.Textures.Texture, owner: Player, frame?: string | number) {
        let iconInfo = BuildingsData.TOWNHALL_ICON_INFO;
        iconInfo.name += owner.getColor();
        super(scene, x, y, texture, owner, BuildingsData.TOWNHALL_HEALTH, BuildingsData.TOWNHALL_HEALTH, null, null, BuildingsData.TOWNHALL_VISION_RANGE, iconInfo, frame);
    }

    spawn(): NPC {
        throw new Error("Method not implemented.");
    }

    queueNPC(npc: NPC) {
        throw new Error("Method not implemented.");
    }

    getHudInfo() {
        return {
            entity: this._iconInfo,
            info: {
                health: this._health,
                totalHealth: this._totalHealth
            },
            actions: [12]
        };
    }
    
}