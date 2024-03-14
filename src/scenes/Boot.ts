import * as Phaser from 'phaser'

import * as Sprites from '../../assets/sprites';

// maps
import map_test from '../../assets/maps/test.json';
import map_desert from '../../assets/maps/desert.json';
import map_mountain from '../../assets/maps/mountain.json';
import map_river from '../../assets/maps/river.json';


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
    this.load.tilemapTiledJSON('test', map_test);
    this.load.tilemapTiledJSON('desert', map_desert);
    this.load.tilemapTiledJSON('mountain', map_mountain);
    this.load.tilemapTiledJSON('river', map_river);

    // Fondo
    this.load.image('Ground', Sprites.Terrain.Ground.Ground);
    this.load.image('Water', Sprites.Terrain.Water.Water);
    // Foam
    this.load.spritesheet('Foam', Sprites.Terrain.Water.Foam, { frameWidth: 192, frameHeight: 192 });
    // Rocks
    this.load.spritesheet('Rocks', Sprites.Terrain.Water.Rocks, { frameWidth: 128, frameHeight: 128 });

    // Decoration
    this.load.image('Decoration', Sprites.Decoration.Decoration);

    // Resources
    // Gold
    this.load.spritesheet('GoldMine', Sprites.Resources.Spawners.Gold.GoldMine, { frameWidth: 192, frameHeight: 128 });
    // Wood
    this.load.spritesheet('Tree', Sprites.Resources.Spawners.Wood.Tree, { frameWidth: 192, frameHeight: 192 });
    // Food
    this.load.spritesheet('Sheep', Sprites.Resources.Spawners.Food.Sheep, { frameWidth: 128, frameHeight: 128 });

    // Buildings
    // Hut
    this.load.image('Hut_Blue', Sprites.Buildings.Hut.Blue);
    this.load.image('Hut_Red', Sprites.Buildings.Hut.Red);
    this.load.image('Hut_Purple', Sprites.Buildings.Hut.Purple);
    this.load.image('Hut_Yellow', Sprites.Buildings.Hut.Yellow);
    this.load.image('Hut_Destroyed', Sprites.Buildings.Hut.Destroyed);
    this.load.image('Hut_Construction', Sprites.Buildings.Hut.Construction);
    // Tower
    this.load.image('Tower_Blue', Sprites.Buildings.Tower.Blue);
    this.load.image('Tower_Red', Sprites.Buildings.Tower.Red);
    this.load.image('Tower_Purple', Sprites.Buildings.Tower.Purple);
    this.load.image('Tower_Yellow', Sprites.Buildings.Tower.Yellow);
    this.load.image('Tower_Destroyed', Sprites.Buildings.Tower.Destroyed);
    this.load.image('Tower_Construction', Sprites.Buildings.Tower.Construction);
    // Townhall
    this.load.image('Townhall_Blue', Sprites.Buildings.Townhall.Blue);
    this.load.image('Townhall_Red', Sprites.Buildings.Townhall.Red);
    this.load.image('Townhall_Purple', Sprites.Buildings.Townhall.Purple);
    this.load.image('Townhall_Yellow', Sprites.Buildings.Townhall.Yellow);
    this.load.image('Townhall_Destroyed', Sprites.Buildings.Townhall.Destroyed);
    this.load.image('Townhall_Construction', Sprites.Buildings.Townhall.Construction);
    // House
    this.load.image('House_Blue', Sprites.Buildings.House.Blue);
    this.load.image('House_Red', Sprites.Buildings.House.Red);
    this.load.image('House_Purple', Sprites.Buildings.House.Purple);
    this.load.image('House_Yellow', Sprites.Buildings.House.Yellow);
    this.load.image('House_Destroyed', Sprites.Buildings.House.Destroyed);
    this.load.image('House_Construction', Sprites.Buildings.House.Construction);

    // NPCs
    // Archer
    this.load.spritesheet('Archer_Blue', Sprites.NPCs.Archer.Blue, { frameWidth: 192, frameHeight: 192 });
    this.load.spritesheet('Archer_Red', Sprites.NPCs.Archer.Red, { frameWidth: 192, frameHeight: 192 });
    this.load.spritesheet('Archer_Purple', Sprites.NPCs.Archer.Purple, { frameWidth: 192, frameHeight: 192 });
    this.load.spritesheet('Archer_Yellow', Sprites.NPCs.Archer.Yellow, { frameWidth: 192, frameHeight: 192 });
    // Goblin
    this.load.spritesheet('Goblin_Blue', Sprites.NPCs.Goblin.Blue, { frameWidth: 192, frameHeight: 192 });
    this.load.spritesheet('Goblin_Red', Sprites.NPCs.Goblin.Red, { frameWidth: 192, frameHeight: 192 });
    this.load.spritesheet('Goblin_Purple', Sprites.NPCs.Goblin.Purple, { frameWidth: 192, frameHeight: 192 });
    this.load.spritesheet('Goblin_Yellow', Sprites.NPCs.Goblin.Yellow, { frameWidth: 192, frameHeight: 192 });
    // Soldier
    this.load.spritesheet('Soldier_Blue', Sprites.NPCs.Soldier.Blue, { frameWidth: 192, frameHeight: 192 });
    this.load.spritesheet('Soldier_Red', Sprites.NPCs.Soldier.Red, { frameWidth: 192, frameHeight: 192 });
    this.load.spritesheet('Soldier_Purple', Sprites.NPCs.Soldier.Purple, { frameWidth: 192, frameHeight: 192 });
    this.load.spritesheet('Soldier_Yellow', Sprites.NPCs.Soldier.Yellow, { frameWidth: 192, frameHeight: 192 });
    // Villager
    this.load.spritesheet('Villager_Blue', Sprites.NPCs.Villager.Blue, { frameWidth: 192, frameHeight: 192 });
    this.load.spritesheet('Villager_Red', Sprites.NPCs.Villager.Red, { frameWidth: 192, frameHeight: 192 });
    this.load.spritesheet('Villager_Purple', Sprites.NPCs.Villager.Purple, { frameWidth: 192, frameHeight: 192 });
    this.load.spritesheet('Villager_Yellow', Sprites.NPCs.Villager.Yellow, { frameWidth: 192, frameHeight: 192 });
  }

  /**
   * Creación de la escena. En este caso, solo cambiamos a la escena que representa el
   * nivel del juego
   */
  create() {
    this.scene.start('game', { mapId: 'desert', p1: 'Blue', p2: 'Red' });
  }
}