import startingData from '../magic_numbers/starting_data';
import Townhall from './buildings/Townhall';
import Building from './buildings/Building';
import NPC from './npcs/NPC';
import { Scene } from 'phaser';
import { Resources } from "../utils";

export default class Player {
  private buildings: Building[] = [];
  private npcs: NPC[] = [];
  // TODO: Default starting resources
  private resources: Resources = {
    wood: 100,
    food: 100,
    gold: 100
  }
  
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
  constructor(private id: string, private color: string, private scene: Phaser.Scene) {
    console.log(`Player color ${color}`);
  }

  getColor(): string {
    return this.color;
  }

  addNPC(npc: NPC) {
    this.npcs.push(npc);
  }

  getNPCs(): NPC[] {
    return this.npcs;
  }

  getNPCById(id: string): NPC | undefined {
    return this.npcs.find((npc) => npc.getId() === id);
  }

  addBuilding(building: Building) {
    this.buildings.push(building);
  }

  getBuildings(): Building[] {
    return this.buildings;
  }
}
