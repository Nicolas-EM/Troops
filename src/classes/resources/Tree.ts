import ResourceSpawner from "./ResourceSpawner";
import ResourcesData from "../../magic_numbers/resources_data";
import Game from "../../scenes/Game";

export default class Tree extends ResourceSpawner {

    constructor(scene: Game, x: number, y: number, frame?: string | number) {
        super(scene, x, y, ResourcesData.TREE_ICON_INFO.name, ResourcesData.TREE_ICON_INFO, ResourcesData.WOOD_ICON, ResourcesData.TREE_CAPACITY, ResourcesData.TREE_RATE, frame);
    }
    
}