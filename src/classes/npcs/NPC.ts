import * as Phaser from 'phaser';
import Player from '../Player.ts'
import PlayerEntity from '../PlayerEntity.ts';

export default abstract class NPC extends PlayerEntity {
    // protected attributes:
    protected _id: string;
    protected _owner: Player;
    protected _health: number;
    protected _visionRange: number;

    /**
     * @constructor
     * @param owner is the player who created the entity, not optional.
     * @returns NPC instance
     */
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string | Phaser.Textures.Texture, owner: Player, health: number, visionRange: number, frame?: string | number) {
        super(scene, x, y, texture, owner, health, visionRange, frame);
        //this.init();
    }

    /**
     * @summary initialization of NPC entity
     */
    // protected init(){
    //     this.addEventListeners();
    // }

    /**
     * @summary adds event listeners to the NPC for his generic actions (move, receive hit)
     */
    // protected addEventListeners(){
    //     //TODO complete
    //     this.scene.events.on('moveOrder',() => {});
    //     //These dont belong here, rather in subclass
    //     //TODO @sanord8
    //    // this.scene.events.on('attackOrder',() => {});
    //    // this.scene.events.on('gatherOrder',() => {});
    //     this.scene.events.on('spawnOrder',() => {});
    //     this.scene.events.on('death',() => {});
    // }

    /**
     * @summary executes move order on X Y cordinates
     * @param x is X coordinate to move on board
     * @param y is Y coordinate to move on board
     */
    move(X: number, Y: number): void{
        let currentPosition = new Phaser.Math.Vector2(this.x, this.y);
        let targetPosition = new Phaser.Math.Vector2(X, Y);
        let path = Pathfinder.getInstance().findPath(currentPosition, targetPosition);

        if(path){
            //TODO
            //maybe we should have an 'animOnProgress' variable, so we can cancel stuff on the go 
        }
    }

}