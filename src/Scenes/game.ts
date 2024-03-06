import * as Phaser from 'phaser'
import TownHall from "../Classes/Buildings/Townhall";
import Tree from "../Classes/Resources/tree";
import Sheep from "../Classes/Resources/sheep";
import GoldMine from "../Classes/Resources/goldMine";
import Villager from "../Classes/npcs/villager";
// MAGIC NUMBER
const MIN_ZOOM = 0.05;
const MAX_ZOOM = 1.3;
const ZOOM_AMOUNT = 0.05;
const MIN_POS = -64;

export default class Game extends Phaser.Scene {
  private mapId: string;
  private _map: Phaser.Tilemaps.Tilemap;
  private _buildingsLayer: Phaser.GameObjects.GameObject[];
  private menu: Phaser.GameObjects.Container | null = null;

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
    this._map.createFromObjects('Resources/Food', { type: "Sheep", key: 'sheep', classType: Sheep });
    this._map.createFromObjects('Resources/Wood', { type: "Tree", key: 'tree', classType: Tree });
    this._map.createFromObjects('Resources/Gold', { type: "GoldMine", key: 'gold_mine_inactive', classType: GoldMine });

    // Buildings
    this._buildingsLayer = this._map.createFromObjects('Buildings', [
      { type: "Townhall_Blue", key: 'Townhall_Blue', classType: TownHall },
      { type: "Townhall_Red", key: 'Townhall_Red', classType: TownHall }
    ]);

    const npcLayer = this._map.createFromObjects("NPCs", [
      { type: "Villager_blue", key: 'Villager_blue', classType: Villager },
      { type: "Villager_red", key: 'Villager_red', classType: Villager }
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
      this.events.on('entityClicked', (clickedObject: Phaser.GameObjects.GameObject[]) => {
        this.createMenu(clickedObject);
      });
    });

    // Event listener al hacer click y mover
    this.input.on('pointermove', (pointer) => {
      if (!pointer.isDown) return;

      this.cameras.main.scrollX -= (pointer.x - pointer.prevPosition.x) / this.cameras.main.zoom;
      this.cameras.main.scrollY -= (pointer.y - pointer.prevPosition.y) / this.cameras.main.zoom;
    });
  }



  //TODO @sanord8 tras la idea de nico deberia hacer una sub escena que este siepre por encima
  //container approach (maybe nineslice works better)
  createMenu(objects: Phaser.GameObjects.GameObject[]) {
    console.log("Creating menu for: ", objects);
    this.menu?.destroy();//if exists, destroy
    this.menu = this.add.container(0, this.scale.height - this.scale.height / 7);
    const background = this.add.rectangle(0, 0, this.scale.width * 4 / 5, this.scale.height / 7, 0x000000);

    Array.isArray(objects) && objects.forEach((object, index) => {
      const text = this.add.text(10, 10 + index * 20, `Selected: ${object.name}`);
      this.menu?.add(text);
    });
    this.menu?.add(background);
    this.menu?.list.forEach(child => {
      if (child instanceof Phaser.GameObjects.Text) {
        child.setOrigin(0, 1);
      }
    });
  }
}