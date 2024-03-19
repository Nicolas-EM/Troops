import Player from "../Player";
import NPC from "../npcs/NPC";
import SpawnerBuilding from "./SpawnerBuilding";

const TOWER_HEALTH = 100;
const TOWER_ICON = "Tower_Blue";
const TOWER_WIDTH = 100;
const TOWER_HEIGHT = 100;

export default class TownHall extends SpawnerBuilding {

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string | Phaser.Textures.Texture, owner: Player, visionRange: number, frame?: string | number) {
        super(scene, x, y, texture, owner, TOWER_HEALTH, TOWER_HEALTH, visionRange, { name: TOWER_ICON, width: TOWER_WIDTH, height: TOWER_HEIGHT }, frame);
    }

    spawn(): NPC {
        throw new Error("Method not implemented.");
    }
    queueNPC(npc: NPC) {
        throw new Error("Method not implemented.");
    }

    onClick() {
        const towerInfo = {
            entity: this._iconInfo,
            info: {
                health: this._health,
                totalHealth: this._totalHealth
            },
            actions: [0, 8]
        };
        this.scene.events.emit('entityClicked', towerInfo);
    }

}