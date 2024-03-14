import * as Phaser from 'phaser'

import * as Sprites from "../../assets/sprites";

// maps
import map_test from "../../assets/maps/test.json";
import map_desert from "../../assets/maps/desert.json";

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
    // this.load.tilemapTiledJSON("test", map_test);
    this.load.tilemapTiledJSON("desert", map_desert);

    // Fondo
    this.load.image('Ground', Sprites.Terrain.Ground.Ground);
    this.load.image('Water', Sprites.Terrain.Water.Water);
    this.load.spritesheet('Foam', Sprites.Terrain.Water.Foam, { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet('Rocks', Sprites.Terrain.Water.Rocks, { frameWidth: 128, frameHeight: 128 });

    // Decoration
    this.load.spritesheet('Decoration', Sprites.Decoration.Decoration, { frameWidth: 64, frameHeight: 64 });

    // Resources
    // Gold
    this.load.image('Gold_Inactive', Sprites.Resources.Spawners.Gold.Inactive);
    this.load.image('Gold_Active', Sprites.Resources.Spawners.Gold.Active);
    this.load.image('Gold_Destroyed', Sprites.Resources.Spawners.Gold.Destroyed);
    this.load.image('Gold', Sprites.Resources.Gold);

    // Wood
    this.load.spritesheet('Tree', Sprites.Resources.Spawners.Wood.Tree, { frameWidth: 192, frameHeight: 192 });
    this.load.image('Wood', Sprites.Resources.Wood);

    // Food
    this.load.spritesheet('Sheep', Sprites.Resources.Spawners.Food.Sheep, { frameWidth: 128, frameHeight: 128 });
    this.load.image('Food', Sprites.Resources.Food);

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

    // UI - Banners
    this.load.image('Carved_Big_Shadow', Sprites.UI.Banners.Carved_Big_Shadow);
    this.load.image('Carved_Big', Sprites.UI.Banners.Carved_Big);
    this.load.image('Carved_Rectangle_Shadow', Sprites.UI.Banners.Carved_Rectangle_Shadow);
    this.load.image('Carved_Rectangle', Sprites.UI.Banners.Carved_Rectangle);
    this.load.image('Carved_Square', Sprites.UI.Banners.Carved_Square);
    this.load.image('Connection_Down', Sprites.UI.Banners.Connection_Down);
    this.load.image('Connection_Left', Sprites.UI.Banners.Connection_Left);
    this.load.image('Connection_Right', Sprites.UI.Banners.Connection_Right);
    this.load.image('Connection_Up', Sprites.UI.Banners.Connection_Up);
    this.load.image('Horizontal', Sprites.UI.Banners.Horizontal);
    this.load.image('Vertical', Sprites.UI.Banners.Vertical);

    // UI - Buttons
    this.load.image('Blue_Big_Pressed', Sprites.UI.Buttons.Blue_Big_Pressed);
    this.load.image('Blue_Big', Sprites.UI.Buttons.Blue_Big);
    this.load.image('Blue_Pressed', Sprites.UI.Buttons.Blue_Pressed);
    this.load.image('Blue_Slides_Pressed', Sprites.UI.Buttons.Blue_Slides_Pressed);
    this.load.image('Blue_Slide', Sprites.UI.Buttons.Blue_Slides);
    this.load.image('Blue', Sprites.UI.Buttons.Blue);
    this.load.image('Disable_Big', Sprites.UI.Buttons.Disable_Big);
    this.load.image('Disable_Slides', Sprites.UI.Buttons.Disable_Slides);
    this.load.image('Disable', Sprites.UI.Buttons.Disable);
    this.load.image('Red_Big_Pressed', Sprites.UI.Buttons.Red_Big_Pressed);
    this.load.image('Red_Big', Sprites.UI.Buttons.Red_Big);
    this.load.image('Red_Pressed', Sprites.UI.Buttons.Red_Pressed);
    this.load.image('Red_Slides_Pressed', Sprites.UI.Buttons.Red_Slides_Pressed);
    this.load.image('Red_Slide', Sprites.UI.Buttons.Red_Slides);
    this.load.image('Red', Sprites.UI.Buttons.Red);
    this.load.image('Yellow_Big', Sprites.UI.Buttons.Yellow_Big);
    this.load.image('Yellow_Slides', Sprites.UI.Buttons.Yellow_Slides);
    this.load.image('Yellow', Sprites.UI.Buttons.Yellow);

    // UI - Icons
    this.load.image('Disable_1', Sprites.UI.Icons.Disable_1);
    this.load.image('Pressed_1', Sprites.UI.Icons.Pressed_1);
    this.load.image('Icon_1', Sprites.UI.Icons.Icon_1);
    this.load.image('Disable_2', Sprites.UI.Icons.Disable_2);
    this.load.image('Pressed_2', Sprites.UI.Icons.Pressed_2);
    this.load.image('Icon_2', Sprites.UI.Icons.Icon_2);
    this.load.image('Disable_3', Sprites.UI.Icons.Disable_3);
    this.load.image('Pressed_3', Sprites.UI.Icons.Pressed_3);
    this.load.image('Icon_3', Sprites.UI.Icons.Icon_3);
    this.load.spritesheet('Health', Sprites.UI.Icons.Health, { frameWidth: 509, frameHeight: 163.3 });
    this.load.image('Lock_Disable', Sprites.UI.Icons.Lock_Disable);
    this.load.image('Lock_Pressed', Sprites.UI.Icons.Lock_Pressed);
    this.load.image('Lock', Sprites.UI.Icons.Lock);
    this.load.image('Minus_Disable', Sprites.UI.Icons.Minus_Disable);
    this.load.image('Minus_Pressed', Sprites.UI.Icons.Minus_Pressed);
    this.load.image('Minus', Sprites.UI.Icons.Minus);
    this.load.image('Plus_Disable', Sprites.UI.Icons.Plus_Disable);
    this.load.image('Plus_Pressed', Sprites.UI.Icons.Plus_Pressed);
    this.load.image('Plus', Sprites.UI.Icons.Plus);
    this.load.image('Settings_Disable', Sprites.UI.Icons.Settings_Disable);
    this.load.image('Settings_Pressed', Sprites.UI.Icons.Settings_Pressed);
    this.load.image('Settings', Sprites.UI.Icons.Settings);
    this.load.image('Shop_Disable', Sprites.UI.Icons.Shop_Disable);
    this.load.image('Shop_Pressed', Sprites.UI.Icons.Shop_Pressed);
    this.load.image('Shop', Sprites.UI.Icons.Shop);
    this.load.image('Sound_Off_Disable', Sprites.UI.Icons.Sound_Off_Disable);
    this.load.image('Sound_Off', Sprites.UI.Icons.Sound_Off);
    this.load.image('Sound_On', Sprites.UI.Icons.Sound_On);
    this.load.image('X_Disable', Sprites.UI.Icons.X_Disable);
    this.load.image('X_Pressed', Sprites.UI.Icons.X_Pressed);
    this.load.image('X', Sprites.UI.Icons.X);
    this.load.spritesheet('Icons', Sprites.UI.Icons.Icons, { frameWidth: 64, frameHeight: 64 });

    // UI - Pointers
    this.load.image('Axe', Sprites.UI.Pointers.Axe);
    this.load.image('Hammer', Sprites.UI.Pointers.Hammer);
    this.load.image('Pointer', Sprites.UI.Pointers.Pointer);
    this.load.image('Selected_Bottom_Left', Sprites.UI.Pointers.Selected_Bottom_Left);
    this.load.image('Selected_Botton_Right', Sprites.UI.Pointers.Selected_Botton_Right);
    this.load.image('Selected_Top_Left', Sprites.UI.Pointers.Selected_Top_Left);
    this.load.image('Selected_Top_Right', Sprites.UI.Pointers.Selected_Top_Right);
    this.load.image('Selected', Sprites.UI.Pointers.Selected);
    this.load.image('Sword', Sprites.UI.Pointers.Sword);

    // UI - Ribbons
    this.load.image('Blue_Down_Pressed', Sprites.UI.Ribbons.Blue_Down_Pressed);
    this.load.image('Blue_Down', Sprites.UI.Ribbons.Blue_Down);
    this.load.image('Blue_Left_Pressed', Sprites.UI.Ribbons.Blue_Left_Pressed);
    this.load.image('Blue_Left', Sprites.UI.Ribbons.Blue_Left);
    this.load.image('Blue_Right_Pressed', Sprites.UI.Ribbons.Blue_Right_Pressed);
    this.load.image('Blue_Right', Sprites.UI.Ribbons.Blue_Right);
    this.load.image('Blue_Up_Pressed', Sprites.UI.Ribbons.Blue_Up_Pressed);
    this.load.image('Blue_Up', Sprites.UI.Ribbons.Blue_Up);
    this.load.image('Blue', Sprites.UI.Ribbons.Blue);
    this.load.image('Purple_Down_Pressed', Sprites.UI.Ribbons.Purple_Down_Pressed);
    this.load.image('Purple_Down', Sprites.UI.Ribbons.Purple_Down);
    this.load.image('Purple_Left_Pressed', Sprites.UI.Ribbons.Purple_Left_Pressed);
    this.load.image('Purple_Left', Sprites.UI.Ribbons.Purple_Left);
    this.load.image('Purple_Right_Pressed', Sprites.UI.Ribbons.Purple_Right_Pressed);
    this.load.image('Purple_Right', Sprites.UI.Ribbons.Purple_Right);
    this.load.image('Purple_Up_Pressed', Sprites.UI.Ribbons.Purple_Up_Pressed);
    this.load.image('Purple_Up', Sprites.UI.Ribbons.Purple_Up);
    this.load.image('Purple', Sprites.UI.Ribbons.Purple);
    this.load.image('Red_Down_Pressed', Sprites.UI.Ribbons.Red_Down_Pressed);
    this.load.image('Red_Down', Sprites.UI.Ribbons.Red_Down);
    this.load.image('Red_Left_Pressed', Sprites.UI.Ribbons.Red_Left_Pressed);
    this.load.image('Red_Left', Sprites.UI.Ribbons.Red_Left);
    this.load.image('Red_Right_Pressed', Sprites.UI.Ribbons.Red_Right_Pressed);
    this.load.image('Red_Right', Sprites.UI.Ribbons.Red_Right);
    this.load.image('Red_Up_Pressed', Sprites.UI.Ribbons.Red_Up_Pressed);
    this.load.image('Red_Up', Sprites.UI.Ribbons.Red_Up);
    this.load.image('Red', Sprites.UI.Ribbons.Red);
    this.load.image('Yellow_Down_Pressed', Sprites.UI.Ribbons.Yellow_Down_Pressed);
    this.load.image('Yellow_Down', Sprites.UI.Ribbons.Yellow_Down);
    this.load.image('Yellow_Left_Pressed', Sprites.UI.Ribbons.Yellow_Left_Pressed);
    this.load.image('Yellow_Left', Sprites.UI.Ribbons.Yellow_Left);
    this.load.image('Yellow_Right_Pressed', Sprites.UI.Ribbons.Yellow_Right_Pressed);
    this.load.image('Yellow_Right', Sprites.UI.Ribbons.Yellow_Right);
    this.load.image('Yellow_Up_Pressed', Sprites.UI.Ribbons.Yellow_Up_Pressed);
    this.load.image('Yellow_Up', Sprites.UI.Ribbons.Yellow_Up);
    this.load.image('Yellow', Sprites.UI.Ribbons.Yellow);

    // Kings
    this.load.image('King_Blue', Sprites.Kings.Blue);
    this.load.image('King_Purple', Sprites.Kings.Purple);
    this.load.image('King_Red', Sprites.Kings.Red);
    this.load.image('King_Yellow', Sprites.Kings.Yellow);
  }

  /**
   * Creación de la escena. En este caso, solo cambiamos a la escena que representa el
   * nivel del juego
   */
  create() {
    this.scene.start('game', { mapId: "desert", p1: "Blue", p2: "Red" });
  }
}