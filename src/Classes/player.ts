import Townhall from "./buildings/townhall";
import building from "./buildings/building";
import npc from './npcs/npc';
import resource from './resource';
import startingData from './magic_numbers/starting_data'

export default class Player {


  private _id: number;
  private _name: string;
  private _color: number;
  private _townhall: Townhall;
  private _buildings: building[];
  private _npcs: npc[];
  private _resources: resource[];
  private _selectedGameObjects: npc[] | building;

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
   */
  constructor(id: number, name: string, color: number, townhall: Townhall, buildings?: building, npcs?: npc, resources?: resource) {
    this._id = id;
    this._name = name;
    this._color = color;
    this._townhall = townhall;
    this._buildings = buildings || [];
    this._npcs = npcs || defaultStartingUnits();
    this._resources = resources || defaultStartingResources();
    this._selectedGameObjects = []; // por defecto no tienes nada seleccionado.
    Init();
  }

 /**
  * initializes player, finishes setup.
  */ 
  private Init(): void {

  }

  /**
   *
   * @returns {resource[]} Generated starting resources
   * @private
   */
  private defaultStartingResources(): resource[] {
    let resources = [];
    //do for each resource we might add
    resources.push(startingData.STARTING_PLAYER_GOLD);
    return resources;
  }

  /**
   *
   * @returns {npc[]} starting units (villagers, normally, but we can tweak)
   * @private
   */
  private defaultStartingUnits(): npc[] {
    let units = [];
    //do for each starting unit (villagers only, but for testing we might wanna start
    //with a few soldiers or something)
    units.push(startingData.STARTING_PLAYER_VILLAGERS);
    return units;
  }


/**
 * Adds unit to players' npcs
 * @param {NPC} unit - The NPC unit to add.
 * @returns {void}
 */
public addNpc(unit: NPC): void {

}

/**
 * Adds a building to player's buildings
 * @param {Building} building - The building to add.
 * @returns {void}
 */
public addBuilding(building: Building): void {

}

/**
 * GG, surrender.
 * @returns {void}
 */
public abandonGame(): void {

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
