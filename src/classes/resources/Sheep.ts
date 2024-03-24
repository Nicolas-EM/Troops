import ResourceSpawner from "./ResourceSpawner";
import ResourcesData from "../../magic_numbers/resources_data";
import Game from "../../scenes/Game";

export default class Sheep extends ResourceSpawner {

    constructor(scene: Game, x: number, y: number, texture: string | Phaser.Textures.Texture, frame?: string | number) {
        super(scene, x, y, texture, ResourcesData.SHEEP_ICON_INFO, ResourcesData.FOOD_ICON, ResourcesData.SHEEP_CAPACITY, ResourcesData.SHEEP_RATE, frame);
    }
    
}