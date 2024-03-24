import * as Phaser from "phaser";
import NPC from "./NPC";
import AttackUnit from "./AttackUnit";
import Player from "../Player";
import Game from "../../scenes/Game";
import { Resources } from "../../utils";
import NPCsData from "../../magic_numbers/npcs_data";

export default class Archer extends AttackUnit {

    static readonly COST: Resources = NPCsData.ARCHER_SPAWNING_COST;

    constructor(scene: Game, x: number, y: number, texture: string | Phaser.Textures.Texture, owner: Player, frame?: string | number) {
        let iconInfo = NPCsData.ARCHER_ICON_INFO;
        iconInfo.name += owner.getColor();
        super(scene, x, y, texture, owner, NPCsData.ARCHER_HEALTH, NPCsData.ARCHER_HEALTH, NPCsData.ARCHER_SPAWNING_TIME, NPCsData.ARCHER_SPAWNING_COST, NPCsData.ARCHER_VISION_RANGE, NPCsData.ARCHER_SPEED, iconInfo, NPCsData.ARCHER_ATTACK_RANGE, NPCsData.ARCHER_DAMAGE, frame);
    }

    protected attack(attackedEntity: NPC) {
        throw new Error("Method not implemented.");
    }
    
    protected hit(damage: number) {
        throw new Error("Method not implemented.");
    }

}