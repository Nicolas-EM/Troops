import * as Phaser from 'phaser'

import * as Sprites from "../../assets/sprites";

// maps
import map_test from "../../assets/maps/test.json";
import map_desierto from "../../assets/maps/desert.json";

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
    this.load.tilemapTiledJSON("desert", map_desierto);

    // Fondo
    this.load.image('ground', Sprites.Terrain.Ground.ground);
    this.load.image('Water', Sprites.Terrain.Water.water);
    this.load.spritesheet('Foam', Sprites.Terrain.Water.foam, { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet('Rocks', Sprites.Terrain.Water.rocks, { frameWidth: 128, frameHeight: 128 });

    // Decoration
    this.load.spritesheet('decoration', Sprites.Decoration.decoration, { frameWidth: 64, frameHeight: 64 });

    // Resources
    // Gold
    this.load.image('gold_inactive', Sprites.Resources.Spawners.Gold.inactive);
    this.load.image('gold_active', Sprites.Resources.Spawners.Gold.active);
    this.load.image('gold_destroyed', Sprites.Resources.Spawners.Gold.destroyed);
    // Wood
    this.load.spritesheet('tree', Sprites.Resources.Spawners.Wood.inactive, { frameWidth: 192, frameHeight: 192 });
    // Food
    this.load.spritesheet('sheep', Sprites.Resources.Spawners.Food.inactive, { frameWidth: 128, frameHeight: 128 });

    // Buildings
    // Hut
    this.load.image('Hut_Blue', Sprites.Buildings.Hut.blue);
    this.load.image('Hut_Red', Sprites.Buildings.Hut.red);
    this.load.image('Hut_Purple', Sprites.Buildings.Hut.purple);
    this.load.image('Hut_Yellow', Sprites.Buildings.Hut.yellow);
    this.load.image('Hut_destroyed', Sprites.Buildings.Hut.destroyed);
    this.load.image('Hut_construction', Sprites.Buildings.Hut.construction);
    // Tower
    this.load.image('Tower_Blue', Sprites.Buildings.Tower.blue);
    this.load.image('Tower_Red', Sprites.Buildings.Tower.red);
    this.load.image('Tower_Purple', Sprites.Buildings.Tower.purple);
    this.load.image('Tower_Yellow', Sprites.Buildings.Tower.yellow);
    this.load.image('Tower_destroyed', Sprites.Buildings.Tower.destroyed);
    this.load.image('Tower_construction', Sprites.Buildings.Tower.construction);
    // Townhall
    this.load.image('Townhall_Blue', Sprites.Buildings.Townhall.blue);
    this.load.image('Townhall_Red', Sprites.Buildings.Townhall.red);
    this.load.image('Townhall_Purple', Sprites.Buildings.Townhall.purple);
    this.load.image('Townhall_Yellow', Sprites.Buildings.Townhall.yellow);
    this.load.image('Townhall_destroyed', Sprites.Buildings.Townhall.destroyed);
    this.load.image('Townhall_construction', Sprites.Buildings.Townhall.construction);
    // House
    this.load.image('House_Blue', Sprites.Buildings.House.blue);
    this.load.image('House_Red', Sprites.Buildings.House.red);
    this.load.image('House_Purple', Sprites.Buildings.House.purple);
    this.load.image('House_Yellow', Sprites.Buildings.House.yellow);
    this.load.image('House_destroyed', Sprites.Buildings.House.destroyed);
    this.load.image('House_construction', Sprites.Buildings.House.construction);

    // NPCs
    // Archer
    this.load.spritesheet('Archer_Blue', Sprites.NPCs.Archer.blue, { frameWidth: 192, frameHeight: 192 });
    this.load.spritesheet('Archer_Red', Sprites.NPCs.Archer.red, { frameWidth: 192, frameHeight: 192 });
    this.load.spritesheet('Archer_Purple', Sprites.NPCs.Archer.purple, { frameWidth: 192, frameHeight: 192 });
    this.load.spritesheet('Archer_Yellow', Sprites.NPCs.Archer.yellow, { frameWidth: 192, frameHeight: 192 });
    // Goblin
    this.load.spritesheet('Goblin_Blue', Sprites.NPCs.Goblin.blue, { frameWidth: 192, frameHeight: 192 });
    this.load.spritesheet('Goblin_Red', Sprites.NPCs.Goblin.red, { frameWidth: 192, frameHeight: 192 });
    this.load.spritesheet('Goblin_Purple', Sprites.NPCs.Goblin.purple, { frameWidth: 192, frameHeight: 192 });
    this.load.spritesheet('Goblin_Yellow', Sprites.NPCs.Goblin.yellow, { frameWidth: 192, frameHeight: 192 });
    // Soldier
    this.load.spritesheet('Soldier_Blue', Sprites.NPCs.Soldier.blue, { frameWidth: 192, frameHeight: 192 });
    this.load.spritesheet('Soldier_Red', Sprites.NPCs.Soldier.red, { frameWidth: 192, frameHeight: 192 });
    this.load.spritesheet('Soldier_Purple', Sprites.NPCs.Soldier.purple, { frameWidth: 192, frameHeight: 192 });
    this.load.spritesheet('Soldier_Yellow', Sprites.NPCs.Soldier.yellow, { frameWidth: 192, frameHeight: 192 });
    // Villager
    this.load.spritesheet('Villager_Blue', Sprites.NPCs.Villager.blue, { frameWidth: 192, frameHeight: 192 });
    this.load.spritesheet('Villager_Red', Sprites.NPCs.Villager.red, { frameWidth: 192, frameHeight: 192 });
    this.load.spritesheet('Villager_Purple', Sprites.NPCs.Villager.purple, { frameWidth: 192, frameHeight: 192 });
    this.load.spritesheet('Villager_Yellow', Sprites.NPCs.Villager.yellow, { frameWidth: 192, frameHeight: 192 });
  }

  /**
   * Creación de la escena. En este caso, solo cambiamos a la escena que representa el
   * nivel del juego
   */
  create() {
    this.scene.start('game', { mapId: "desert", p1: "Blue", p2: "Red" });
  }
}