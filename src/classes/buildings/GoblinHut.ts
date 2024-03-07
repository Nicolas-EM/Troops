import NPC from "../NPCs/NPC";
import SpawnerBuilding from "./SpawnerBuilding";

export default class GoblinHut extends SpawnerBuilding {
    spawn(): NPC {
        throw new Error("Method not implemented.");
    }
    queueNPC(npc: NPC) {
        throw new Error("Method not implemented.");
    }
}