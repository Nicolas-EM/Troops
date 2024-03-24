import Client from "../../client";
import { HudInfo, Resources } from "../../utils";
import Player from "../Player";
import SpawnerBuilding from "./SpawnerBuilding";
import BuildingsData from "../../magic_numbers/buildings_data";

export default class GoblinHut extends SpawnerBuilding {

    static readonly COST: Resources = BuildingsData.HUT_SPAWNING_COST;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string | Phaser.Textures.Texture, owner: Player, frame?: string | number) {
        let iconInfo = BuildingsData.HUT_ICON_INFO;
        iconInfo.name += owner.getColor();
        super(scene, x, y, texture, owner, BuildingsData.HUT_HEALTH, BuildingsData.HUT_HEALTH, BuildingsData.HUT_SPAWNING_TIME, BuildingsData.HUT_SPAWNING_COST, BuildingsData.HUT_VISION_RANGE, iconInfo, frame);
    }

    getHudInfo() {
        return {
            entity: this._iconInfo,
            info: {
                isMine: this._owner.getColor() === Client.getMyColor(),
                health: this._health,
                totalHealth: this._totalHealth
            },
            actions: [{run: () => {}, actionFrame: this._iconInfo.name}]
        }
    }

}