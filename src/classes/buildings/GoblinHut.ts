import Player from "../Player";
import NPC from "../npcs/NPC";
import SpawnerBuilding from "./SpawnerBuilding";
import BuildingsData from "../../magic_numbers/buildings_data";

export default class GoblinHut extends SpawnerBuilding {

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string | Phaser.Textures.Texture, owner: Player, frame?: string | number) {
        let iconInfo = BuildingsData.HUT_ICON_INFO;
        iconInfo.name += owner.getColor();
        super(scene, x, y, texture, owner, BuildingsData.HUT_HEALTH, BuildingsData.HUT_HEALTH, BuildingsData.HUT_SPAWNING_TIME, BuildingsData.HUT_SPAWNING_COST, BuildingsData.HUT_VISION_RANGE, iconInfo, frame);
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
            actions: [4]
        }
    }

}