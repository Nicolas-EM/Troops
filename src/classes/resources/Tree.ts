import ResourceSpawner from "./ResourceSpawner";
import ResourcesData from "../../magic_numbers/resources_data";
import Game from "../../scenes/Game";

export default class Tree extends ResourceSpawner {

    constructor(scene: Game, x: number, y: number, texture: string | Phaser.Textures.Texture, frame?: string | number) {
        super(scene, x, y, texture, ResourcesData.TREE_ICON_INFO, ResourcesData.WOOD_ICON, ResourcesData.TREE_CAPACITY, ResourcesData.TREE_RATE, frame);
    }
    
}