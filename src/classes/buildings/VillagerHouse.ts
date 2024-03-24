import Player from "../Player";
import Building from "./Building";
import BuildingsData from "../../magic_numbers/buildings_data";

export default class VillagerHouse extends Building {
    
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string | Phaser.Textures.Texture, owner: Player, frame?: string | number) {
        let iconInfo = BuildingsData.VILLAGER_HOUSE_ICON_INFO;
        iconInfo.name += owner.getColor();
        super(scene, x, y, texture, owner, BuildingsData.VILLAGER_HOUSE_HEALTH, BuildingsData.VILLAGER_HOUSE_HEALTH, BuildingsData.VILLAGER_HOUSE_SPAWNING_TIME, BuildingsData.VILLAGER_HOUSE_SPAWNING_COST, BuildingsData.VILLAGER_HOUSE_VISION_RANGE, iconInfo, frame);
    }
   
    getHudInfo() {
        return {
            entity: this._iconInfo,
            info: {
                health: this._health,
                totalHealth: this._totalHealth
            },
            actions: []
        };
    }

}