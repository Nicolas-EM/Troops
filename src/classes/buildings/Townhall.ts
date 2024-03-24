import Game from "../../scenes/Game";
import { HudInfo } from "../../utils";
import Villager from "../npcs/Villager";
import Player from "../Player";
import NPCSpawner from "./SpawnerBuilding";

const TOWN_HALL_HEALTH = 100;
const TOWN_HALL_ICON = "Townhall_Blue";
const TOWN_HALL_WIDTH = 75;
const TOWN_HALL_HEIGHT = 65;
const visionRange = 10;

export default class Townhall extends NPCSpawner {
    _hudInfo: HudInfo = {
        entity: this._iconInfo,
        info: {
            health: this._health,
            totalHealth: this._totalHealth
        },
        actions: [{run: () => this.queueNPC(Villager), id: 12}]
    };
    
    constructor(scene: Game, x: number, y: number, texture: string | Phaser.Textures.Texture, owner: Player, frame?: string | number) {
        super(scene, x, y, texture, owner, TOWN_HALL_HEALTH, TOWN_HALL_HEALTH, visionRange, { name: TOWN_HALL_ICON, width: TOWN_HALL_WIDTH, height: TOWN_HALL_HEIGHT }, frame);
    }
}