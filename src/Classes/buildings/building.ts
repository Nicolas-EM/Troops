import * as Phaser from "phaser"
import Entity from "../PlayerEntity";
import Player from "../Player";

export default abstract class Building extends Entity {
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string | Phaser.Textures.Texture, owner: Player, health: number, id: string, visionRange: number, frame?: string | number) {
        super(scene, x, y, texture, owner, health, id, visionRange, frame);
    }
}