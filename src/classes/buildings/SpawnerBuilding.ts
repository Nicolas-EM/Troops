import NPC from "../npcs/NPC";
import Player from "../Player";
import Building from "./Building"

export default abstract class SpawnerBuilding extends Building {
    protected spawnQueue: NPC[];

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string | Phaser.Textures.Texture, owner: Player, health: number, id: string, visionRange: number, frame?: string | number) {
        super(scene, x, y, texture, owner, health, id, visionRange, frame);
    }

    abstract spawn(): NPC;
    abstract queueNPC(npc: NPC);
    
    cancelNPC() {
        this.spawnQueue.shift();
    }
};