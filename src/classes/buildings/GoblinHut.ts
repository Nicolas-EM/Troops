import Client from "../../client";
import { HudInfo, Resources } from "../../utils";
import Player from "../Player";
import Goblin from "../npcs/Goblin";
import SpawnerBuilding from "./SpawnerBuilding";

const GOBLIN_HUT_HEALTH = 100;
const GOBLIN_HUT_WIDTH = 55;
const GOBLIN_HUT_HEIGHT = 85;
const GOBLIN_HUT_VISION = 10;

export default class GoblinHut extends SpawnerBuilding {
    _hudInfo: HudInfo = {
        entity: this._iconInfo,
        info: {
            isMine: this._owner.getColor() === Client.getMyColor(),
            health: this._health,
            totalHealth: this._totalHealth
        },
        actions: [{run: () => this.queueNPC(Goblin), actionFrame: `Goblin_${this._owner.getColor()}`}]
    };

    // TODO: magic number
    static readonly COST: Resources = { wood: 10, food: 10, gold: 10 };
    
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string | Phaser.Textures.Texture, owner: Player, frame?: string | number) {
        super(scene, x, y, texture, owner, GOBLIN_HUT_HEALTH, GOBLIN_HUT_HEALTH, GOBLIN_HUT_VISION, { name: `Hut_${owner.getColor()}`, width: GOBLIN_HUT_WIDTH, height: GOBLIN_HUT_HEIGHT }, frame);
    }
}