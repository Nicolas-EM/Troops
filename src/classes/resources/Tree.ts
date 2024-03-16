import ResourceSpawner from "./ResourceSpawner"

// TODO: remove magic numbers
const SPAWNER_ICON = "Tree";
const SPAWNER_WIDTH = 85;
const SPAWNER_HEIGHT = 85;
const RESOURCE_ICON = "Wood";
const TOTAL_RESOURCE = 1000;
const RESOURCE_RATE = 10;

export default class Tree extends ResourceSpawner {

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string | Phaser.Textures.Texture, frame?: string | number) {
        super(scene, x, y, texture, { name: SPAWNER_ICON, width: SPAWNER_WIDTH, height: SPAWNER_HEIGHT }, RESOURCE_ICON, TOTAL_RESOURCE, RESOURCE_RATE, frame);
    }
    
}