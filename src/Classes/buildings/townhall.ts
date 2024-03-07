import NPC from "../npcs/NPC";
import Player from "../Player";
import SpawnerBuilding from "./SpawnerBuilding";

export default class TownHall extends SpawnerBuilding {
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string | Phaser.Textures.Texture, owner: Player, health: number, visionRange: number, frame?: string | number) {
        super(scene, x, y, texture, owner, health, visionRange, frame);
    }

    spawn(): NPC {
        throw new Error("Method not implemented.");
    }
    queueNPC(npc: NPC) {
        throw new Error("Method not implemented.");
    }
}