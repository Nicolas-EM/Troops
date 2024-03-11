import Phaser from "phaser";
import Game from "../scenes/Game";
import { Pathfinding, Grid, PathNode } from "@raresail/phaser-pathfinding";

export default class Pathfinder {
  private static instance: Pathfinder;
  private map: Phaser.Tilemaps.Tilemap;
  private collidingObjects: Phaser.Tilemaps.TilemapLayer;
  private grid: any;

  private constructor(
    map: Phaser.Tilemaps.Tilemap,
    collidingObjects: Phaser.Tilemaps.TilemapLayer
  ) {
    this.map = map;
    this.collidingObjects = collidingObjects;
    this.updateGrid();
  }
  static createInstance(
    map: Phaser.Tilemaps.Tilemap,
    collidingObjects: Phaser.Tilemaps.TilemapLayer
  ) {
    if (!Pathfinder.instance) {
      Pathfinder.instance = new Pathfinder(map, collidingObjects);
    }
    return Pathfinder.instance;
  }

  private updateGrid() {
    this.grid = Grid.createFromMap(this.map, [this.collidingObjects]);
  }

  static getInstance(): Pathfinder {
    return Pathfinder.instance;
  }

  /**
   *
   * @param v1 vector of starting position
   * @param v2 vector of clicked position
   * @returns generated path
   */
  findPath(v1: Phaser.Math.Vector2, v2: Phaser.Math.Vector2): PathNode[] {
    this.updateGrid();
    const pathfinding = new Pathfinding(this.grid);
    const path = pathfinding.findPathBetweenTl(v1, v2);
    return path;
  }
}
