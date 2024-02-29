import startingData from '../magic_numbers/starting_data';
import Townhall from './Buildings/Townhall';
import Building from './Buildings/Building';
import NPC from './NPCs/NPC';
import Resource from './Resources/resource';
import { Scene } from 'phaser';

export default class Player {


  private _id: number;
  private _name: string;
  private _color: number;
  private _townhall: Townhall;
  private _buildings: Building[];
  private _npcs: NPC[];
  private _resources: Resource[];
  private _selectedGameObjects: NPC[] | Building;
  private _scene: Phaser.Scene;

  /**
   * Creates a new player instance.
   * @param {number} id - The unique identifier for the player.
   * @param {string} name - The name of the player.
   * @param {number} color - The color associated with the player.
   * @param {Townhall} townhall - The townhall owned by the player.
   * @param {Building[]} buildings - An array of buildings owned by the player.
   * @param {NPC[]} npcs - An array of player0s units (troops, villagers...)
   * @param {Resource[]} resources - Player's resources
   * @param {NPC[]} selectedGameObjects - selected entitites (as dragged, clicked, etc...)
   * @param {Scene  } scene - The scene where the player is created.
   */
  constructor(id: number, name: string, color: number, townhall: Townhall, scene : Phaser.Scene, buildings?: Building[], npcs?: NPC[], resources?: Resource[]) {
    this._id = id;
    this._name = name;
    this._color = color;
    this._townhall = townhall;
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
    this._scene.events.on()
  }

  /**
   *
   * @returns {Resource[]} Generated starting resources
   * @private
   */
  private defaultStartingResources(): Resource[] {
    let resources: Resource[] = [];
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

  get color(): number {
    return this._color;
  }

  set color(value: number) {
    this._color = value;
  }

  get townhall(): Townhall {
    return this._townhall;
  }

  set townhall(value: Townhall) {
    this._townhall = value;
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

  get resources(): Resource[] {
    return this._resources;
  }

  set resources(value: Resource[]) {
    this._resources = value;
  }

  get selectedGameObjects(): NPC[] | Building {
    return this._selectedGameObjects;
  }

  set selectedGameObjects(value: NPC[] | Building) {
    this._selectedGameObjects = value;
  }
}
