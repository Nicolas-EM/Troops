import Client from "../../client";
import { HudInfo, Resources } from "../../utils";
import Player from "../Player";
import SpawnerBuilding from "./SpawnerBuilding";

const GOBLIN_HUT_HEALTH = 100;
const GOBLIN_HUT_ICON = "Goblin_Hut_Blue";
const GOBLIN_HUT_WIDTH = 100;
const GOBLIN_HUT_HEIGHT = 100;

export default class GoblinHut extends SpawnerBuilding {
    _hudInfo: HudInfo = {
        entity: this._iconInfo,
        info: {
            isMine: this._owner.getColor() === Client.getMyColor(),
            health: this._health,
            totalHealth: this._totalHealth
        },
        actions: [{run: () => {}, actionFrame: `Goblin_${this._owner.getColor()}`}]
    };

    // TODO: magic number
    static readonly COST: Resources = { wood: 10, food: 10, gold: 10 };
    
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string | Phaser.Textures.Texture, owner: Player, visionRange: number, frame?: string | number) {
        super(scene, x, y, texture, owner, GOBLIN_HUT_HEALTH, GOBLIN_HUT_HEALTH, visionRange, { name: GOBLIN_HUT_ICON, width: GOBLIN_HUT_WIDTH, height: GOBLIN_HUT_HEIGHT }, frame);
    }
}