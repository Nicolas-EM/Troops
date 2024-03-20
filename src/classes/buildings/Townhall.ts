import Game from "../../scenes/Game";
import NPC from "../npcs/NPC";
import Player from "../Player";
import NPCSpawner from "./SpawnerBuilding";

const TOWN_HALL_HEALTH = 100;
const TOWN_HALL_ICON = "Townhall_Blue";
const TOWN_HALL_WIDTH = 75;
const TOWN_HALL_HEIGHT = 65;
const visionRange = 10;

export default class Townhall extends NPCSpawner {
    
    constructor(scene: Game, x: number, y: number, texture: string | Phaser.Textures.Texture, owner: Player, frame?: string | number) {
        super(scene, x, y, texture, owner, TOWN_HALL_HEALTH, TOWN_HALL_HEALTH, visionRange, { name: TOWN_HALL_ICON, width: TOWN_HALL_WIDTH, height: TOWN_HALL_HEIGHT }, frame);
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