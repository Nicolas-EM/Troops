import ResourceSpawner from "./resourceSpawner"

// TODO: remove magic numbers
const TOTAL_RESOURCE = 100;
const RESOURCE_RATE = 10;

export default class GoldMine extends ResourceSpawner {

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string | Phaser.Textures.Texture, frame?: string | number) {
        super(scene, x, y, texture, TOTAL_RESOURCE, RESOURCE_RATE, frame)
    }
}