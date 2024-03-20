import ResourceSpawner from "./ResourceSpawner";
import ResourcesData from "../../magic_numbers/resources_data";
import Game from "../../scenes/Game";

export default class Tree extends ResourceSpawner {

    constructor(scene: Game, x: number, y: number, texture: string | Phaser.Textures.Texture, frame?: string | number) {
        super(scene, x, y, texture, { name: ResourcesData.TREE_ICON, width: ResourcesData.TREE_WIDTH, height: ResourcesData.TREE_HEIGHT }, ResourcesData.WOOD_ICON, ResourcesData.TREE_CAPACITY, ResourcesData.TREE_RATE, frame);
    }
    
}