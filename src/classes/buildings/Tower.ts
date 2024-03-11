import NPC from "../npcs/NPC";
import SpawnerBuilding from "./SpawnerBuilding";

export default class TownHall extends SpawnerBuilding {
    spawn(): NPC {
        throw new Error("Method not implemented.");
    }
    queueNPC(npc: NPC) {
        throw new Error("Method not implemented.");
    }
}