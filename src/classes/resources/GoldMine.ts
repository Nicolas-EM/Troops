import ResourceSpawner from "./ResourceSpawner";;
import ResourcesData from "../../magic_numbers/resources_data";
import Game from "../../Scenes/Game";

export default class GoldMine extends ResourceSpawner {

    constructor(scene: Game, x: number, y: number, texture: string | Phaser.Textures.Texture, frame?: string | number) {
        super(scene, x, y, texture, { name: ResourcesData.GOLD_MINE_ICON, width: ResourcesData.GOLD_MINE_WIDTH, height: ResourcesData.GOLD_MINE_HEIGHT }, ResourcesData.GOLD_ICON, ResourcesData.GOLD_MINE_CAPACITY, ResourcesData.GOLD_MINE_RATE, frame);
    }
    
}