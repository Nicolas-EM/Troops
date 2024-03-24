import ResourceSpawner from "./ResourceSpawner";;
import ResourcesData from "../../magic_numbers/resources_data";
import Game from "../../scenes/Game";

export default class GoldMine extends ResourceSpawner {

    constructor(scene: Game, x: number, y: number, frame?: string | number) {
        super(scene, x, y, ResourcesData.GOLD_MINE_ICON_INFO.name, ResourcesData.GOLD_MINE_ICON_INFO, ResourcesData.GOLD_ICON, ResourcesData.GOLD_MINE_CAPACITY, ResourcesData.GOLD_MINE_RATE, frame);
    }
    
}