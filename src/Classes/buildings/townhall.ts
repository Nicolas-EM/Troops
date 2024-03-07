import NPC from "../NPCs/NPC";
import Player from "../Player";
import NPCSpawner from "./SpawnerBuilding";

const health = 1000;
const visionRange = 10;

export default class Townhall extends NPCSpawner {
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string | Phaser.Textures.Texture, owner: Player, frame?: string | number) {
        super(scene, x, y, texture, owner, health, visionRange, frame);

        this.scene.add.existing(this);
    }

    spawn(): NPC {
        throw new Error("Method not implemented.");
    }
    queueNPC(npc: NPC) {
        throw new Error("Method not implemented.");
    }
}