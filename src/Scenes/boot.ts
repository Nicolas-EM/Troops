import * as Phaser from 'phaser'

// maps
import map_test from "../../assets/maps/test.json";
import map_desierto from "../../assets/maps/desierto.json";

// fondo
import Water from '../../assets/sprites/Terrain/Water/Water.png';
import ground from '../../assets/sprites/Terrain/Ground/ground.png';

// resources
import gold_mine_inactive from "../../assets/sprites/Resources/spawners/gold_mine/gold_mine_inactive.png";
import tree from "../../assets/sprites/Resources/spawners/tree/tree.png";
import sheep from "../../assets/sprites/Resources/spawners/sheep/sheep.png";

// buildings
import Townhall_Blue from '../../assets/sprites/buildings/town_hall/blue.png';
import Townhall_Red from '../../assets/sprites/buildings/town_hall/red.png';

// NPCs
import Villager_blue from "../../assets/sprites/NPCs/villager/blue.png";
import Villager_red from "../../assets/sprites/NPCs/villager/red.png";

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
    this.load.image('ground', ground);
    this.load.image('Water', Water);

    // Resources
    this.load.image('gold_mine_inactive', gold_mine_inactive);
    this.load.spritesheet('tree', tree, { frameWidth: 192, frameHeight: 192 });
    this.load.spritesheet('sheep', sheep, { frameWidth: 128, frameHeight: 128 });

    // Buildings
    this.load.image('Townhall_Blue', Townhall_Blue);
    this.load.image('Townhall_Red', Townhall_Red);

    // NPCs
    this.load.spritesheet('Villager_blue', Villager_blue, { frameWidth: 192, frameHeight: 192 });
    this.load.spritesheet('Villager_red', Villager_red, { frameWidth: 192, frameHeight: 192 });
  }

  /**
   * Creación de la escena. En este caso, solo cambiamos a la escena que representa el
   * nivel del juego
   */
  create() {
    this.scene.start('game', { mapId: "desierto" });
  }
}