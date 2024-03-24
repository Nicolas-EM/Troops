import * as Phaser from "phaser";
import AttackUnit from "./AttackUnit";
import Player from "../Player";
import NPC from "./NPC";
import Game from "../../scenes/Game";
import { Resources } from "../../utils";
import NPCsData from "../../magic_numbers/npcs_data";

export default class Soldier extends AttackUnit {

    static readonly COST: Resources = NPCsData.SOLDIER_SPAWNING_COST;

    constructor(scene: Game, x: number, y: number, texture: string | Phaser.Textures.Texture, owner: Player, frame?: string | number) {
        let iconInfo = NPCsData.SOLDIER_ICON_INFO;
        iconInfo.name += owner.getColor();
        super(scene, x, y, texture, owner, NPCsData.SOLDIER_HEALTH, NPCsData.SOLDIER_HEALTH, NPCsData.SOLDIER_SPAWNING_TIME, NPCsData.SOLDIER_SPAWNING_COST, NPCsData.SOLDIER_VISION_RANGE, NPCsData.SOLDIER_SPEED, iconInfo, NPCsData.SOLDIER_ATTACK_RANGE, NPCsData.SOLDIER_DAMAGE, frame);
    }

    protected attack(attackedEntity: NPC) {
        throw new Error("Method not implemented.");
    }
    
    protected hit(damage: number) {
        throw new Error("Method not implemented.");
    }

}