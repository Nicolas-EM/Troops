import ResourceSpawner from "./ResourceSpawner"

// TODO: remove magic numbers
const SPAWNER_ICON = "Sheep";
const SPAWNER_WIDTH = 100;
const SPAWNER_HEIGHT = 100;
const RESOURCE_ICON = "Food";
const RESOURCE_WIDTH = 60;
const RESOURCE_HEIGHT = 60;
const TOTAL_RESOURCE = 1000;
const RESOURCE_RATE = 10;

export default class Sheep extends ResourceSpawner {

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string | Phaser.Textures.Texture, frame?: string | number) {
        super(scene, x, y, texture, { name: SPAWNER_ICON, width: SPAWNER_WIDTH, height: SPAWNER_HEIGHT }, { name: RESOURCE_ICON, width: RESOURCE_WIDTH, height: RESOURCE_HEIGHT }, TOTAL_RESOURCE, RESOURCE_RATE, frame);
    }
}