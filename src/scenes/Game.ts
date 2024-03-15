import * as Phaser from 'phaser'
import TownHall from "../classes/buildings/Townhall";
import Tree from "../classes/resources/Tree";
import Sheep from "../classes/resources/Sheep";
import GoldMine from "../classes/resources/GoldMine";
import Villager from "../classes/npcs/Villager";
import Player from '../classes/Player';

// MAGIC NUMBER
const MIN_ZOOM = 0.05;
const MAX_ZOOM = 1.3;
const ZOOM_AMOUNT = 0.05;
const MIN_POS = -64;
const MOVEMENT_OFFSET = 50;
const STARTING_VILLAGER_NPCs = 3;

export default class Game extends Phaser.Scene {
  private p1: string;
  private p2: string;
  private pointerInMap = true;
  private mapId: string;
  private _map: Phaser.Tilemaps.Tilemap;
  private _buildingsLayer: Phaser.GameObjects.GameObject[];
  cursors: any;

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
    this.scene.run('hud');

    this.events.on('entityClicked', function(resourceInfo) {
      this.scene.get('hud').events.emit('entityClicked', resourceInfo);
  }, this);

    // Crear mapa
    this._map = this.make.tilemap({ key: this.mapId });

    // Fondo
    let tileset = this._map.addTilesetImage("Water");
    this._map.createLayer("Fondo/Water", tileset!);
    tileset = this._map.addTilesetImage("Ground");
    this._map.createLayer('Fondo/Ground', tileset!);
    this._map.createLayer('Fondo/Grass', tileset!);



    // Resources
    this._map.createFromObjects('Resources/Food', { type: "Sheep", key: 'Sheep', classType: Sheep });
    this._map.createFromObjects('Resources/Wood', { type: "Tree", key: 'Tree', classType: Tree });
    this._map.createFromObjects('Resources/Gold', { type: "GoldMine", key: 'GoldMine', classType: GoldMine });

    // Townhalls
    let x = new Player(1, "Player 1", this.p1, this); // TODO: Crear jugador real o algo

    this._map.getObjectLayer("Buildings")?.objects.forEach(obj => {
      if (obj.type === "Townhall_P1") {
        const p1_TownHall = new TownHall(this, <number>obj.x, <number>obj.y, `Townhall_${this.p1}`, x);

        new Villager(this, <number>obj.x, <number>obj.y - 192, `Villager_${this.p1}`, x);
        new Villager(this, <number>obj.x + 320, <number>obj.y + 64, `Villager_${this.p1}`, x);
        new Villager(this, <number>obj.x + 64, <number>obj.y + 320, `Villager_${this.p1}`, x);
      } else if (obj.type === "Townhall_P2") {
        const p2_TownHall = new TownHall(this, <number>obj.x, <number>obj.y, `Townhall_${this.p2}`, x);

        new Villager(this, <number>obj.x, <number>obj.y - 192, `Villager_${this.p2}`, x);
        new Villager(this, <number>obj.x - 320, <number>obj.y + 64, `Villager_${this.p2}`, x);
        new Villager(this, <number>obj.x - 64, <number>obj.y + 320, `Villager_${this.p2}`, x);
      }
    });

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

    this.cursors = this.input.keyboard!.addKeys({
      'up': Phaser.Input.Keyboard.KeyCodes.W,
      'down': Phaser.Input.Keyboard.KeyCodes.S,
      'left': Phaser.Input.Keyboard.KeyCodes.A,
      'right': Phaser.Input.Keyboard.KeyCodes.D
    });
  }

  update(time: number, delta: number): void {
    this.cameraPan(delta);

    if (this.cursors.up.isDown) {
      this.cameraMoveUp(delta);
    }
    else if (this.cursors.down.isDown) {
      this.cameraMoveDown(delta);
    }

    if (this.cursors.left.isDown) {
      this.cameraMoveLeft(delta);
    }
    else if (this.cursors.right.isDown) {
      this.cameraMoveRight(delta);
    }
  }

  cameraMoveUp(delta) {
    this.cameras.main.scrollY -= delta / this.cameras.main.zoom;
  }

  cameraMoveDown(delta) {
    this.cameras.main.scrollY += delta / this.cameras.main.zoom;
  }

  cameraMoveLeft(delta) {
    this.cameras.main.scrollX -= delta / this.cameras.main.zoom;
  }

  cameraMoveRight(delta) {
    this.cameras.main.scrollX += delta / this.cameras.main.zoom;
  }

  cameraPan(delta: number) {
    let { width, height } = this.sys.game.canvas;
    const pointer = this.input.activePointer.position;

    if (pointer.x === 0 && pointer.y === 0)
      return;

    if (!this.pointerInMap)
      return;

    if (pointer.x >= width - MOVEMENT_OFFSET && pointer.y >= MOVEMENT_OFFSET)
      this.cameraMoveRight(delta);
    else if (pointer.x <= MOVEMENT_OFFSET)
      this.cameraMoveLeft(delta);

    if (pointer.y >= height - MOVEMENT_OFFSET)
      this.cameraMoveDown(delta);
    else if (pointer.y <= MOVEMENT_OFFSET && pointer.x <= width - MOVEMENT_OFFSET * 2)
      this.cameraMoveUp(delta);
  }
}