import startingData from '../magic_numbers/starting_data';
import Townhall from './buildings/Townhall';
import Building from './buildings/Building';
import NPC from './npcs/NPC';
import { Scene } from 'phaser';
import { Resources } from "../utils";

export default class Player {


  private _id: number;
  private _name: string;
  private _color: string;
  private _buildings: Building[];
  private _npcs: NPC[];
  private _resources: Resources;
  private _selectedGameObjects: Phaser.GameObjects.GameObject[];
  private _scene: Phaser.Scene;

  /**
   * Creates a new player instance.
   * @param {number} id - The unique identifier for the player.
   * @param {string} name - The name of the player.
   * @param {number} color - The color associated with the player.
   * @param {Building[]} buildings - An array of buildings owned by the player.
   * @param {NPC[]} npcs - An array of player0s units (troops, villagers...)
   * @param {Resources} resources - Player's resources
   * @param {NPC[]} selectedGameObjects - selected entitites (as dragged, clicked, etc...)
   * @param {Scene  } scene - The scene where the player is created.
   */
  constructor(id: number, name: string, color: string, scene : Phaser.Scene, buildings?: Building[], npcs?: NPC[], resources?: Resources) {
    this._id = id;
    this._name = name;
    this._color = color;
    this._buildings = buildings || [];
    this._npcs = npcs || this.defaultStartingUnits();
    this._resources = resources || this.defaultStartingResources();
    this._selectedGameObjects = []; // por defecto no tienes nada seleccionado.
    this._scene = scene;
    this.Init();
  }

 /**
  * initializes player, finishes setup.
  */ 
  private Init(): void {
    this.addEventListeners();
  }

  private addEventListeners(): void {
    // this._scene.events.on()
  }

  /**
   *
   * @returns {object} Generated starting resources
   * @private
   */
  private defaultStartingResources(): Resources {
    let resources = {
      wood: 150,
      food: 230,
      gold: 100
    }
    // resources.push(startingData.STARTING_PLAYER_GOLD);
    // return resources;
    return resources;
  }

  /**
   *
   * @returns {npc[]} starting units (villagers, normally, but we can tweak)
   * @private
   */
  private defaultStartingUnits(): NPC[] {
    let units = [];
    //do for each starting unit (villagers only, but for testing we might wanna start
    //with a few soldiers or something)
    // units.push(startingData.STARTING_PLAYER_VILLAGERS);
    // return units;
    return [];
  }


/**
 * Adds unit to players' npcs
 * @param {NPC} unit - The NPC unit to add.
 * @returns {void}
 */
public addNpc(unit: NPC): void {
    this._npcs.push(unit);
}

/**
 * Adds a building to player's buildings
 * @param {Building} building - The building to add.
 * @returns {void}
 */
public addBuilding(building: Building): void {
    this._buildings.push(building);
}

/**
 * GG, surrender.
 * @returns {void}
 */
public abandonGame(): void {
  //TODO
}


  //GETTERS & SETTERS:

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get color(): string {
    return this._color;
  }

  set color(value: string) {
    this._color = value;
  }

  get buildings(): Building[] {
    return this._buildings;
  }

  set buildings(value: Building[]) {
    this._buildings = value;
  }

  get npcs(): NPC[] {
    return this._npcs;
  }

  set npcs(value: NPC[]) {
    this._npcs = value;
  }

  get resources(): object {
    return this._resources;
  }

  set resources(value: Resources) {
    this._resources = value;
  }

  get selectedGameObjects(): Phaser.GameObjects.GameObject[] {
    return this._selectedGameObjects;
  }

  set selectedGameObjects(value: Phaser.GameObjects.GameObject[]) {
    this._selectedGameObjects = value;
  }
}
