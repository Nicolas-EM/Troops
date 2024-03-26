import Client from "../../client";
import { HudInfo, Resources } from "../../utils";
import Player from "../Player";
import Archer from "../npcs/Archer";
import Soldier from "../npcs/Soldier";
import SpawnerBuilding from "./SpawnerBuilding";

const TOWER_HEALTH = 100;
const TOWER_WIDTH = 55;
const TOWER_HEIGHT = 110;
const TOWER_VISION = 10;

export default class TownHall extends SpawnerBuilding {
    _hudInfo: HudInfo = {
        entity: this._iconInfo,
        info: {
            isMine: this._owner.getColor() === Client.getMyColor(),
            health: this._health,
            totalHealth: this._totalHealth
        },
        actions: [{run: () => this.queueNPC(Soldier), actionFrame: `Soldier_${this._owner.getColor()}`}, {run: () => this.queueNPC(Archer), actionFrame: `Archer_${this._owner.getColor()}`}]
    }

    // TODO: magic number
    static readonly COST: Resources = { wood: 10, food: 10, gold: 10 };

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string | Phaser.Textures.Texture, owner: Player, frame?: string | number) {
        super(scene, x, y, texture, owner, TOWER_HEALTH, TOWER_HEALTH, TOWER_VISION, { name: `Tower_${owner.getColor()}`, width: TOWER_WIDTH, height: TOWER_HEIGHT }, frame);
    }
}