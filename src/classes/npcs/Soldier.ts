import * as Phaser from "phaser";
import AttackUnit from "./AttackUnit";
import Player from "../Player";
import NPC from "./NPC";
import Game from "../../scenes/Game";

// TODO: move to magic numbers
const damage = 10;
const attackRange = 5;
const visionRange = 10;
const SOLDIER_HEALTH = 100;
const SOLDIER_ICON = "Soldier_Blue";
const SOLDIER_WIDTH = 100;
const SOLDIER_HEIGHT = 100;

export default class Soldier extends AttackUnit {
    constructor(scene: Game, x: number, y: number, texture: string | Phaser.Textures.Texture, owner: Player, frame?: string | number) {
        super(scene, x, y, texture, owner, SOLDIER_HEALTH, SOLDIER_HEALTH, visionRange, { name: SOLDIER_ICON, width: SOLDIER_WIDTH, height: SOLDIER_HEIGHT }, attackRange, damage, frame);
    }

    protected attack(attackedEntity: NPC) {
        throw new Error("Method not implemented.");
    }
    protected hit(damage: number) {
        throw new Error("Method not implemented.");
    }
}