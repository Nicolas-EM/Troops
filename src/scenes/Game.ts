import * as Phaser from 'phaser'
import Map from "../classes/Map";
import Hud from './Hud';
import { PhaserNavMeshPlugin } from "phaser-navMesh";
import PlayerEntity from '../classes/PlayerEntity';
import NPC from '../classes/npcs/NPC';
import ResourceSpawner from '../classes/resources/ResourceSpawner';

// MAGIC NUMBER
const MIN_ZOOM = 0.6;
const MAX_ZOOM = 1;
const ZOOM_AMOUNT = 0.05;
const MOVEMENT_OFFSET = 10;

export default class Game extends Phaser.Scene {
  public navMeshPlugin: PhaserNavMeshPlugin;
  private p1: string;
  private p2: string;
  private pointerInMap = true;
  private mapId: string;
  private _map: Map;
  private _selectedEntity: PlayerEntity | ResourceSpawner;
  private _buildingsLayer: Phaser.GameObjects.GameObject[];
  cursors: any;
  private optionsMenuOpened = false;

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
    // Hud
    this.scene.run('hud');
    this.events.on('menuOpened', () => {
      this.optionsMenuOpened = true;
    });
    this.events.on('menuClosed', () => {
      this.optionsMenuOpened = false;
    });

    this._map = new Map(this, this.mapId, this.p1, this.p2);

    // Event listener al hacer scroll
    this.input.on('wheel', (pointer, gameObjects, deltaX, deltaY, deltaZ) => {
      if (!this.optionsMenuOpened) {
        if (deltaY > 0) {
          this.cameras.main.zoom = Phaser.Math.Clamp(this.cameras.main.zoom - ZOOM_AMOUNT, MIN_ZOOM, MAX_ZOOM);
        }
        if (deltaY < 0) {
          this.cameras.main.zoom = Phaser.Math.Clamp(this.cameras.main.zoom + ZOOM_AMOUNT, MIN_ZOOM, MAX_ZOOM);
        }
      }
    });

    this.input.on('gameout', () => this.pointerInMap = false);
    this.input.on('gameover', () => this.pointerInMap = true);

    // Set limits for movement
    this.cameras.main.setBounds(0, 0, this._map.getWidthInPixel(), this._map.getHeightInPixel());

    // WASD for camera movement
    this.cursors = this.input.keyboard!.addKeys({
      'up': Phaser.Input.Keyboard.KeyCodes.W,
      'down': Phaser.Input.Keyboard.KeyCodes.S,
      'left': Phaser.Input.Keyboard.KeyCodes.A,
      'right': Phaser.Input.Keyboard.KeyCodes.D
    });

    this.input.on('pointerdown', (pointer: Phaser.Input.Pointer, gameObject) => {
      if (pointer.rightButtonDown() && this.pointerInMap && this._selectedEntity) {
        const pointerPosition = new Phaser.Math.Vector2(pointer.worldX, pointer.worldY);

        if (this._selectedEntity instanceof NPC) {
          this._selectedEntity.setTarget(pointerPosition, this._map.navMesh);
        }
      }
    });
  }

  update(time: number, delta: number): void {
    this.cameraPan(delta);
    this.events.emit('update', time, delta);;

    if (!this.optionsMenuOpened) { // Disable movement if menu opened 
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

  }

  cameraMoveUp(delta) {
    this.cameras.main.scrollY = this.cameras.main.scrollY - delta / this.cameras.main.zoom;
  }

  cameraMoveDown(delta) {
    this.cameras.main.scrollY = this.cameras.main.scrollY + delta / this.cameras.main.zoom;
  }

  cameraMoveLeft(delta) {
    this.cameras.main.scrollX = this.cameras.main.scrollX - delta / this.cameras.main.zoom;
  }

  cameraMoveRight(delta) {
    this.cameras.main.scrollX = this.cameras.main.scrollX + delta / this.cameras.main.zoom;
  }

  cameraPan(delta: number) {
    let { width, height } = this.sys.game.canvas;
    const pointer = this.input.activePointer.position;

    if (pointer.x === 0 && pointer.y === 0)
      return;

    if (!this.pointerInMap)
      return;

    if (!this.optionsMenuOpened) { // Disable movement if menu opened
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

  setSelectedEntity(entity: PlayerEntity | ResourceSpawner) {
    if (!this.optionsMenuOpened) {
      console.log("Game: Entity Selected");
      this._selectedEntity = entity;
      this.scene.get('hud').events.emit('entityClicked', this._selectedEntity.getHudInfo());
    }
  }
}