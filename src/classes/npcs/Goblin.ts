import * as Phaser from "phaser";
import NPC from "./NPC";
import AttackUnit from "./AttackUnit";
import Player from "../Player";
import Game from "../../scenes/Game";
import { Resources } from "../../utils";
import NPCsData from "../../magic_numbers/npcs_data";

export default class Goblin extends AttackUnit {

    static readonly COST: Resources = NPCsData.GOBLIN_SPAWNING_COST;

    constructor(scene: Game, x: number, y: number, owner: Player, frame?: string | number) {
        let iconInfo = { ...NPCsData.GOBLIN_ICON_INFO };
        iconInfo.name += owner.getColor();
        super(scene, x, y, iconInfo.name, owner, NPCsData.GOBLIN_HEALTH, NPCsData.GOBLIN_HEALTH, NPCsData.GOBLIN_SPAWNING_TIME, NPCsData.GOBLIN_SPAWNING_COST, NPCsData.GOBLIN_VISION_RANGE, NPCsData.GOBLIN_SPEED, iconInfo, NPCsData.GOBLIN_ATTACK_RANGE, NPCsData.GOBLIN_DAMAGE, frame);
    }

    protected attack(attackedEntity: NPC) {
        throw new Error("Method not implemented.");
    }
    
    protected hit(damage: number) {
        throw new Error("Method not implemented.");
    }
}