import * as Phaser from "phaser";
import NPC from "./NPC";
import AttackUnit from "./AttackUnit";
import Player from "../Player";
import Game from "../../scenes/Game";
import { Resources } from "../../utils";

// TODO: move to magic numbers
const damage = 10;
const attackRange = 5;
const visionRange = 10;
const GOBLIN_HEALTH = 100;
const GOBLIN_WIDTH = 150;
const GOBLIN_HEIGHT = 150;

export default class Goblin extends AttackUnit {
    // TODO: magic number
    static readonly COST: Resources = { wood: 10, food: 10, gold: 10 };
    static readonly SPAWN_TIME_MS: number = 10000;

    constructor(scene: Game, x: number, y: number, owner: Player, frame?: string | number) {
        super(scene, x, y, `Goblin_${owner.getColor()}`, owner, GOBLIN_HEALTH, GOBLIN_HEALTH, visionRange, { name: `Goblin_${owner.getColor()}`, width: GOBLIN_WIDTH, height: GOBLIN_HEIGHT }, attackRange, damage, frame);
    }

    protected attack(attackedEntity: NPC) {
        throw new Error("Method not implemented.");
    }
    
    protected hit(damage: number) {
        throw new Error("Method not implemented.");
    }
}