import Client from "../../client";
import { HudInfo } from "../../utils";
import Player from "../Player";
import Archer from "../npcs/Archer";
import Soldier from "../npcs/Soldier";
import SpawnerBuilding from "./SpawnerBuilding";

const TOWER_HEALTH = 100;
const TOWER_ICON = "Tower_Blue";
const TOWER_WIDTH = 100;
const TOWER_HEIGHT = 100;

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

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string | Phaser.Textures.Texture, owner: Player, visionRange: number, frame?: string | number) {
        super(scene, x, y, texture, owner, TOWER_HEALTH, TOWER_HEALTH, visionRange, { name: TOWER_ICON, width: TOWER_WIDTH, height: TOWER_HEIGHT }, frame);
    }
}