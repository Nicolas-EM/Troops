import * as Phaser from 'phaser'
import TownHall from "../Classes/Buildings/Townhall";
import Tree from "../Classes/Resources/tree";
import Sheep from "../Classes/Resources/sheep";
import GoldMine from "../Classes/Resources/goldMine";
import villager from "../Classes/NPCs/villager";

// MAGIC NUMBER
const MIN_ZOOM = 0.05;
const MAX_ZOOM = 1.3;
const ZOOM_AMOUNT = 0.05;
const MIN_POS = -64;
const MOVEMENT_OFFSET = 50;

export default class Game extends Phaser.Scene {
  private pointerInMap = true;
  private mapId: string;
  private _map: Phaser.Tilemaps.Tilemap;
  private _buildingsLayer: Phaser.GameObjects.GameObject[];

  constructor() {
    super({ key: 'game' });
  }

  // Para pasar atributos de una escena a otra
  // En este caso, pasamos el ID del mapa
  init(data) {
    this.mapId = data.mapId;
  }

  create() {
    // Crear mapa
    this._map = this.make.tilemap({ key: this.mapId });

    // Fondo
    let tileset = this._map.addTilesetImage("Water");
    this._map.createLayer("Fondo/Water", tileset!);
    tileset = this._map.addTilesetImage("ground");
    this._map.createLayer('Fondo/Ground', tileset!);
    this._map.createLayer('Fondo/Grass', tileset!);

    // Resources
    this._map.createFromObjects('Resources/Food', { type: "Sheep", key: 'sheep' });
    this._map.createFromObjects('Resources/Wood', { type: "Tree", key: 'tree' });
    this._map.createFromObjects('Resources/Gold', { type: "GoldMine", key: 'gold_inactive' });

    // Buildings
    this._buildingsLayer = this._map.createFromObjects('Buildings', [
      { type: "Townhall_Blue", key: 'Townhall_Blue', classType: TownHall},
      { type: "Townhall_Red", key: 'Townhall_Red', classType: TownHall},
      // { type: "Townhall_Purple", key: 'Townhall_Purple', classType: TownHall},
      // { type: "Townhall_Yellow", key: 'Townhall_Yellow', classType: TownHall}
    ]);

    const npcLayer = this._map.createFromObjects("NPCs", [
      { type: "Villager_Blue", key: 'Villager_Blue', classType: villager },
      { type: "Villager_Red", key: 'Villager_Red', classType: villager },
      // { type: "Villager_Purple", key: 'Villager_Purple', classType: villager},
      // { type: "Villager_Yellow", key: 'Villager_Yellow', classType: villager}
    ]);

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
  }

  update(time: number, delta: number): void {
    this.cameraPan(delta)
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
}