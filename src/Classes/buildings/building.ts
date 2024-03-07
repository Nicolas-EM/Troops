import * as Phaser from "phaser"
import PlayerEntity from "../PlayerEntity";
import Player from "../Player";

export default abstract class Building extends PlayerEntity {
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string | Phaser.Textures.Texture, owner: Player, health: number, visionRange: number, frame?: string | number) {
        super(scene, x, y, texture, owner, health, visionRange, frame);
    }
}