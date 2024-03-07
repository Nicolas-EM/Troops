import * as Phaser from 'phaser'
import Tree from "../classes/resources/Tree";
import Sheep from "../classes/resources/Sheep";
import GoldMine from "../classes/resources/GoldMine";

// MAGIC NUMBER
const MIN_ZOOM = 0.05;
const MAX_ZOOM = 1.3;
const ZOOM_AMOUNT = 0.05;
const MIN_POS = -64;

export default class Game extends Phaser.Scene {
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

  preload() {
    this.load.setPath('assets/sprites/');

    // Cargar json del mapa
    this.load.tilemapTiledJSON("map", `maps/${this.mapId}.json`);

    // Cargar imagenes
    this.load.image("Ground", "terrain\/ground\/ground.png");

    // Buildings
    this.load.image("Town_Hall_Blue", "buildings\/town_hall\/blue.png");
    this.load.image("Villager_House_Blue", "buildings\/villager_house\/blue.png");
    this.load.image("Tower_Blue", "buildings\/tower\/blue.png");
    this.load.image("Goblin_Hut_Blue", "buildings\/goblin_hut\/blue.png");

    // NPCs
    this.load.spritesheet("Villager_Blue", "NPCs\/villager\/blue.png", { frameWidth: 192, frameHeight: 192});
    this.load.spritesheet("Soldier_Blue", "NPCs\/soldier\/blue.png", { frameWidth: 192, frameHeight: 192});

    // Resources
    this.load.spritesheet("Tree", "resources\/spawners\/tree\/tree.png", { frameWidth: 192, frameHeight: 192});
    this.load.spritesheet("Sheep", "resources\/spawners\/sheep\/sheep.png", { frameWidth: 128, frameHeight: 128});
    this.load.spritesheet("Gold_Mine_Active", "resources\/spawners\/gold_mine\/gold_mine_active.png", { frameWidth: 192, frameHeight: 128});
  }

  create() {
    // Crear mapa
    this._map = this.make.tilemap({ key: this.mapId });

    // Añadir referencia a imagen
    const backgroundTiles = this._map.addTilesetImage("Ground");
    // Crear capa con imagen
    const backgroundLayer = this._map.createLayer('background', backgroundTiles!, 0, 0);

    this._buildingsLayer = this._map.createFromObjects('buildings', [
      { type: "Town_Hall_Blue", key: 'Town_Hall_Blue'},
      { type: "Villager_House_Blue", key: 'Villager_House_Blue' },
      { type: "Tower_Blue", key: 'Tower_Blue' },
      { type: "Goblin_Hut_Blue", key: 'Goblin_Hut_Blue' }
    ]);

    const npcLayer = this._map.createFromObjects("NPCs", [
      { type: "Villager_Blue", key: 'Villager_Blue'},
      { type: "Soldier_Blue", key: 'Soldier_Blue'}
    ]);

    const resourceLayer = this._map.createFromObjects("resources", [
      { type: "Tree", key: 'Tree', classType: Tree},
      { type: "Sheep", key: "Sheep", classType: Sheep},
      { type: "Gold_Mine_Active", key: "Gold_Mine_Active", classType: GoldMine}
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

    // Event listener al hacer click y mover
    this.input.on('pointermove', (pointer) => {
      if (!pointer.isDown) return;

      this.cameras.main.scrollX -= (pointer.x - pointer.prevPosition.x) / this.cameras.main.zoom;
      this.cameras.main.scrollY -= (pointer.y - pointer.prevPosition.y) / this.cameras.main.zoom;
    });
  }
}