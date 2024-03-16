import * as Phaser from 'phaser'
import TownHall from "../classes/buildings/Townhall";
import Tree from "../classes/resources/Tree";
import Sheep from "../classes/resources/Sheep";
import GoldMine from "../classes/resources/GoldMine";
import Villager from "../classes/npcs/Villager";
import Player from '../classes/Player';

// MAGIC NUMBER
const MIN_ZOOM = 0.6;
const MAX_ZOOM = 1;
const ZOOM_AMOUNT = 0.05;
const MOVEMENT_OFFSET = 10;
const STARTING_VILLAGER_NPCs = 3;

export default class Game extends Phaser.Scene {
  private p1: string;
  private p2: string;
  private pointerInMap = true;
  private mapId: string;
  private _map: Phaser.Tilemaps.Tilemap;
  private _buildingsLayer: Phaser.GameObjects.GameObject[];
  cursors: any;
  maxX: number;
  minX: number;
  maxY: number;
  minY: number;

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

    // Event click Entity
    this.events.on('entityClicked', (hudInfo) => {
      this.scene.get('hud').events.emit('entityClicked', hudInfo);
    });

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
    this._map.createFromObjects('Resources/Gold', { type: "GoldMine", key: 'Gold_Mine', classType: GoldMine });

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
        this.cameras.main.zoom = Phaser.Math.Clamp(this.cameras.main.zoom - ZOOM_AMOUNT, MIN_ZOOM, MAX_ZOOM);
      }
      if (deltaY < 0) {
        this.cameras.main.zoom = Phaser.Math.Clamp(this.cameras.main.zoom + ZOOM_AMOUNT, MIN_ZOOM, MAX_ZOOM);
      }
    });

    this.input.on('gameout', () => this.pointerInMap = false);
    this.input.on('gameover', () => this.pointerInMap = true);

    // Set limits for movement
    this.maxX = this._map.widthInPixels - this.cameras.main.width;
    this.minX = 0;
    this.maxY = this._map.heightInPixels - this.cameras.main.height;
    this.minY = 0;
    

    // WASD for camera movement
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
    const newY = this.cameras.main.scrollY - delta / this.cameras.main.zoom;
    this.cameras.main.scrollY = Phaser.Math.Clamp(newY, this.minY, this.maxY);
  }

  cameraMoveDown(delta) {
    const newY = this.cameras.main.scrollY + delta / this.cameras.main.zoom;
    this.cameras.main.scrollY = Phaser.Math.Clamp(newY, this.minY, this.maxY);
  }

  cameraMoveLeft(delta) {
    const newX = this.cameras.main.scrollX - delta / this.cameras.main.zoom;
    this.cameras.main.scrollX = Phaser.Math.Clamp(newX, this.minX, this.maxX);
  }

  cameraMoveRight(delta) {
    const newX = this.cameras.main.scrollX + delta / this.cameras.main.zoom;
    this.cameras.main.scrollX = Phaser.Math.Clamp(newX, this.minX, this.maxX);
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