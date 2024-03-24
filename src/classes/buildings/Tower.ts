import Client from "../../client";
import { HudInfo, Resources } from "../../utils";
import Player from "../Player";
import Archer from "../npcs/Archer";
import Soldier from "../npcs/Soldier";
import SpawnerBuilding from "./SpawnerBuilding";
import BuildingsData from "../../magic_numbers/buildings_data";

export default class TownHall extends SpawnerBuilding {

    static readonly COST: Resources = BuildingsData.TOWER_SPAWNING_COST;

    constructor(scene: Phaser.Scene, x: number, y: number, owner: Player, frame?: string | number) {
        let iconInfo = { ...BuildingsData.TOWER_ICON_INFO };
        iconInfo.name += owner.getColor();
        super(scene, x, y, iconInfo.name, owner, BuildingsData.TOWER_HEALTH, BuildingsData.TOWER_HEALTH, BuildingsData.TOWER_SPAWNING_TIME, BuildingsData.TOWER_SPAWNING_COST, BuildingsData.TOWER_VISION_RANGE, iconInfo, frame);
    }

    _hudInfo: HudInfo = {
        entity: this._iconInfo,
        info: {
            isMine: this._owner.getColor() === Client.getMyColor(),
            health: this._health,
            totalHealth: this._totalHealth
        },
        actions: [{run: () => this.queueNPC(Soldier), actionFrame: `Soldier_${this._owner.getColor()}`}, {run: () => this.queueNPC(Archer), actionFrame: `Archer_${this._owner.getColor()}`}]
    }

}