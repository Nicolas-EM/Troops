import startingData from '../magic_numbers/starting_data';
import Townhall from './buildings/Townhall';
import Building from './buildings/Building';
import NPC from './npcs/NPC';
import { Scene } from 'phaser';
import { Resources } from "../utils";

export default class Player {
  /**
   * Creates a new player instance.
   * @param {string} id - The unique identifier for the player.
   * @param {number} color - The color associated with the player.
   * @param {Building[]} buildings - An array of buildings owned by the player.
   * @param {NPC[]} npcs - An array of player0s units (troops, villagers...)
   * @param {Resources} resources - Player's resources
   * @param {NPC[]} selectedGameObjects - selected entitites (as dragged, clicked, etc...)
   * @param {Scene  } scene - The scene where the player is created.
   */
  constructor(private id: string, private color: string, private scene: Phaser.Scene, private buildings?: Building[], private npcs?: NPC[], private resources?: Resources) {

  }

  getColor(): string {
    return this.color;
  }
}
