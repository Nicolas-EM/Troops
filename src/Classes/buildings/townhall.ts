import NPC from "../npcs/NPC";
import Player from "../Player";
import NPCSpawner from "./SpawnerBuilding";

export default class Townhall extends NPCSpawner {
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string | Phaser.Textures.Texture, owner: Player, health: number, id: string, visionRange: number, frame?: string | number) {
        super(scene, x, y, texture, owner, health, id, visionRange, frame);
    }

    spawn(): NPC {
        throw new Error("Method not implemented.");
    }
    queueNPC(npc: NPC) {
        throw new Error("Method not implemented.");
    }
}