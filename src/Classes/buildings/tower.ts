import NPC from "../npcs/NPC";
import NPCSpawner from "./NPCSpawner";

export default class Townhall extends NPCSpawner {
    spawn(): NPC {
        throw new Error("Method not implemented.");
    }
    queueNPC(npc: NPC) {
        throw new Error("Method not implemented.");
    }
}