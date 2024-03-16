import ResourceSpawner from "./ResourceSpawner";
import ResourcesData from "../../magic_numbers/resources_data";

export default class Sheep extends ResourceSpawner {

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string | Phaser.Textures.Texture, frame?: string | number) {
        super(scene, x, y, texture, { name: ResourcesData.SHEEP_ICON, width: ResourcesData.SHEEP_WIDTH, height: ResourcesData.SHEEP_HEIGHT }, ResourcesData.FOOD_ICON, ResourcesData.SHEEP_CAPACITY, ResourcesData.SHEEP_RATE, frame);
    }
    
}