import ResourceSpawner from "./ResourceSpawner";
import ResourcesData from "../../magic_numbers/resources_data";
import Game from "../../scenes/Game";

export default class Sheep extends ResourceSpawner {

    constructor(scene: Game, x: number, y: number, frame?: string | number) {
        super(scene, x, y, ResourcesData.SHEEP_ICON_INFO.name, ResourcesData.SHEEP_ICON_INFO, ResourcesData.FOOD_ICON, ResourcesData.SHEEP_CAPACITY, ResourcesData.SHEEP_RATE, frame);
    }
    
}