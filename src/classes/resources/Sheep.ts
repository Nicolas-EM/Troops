import ResourceSpawner from "./ResourceSpawner";
import ResourcesData from "../../magic_numbers/resources_data";
import Game from "../../scenes/Game";

export default class Sheep extends ResourceSpawner {

    constructor(scene: Game, x: number, y: number, texture: string | Phaser.Textures.Texture, frame?: string | number) {
        super(scene, x, y, texture, { name: ResourcesData.SHEEP_ICON, width: ResourcesData.SHEEP_WIDTH, height: ResourcesData.SHEEP_HEIGHT }, ResourcesData.FOOD_ICON, ResourcesData.SHEEP_CAPACITY, ResourcesData.SHEEP_RATE, frame);
        
        (this.body as any).setSize(42,36);
        (this.body as any).setOffset(44,46);
    }
    
}