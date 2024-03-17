import * as Phaser from 'phaser'
import Map from "../Classes/Map";

// MAGIC NUMBER
const MIN_ZOOM = 0.05;
const MAX_ZOOM = 1.3;
const ZOOM_AMOUNT = 0.05;
const MIN_POS = -64;
const MOVEMENT_OFFSET = 50;
const STARTING_VILLAGER_NPCs = 3;

import { PhaserNavMeshPlugin } from "phaser-navMesh";
import PlayerEntity from '../Classes/PlayerEntity';
import NPC from '../Classes/NPCs/NPC';

export default class Game extends Phaser.Scene {
  public navMeshPlugin: PhaserNavMeshPlugin;
  private p1: string;
  private p2: string;
  private pointerInMap = true;
  private mapId: string;
  private _map: Map;
  private _selectedEntity: PlayerEntity;

  constructor() {
    super({ key: 'game' });
  }

  // Para pasar atributos de una escena a otra
  // En este caso, pasamos el ID del mapa
  init(data) {
    this.mapId = data.mapId;
    this.p1 = data.p1;
    this.p2 = data.p2;
  }

  create() {
    this._map = new Map(this, this.mapId, this.p1, this.p2);

    // Event listener al hacer scroll
    this.input.on('wheel', (pointer, gameObjects, deltaX, deltaY, deltaZ) => {
      if (deltaY > 0) {
        const newZoom = this.cameras.main.zoom - ZOOM_AMOUNT;
        if (newZoom > MIN_ZOOM) {
          this.cameras.main.zoom = newZoom;
        }
      }

      if (deltaY < 0) {
        const newZoom = this.cameras.main.zoom + ZOOM_AMOUNT;
        if (newZoom < MAX_ZOOM) {
          this.cameras.main.zoom = newZoom;
        }
      }
    });

    this.input.on('gameout', () => this.pointerInMap = false);
    this.input.on('gameover', () => this.pointerInMap = true);
    this.input.on('pointerdown', (pointer: Phaser.Input.Pointer, gameObject) => {
      if (pointer.rightButtonDown() && this.pointerInMap) {
        if (this.pointerInMap) {
          const pointerPosition = new Phaser.Math.Vector2(pointer.worldX, pointer.worldY);

          if (this._selectedEntity instanceof NPC) {
            this._selectedEntity.setTarget(pointerPosition, this._map.navMesh);
          }
        }
      }
    });
  }

  update(time: number, delta: number): void {
    this.cameraPan(delta);
    this.events.emit('update', time, delta);
  }

  cameraPan(delta: number) {
    let { width, height } = this.sys.game.canvas;
    const pointer = this.input.activePointer.position;

    if (pointer.x === 0 && pointer.y === 0)
      return;

    if (!this.pointerInMap)
      return;

    if (pointer.x >= width - MOVEMENT_OFFSET)
      // move right
      this.cameras.main.scrollX += delta / this.cameras.main.zoom;
    else if (pointer.x <= MOVEMENT_OFFSET)
      // move left
      this.cameras.main.scrollX -= delta / this.cameras.main.zoom;

    if (pointer.y >= height - MOVEMENT_OFFSET)
      // move down
      this.cameras.main.scrollY += delta / this.cameras.main.zoom;
    else if (pointer.y <= MOVEMENT_OFFSET)
      // move up
      this.cameras.main.scrollY -= delta / this.cameras.main.zoom;
  }

  setSelectedEntity(entity: PlayerEntity) {
    console.log("Game: Entity Selected");
    this._selectedEntity = entity;
  }
}