import Player from "../Player";
import Building from "./Building";

const VILLAGER_HOUSE_HEALTH = 100;
const VILLAGER_HOUSE_ICON = "Townhall_Blue";
const VILLAGER_HOUSE_WIDTH = 100;
const VILLAGER_HOUSE_HEIGHT = 100;

export default class VillagerHouse extends Building {
    
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string | Phaser.Textures.Texture, owner: Player, visionRange: number, frame?: string | number) {
        super(scene, x, y, texture, owner, VILLAGER_HOUSE_HEALTH, VILLAGER_HOUSE_HEALTH, visionRange, { name: VILLAGER_HOUSE_ICON, width: VILLAGER_HOUSE_WIDTH, height: VILLAGER_HOUSE_HEIGHT }, frame);
    }

    onClick() {
        const villagerHouseInfo = {
            entity: this._iconInfo,
            info: {
                health: this._health,
                totalHealth: this._totalHealth
            },
            actions: []
        };
        this.scene.events.emit('entityClicked', villagerHouseInfo);
    }

}