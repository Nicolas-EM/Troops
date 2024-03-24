import Client from "../../client";
import Game from "../../scenes/Game";
import { HudInfo } from "../../utils";
import Villager from "../npcs/Villager";
import Player from "../Player";
import NPCSpawner from "./SpawnerBuilding";

const TOWN_HALL_HEALTH = 100;
const TOWN_HALL_WIDTH = 75;
const TOWN_HALL_HEIGHT = 65;
const visionRange = 10;

export default class Townhall extends NPCSpawner {
    _hudInfo: HudInfo = {
        entity: this._iconInfo,
        info: {
            isMine: this._owner.getColor() === Client.getMyColor(),
            health: this._health,
            totalHealth: this._totalHealth
        },
        actions: [{run: () => this.queueNPC(Villager), actionFrame: `Villager_${this._owner.getColor()}`}]
    };
    
    constructor(scene: Game, x: number, y: number, texture: string | Phaser.Textures.Texture, owner: Player, frame?: string | number) {
        super(scene, x, y, texture, owner, TOWN_HALL_HEALTH, TOWN_HALL_HEALTH, visionRange, { name: `Townhall_${owner.getColor()}`, width: TOWN_HALL_WIDTH, height: TOWN_HALL_HEIGHT }, frame);
    }
}