import * as Phaser from 'phaser'

import * as Sprites from "../../assets/sprites";

// maps
import map_test from "../../assets/maps/test.json";
import map_desierto from "../../assets/maps/desierto.json";

/**
 * Escena para la precarga de los assets que se usarán en el juego.
 * Esta escena se puede mejorar añadiendo una imagen del juego y una 
 * barra de progreso de carga de los assets
 * @see {@link https://gamedevacademy.org/creating-a-preloading-screen-in-phaser-3/} como ejemplo
 * sobre cómo hacer una barra de progreso.
 */
export default class Boot extends Phaser.Scene {

  // Constructor de la escena
  constructor() {
    super({ key: 'boot' });
  }

  // Carga de los assets del juego
  preload() {
    // Maps
    this.load.tilemapTiledJSON("test", map_test);
    this.load.tilemapTiledJSON("desierto", map_desierto);

    // Fondo
    this.load.image('ground', Sprites.Terrain.Ground.ground);
    this.load.image('Water', Sprites.Terrain.Water.water);

    // Resources
    this.load.image('gold_mine_inactive', Sprites.Resources.Spawners.Gold.inactive);
    this.load.spritesheet('tree', Sprites.Resources.Spawners.Wood.inactive, { frameWidth: 192, frameHeight: 192 });
    this.load.spritesheet('sheep', Sprites.Resources.Spawners.Food.inactive, { frameWidth: 128, frameHeight: 128 });

    // Buildings
    this.load.image('Townhall_Blue', Sprites.Buildings.Townhall.blue);
    this.load.image('Townhall_Red', Sprites.Buildings.Townhall.red);

    // NPCs
    this.load.spritesheet('Villager_blue', Sprites.NPCs.Villager.blue, { frameWidth: 192, frameHeight: 192 });
    this.load.spritesheet('Villager_red', Sprites.NPCs.Villager.red, { frameWidth: 192, frameHeight: 192 });
  }

  /**
   * Creación de la escena. En este caso, solo cambiamos a la escena que representa el
   * nivel del juego
   */
  create() {
    this.scene.start('game', { mapId: "desierto" });
  }
}