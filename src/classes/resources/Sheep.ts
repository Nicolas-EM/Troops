import ResourceSpawner from "./ResourceSpawner";
import ResourcesData from "../../magic_numbers/resources_data";
import Game from "../../scenes/Game";

export default class Sheep extends ResourceSpawner {

    constructor(scene: Game, x: number, y: number, frame?: string | number) {
        super(scene, x, y, ResourcesData.Food.ICON_INFO.name, ResourcesData.Food.ICON_INFO, ResourcesData.Food.ICON, ResourcesData.Food.CAPACITY, ResourcesData.Food.RATE, frame);
        
        (this.body as Phaser.Physics.Arcade.Body).setSize(42, 36, true);
        // (this.body as any).setOffset(44,46);
    }
}