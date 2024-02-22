
import Phaser from 'phaser';
import Game from '../Scenes/game';
import {Pathfinding, Grid, } from '@raresail/phaser-pathfinding';

export default class Pathfinder {
    private static instance: Pathfinder;
    private map: Phaser.Tilemaps.Tilemap;
    private collidingObjects: Phaser.Tilemaps.TilemapLayer
    private grid: any;

    private constructor(map: Phaser.Tilemaps.Tilemap, collidingObjects: Phaser.Tilemaps.TilemapLayer) {
        this.map = map;
        this.collidingObjects = collidingObjects;
        this.updateGrid();
    }
    static createInstance(map: Phaser.Tilemaps.Tilemap, collidingObjects: Phaser.Tilemaps.TilemapLayer){
        if (!Pathfinder.instance) {
            Pathfinder.instance = new Pathfinder(map, collidingObjects);
        }
        return Pathfinder.instance;
    }

    private updateGrid() {
        this.grid = Grid.createFromMap(this.map, [this.collidingObjects]);
    }

    getInstance(): Pathfinder {
        return Pathfinder.instance;
    }

    // Add your class methods and properties here
    // For example:
    findPath(v1: Phaser.Math.Vector2, v2: Phaser.Math.Vector2) {
        this.updateGrid();
        const pathfinding = new Pathfinder.(this.grid);
        const path = this.pathfinding.findPathBetweenTl(v1,v2);
    }


}