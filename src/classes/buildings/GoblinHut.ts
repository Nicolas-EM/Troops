import Player from "../Player";
import NPC from "../NPCs/NPC";
import SpawnerBuilding from "./SpawnerBuilding";

const GOBLIN_HUT_HEALTH = 100;
const GOBLIN_HUT_ICON = "Goblin_Hut_Blue";
const GOBLIN_HUT_WIDTH = 100;
const GOBLIN_HUT_HEIGHT = 100;

export default class GoblinHut extends SpawnerBuilding {
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string | Phaser.Textures.Texture, owner: Player, visionRange: number, frame?: string | number) {
        super(scene, x, y, texture, owner, GOBLIN_HUT_HEALTH, GOBLIN_HUT_HEALTH, visionRange, { name: GOBLIN_HUT_ICON, width: GOBLIN_HUT_WIDTH, height: GOBLIN_HUT_HEIGHT }, frame);
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