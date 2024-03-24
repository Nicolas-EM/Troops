import ResourceSpawner from "./ResourceSpawner";;
import ResourcesData from "../../magic_numbers/resources_data";
import Game from "../../scenes/Game";

export default class GoldMine extends ResourceSpawner {

    constructor(scene: Game, x: number, y: number, texture: string | Phaser.Textures.Texture, frame?: string | number) {
        super(scene, x, y, texture, ResourcesData.GOLD_MINE_ICON_INFO, ResourcesData.GOLD_ICON, ResourcesData.GOLD_MINE_CAPACITY, ResourcesData.GOLD_MINE_RATE, frame);
    }
    
}