import * as Phaser from 'phaser'

// MAGIC NUMBER
const MIN_ZOOM = 0.3;
const MAX_ZOOM = 1.3;
const ZOOM_AMOUNT = 0.1;
const MIN_POS = -64;

export default class Game extends Phaser.Scene {
  private mapId: String;
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
    this.load.setPath('assets/');

    // Cargar json del mapa
    this.load.tilemapTiledJSON("map", `maps/${this.mapId}.json`);

    // Cargar imagenes
    this.load.image("Tilemap_Flat", "sprites\/Terrain\/Ground\/Tilemap_Flat.png");
    this.load.image("Castle_Blue", "sprites\/Factions\/Knights\/Buildings\/Castle\/Castle_Blue.png");
    this.load.image("House_Blue", "sprites\/Factions\/Knights\/Buildings\/House\/House_Blue.png");
    this.load.image("Tower_Blue", "sprites\/Factions\/Knights\/Buildings\/Tower\/Tower_Blue.png");
  }

  create() {
    // Crear mapa
    this._map = this.make.tilemap({ key: 'map' });

    // Añadir referencia a imagen
    const backgroundTiles = this._map.addTilesetImage("Tilemap_Flat");
    // Crear capa con imagen
    const backgroundLayer = this._map.createLayer('background', backgroundTiles!, 0, 0);

    this._buildingsLayer = this._map.createFromObjects('buildings', [
      { type: "Castle_Blue", key: 'Castle_Blue' },
      { type: "House_Blue", key: 'House_Blue' },
      { type: "Tower_Blue", key: 'Tower_Blue' }
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