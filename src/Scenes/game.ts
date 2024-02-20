import * as Phaser from 'phaser'

export default class Game extends Phaser.Scene {
  mapId: String;

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

    // Cargar imagen
    this.load.image("Tilemap_Flat", "sprites\/Terrain\/Ground\/Tilemap_Flat.png");
  }

  create() {
    // Crear mapa
    const map = this.make.tilemap({ key: 'map' });

    // Añadir referencia a imagen
    const backgroundTiles = map.addTilesetImage("Tilemap_Flat");

    // Crear capa con imagen
    const backgroundLayer = map.createLayer('background', backgroundTiles!, 0, 0);
  }
}