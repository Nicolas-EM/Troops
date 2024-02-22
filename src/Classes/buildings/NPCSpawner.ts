import NPC from "../NPCs/NPC";
import Building from "./Building"

export default abstract class NPCSpawner extends Building {
    protected spawnQueue: NPC[];

    abstract spawn(): NPC;
    abstract queueNPC(npc: NPC);
    
    cancelNPC() {
        this.spawnQueue.shift();
    }
};