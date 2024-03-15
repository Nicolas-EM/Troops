import * as Phaser from 'phaser';

import ResourceSpawner from './resources/ResourceSpawner';
import Building from './buildings/Building';
import NPC from './npcs/NPC';

import TownHall from "../Classes/buildings/Townhall";
import Tree from "../classes/resources/Tree";
import Sheep from "../classes/resources/Sheep";
import GoldMine from "../classes/resources/GoldMine";
import Villager from "../classes/npcs/Villager";
import Player from '../Classes/Player';
import Game from '../scenes/Game';

export default class Map {
    private _map: Phaser.Tilemaps.Tilemap;
    private resourceSpawners: ResourceSpawner[];
    private buildings: Building[];
    private NPCs: NPC[];
    public navmesh;
    constructor(private scene: Phaser.Scene, private mapId: string, private p1: string, private p2: string) {
        // Crear mapa
        this._map = this.scene.make.tilemap({ key: this.mapId });

        // Fondo
        let tileset = this._map.addTilesetImage("Water");
        const waterLayer = this._map.createLayer("Fondo/Water", tileset!);
        waterLayer?.setCollisionByProperty({ collides: true });
        tileset = this._map.addTilesetImage("Ground");
        const groundLayer = this._map.createLayer('Fondo/Ground', tileset!);
        const grassLayer = this._map.createLayer('Fondo/Grass', tileset!);

        // Resources
        const foodSpawners = this._map.createFromObjects('Resources/Food', { type: "Sheep", key: 'Sheep', classType: Sheep });
        this._map.createFromObjects('Resources/Wood', { type: "Tree", key: 'Tree', classType: Tree });
        this._map.createFromObjects('Resources/Gold', { type: "GoldMine", key: 'Gold_Inactive', classType: GoldMine });

        // Townhalls
        let x = new Player(1, "Player 1", this.p1, this.scene); // TODO: Crear jugador real o algo

        this._map.getObjectLayer("Buildings")?.objects.forEach(obj => {
            if (obj.type === "Townhall_P1") {
                const p1_TownHall = new TownHall(this.scene, <number>obj.x, <number>obj.y, `Townhall_${this.p1}`, x);

                new Villager(this.scene, <number>obj.x, <number>obj.y - 192, `Villager_${this.p1}`, x);
                new Villager(this.scene, <number>obj.x + 320, <number>obj.y + 64, `Villager_${this.p1}`, x);
                new Villager(this.scene, <number>obj.x + 64, <number>obj.y + 320, `Villager_${this.p1}`, x);
            } else if (obj.type === "Townhall_P2") {
                const p2_TownHall = new TownHall(this.scene, <number>obj.x, <number>obj.y, `Townhall_${this.p2}`, x);

                new Villager(this.scene, <number>obj.x, <number>obj.y - 192, `Villager_${this.p2}`, x);
                new Villager(this.scene, <number>obj.x - 320, <number>obj.y + 64, `Villager_${this.p2}`, x);
                new Villager(this.scene, <number>obj.x - 64, <number>obj.y + 320, `Villager_${this.p2}`, x);
            }
        });

        ////////////////////////////// NAVMESH PATHFINDER //////////////////////////////    
        const layers = [waterLayer, groundLayer, grassLayer];

        this.navmesh = (<Game>this.scene).navMeshPlugin.buildMeshFromTilemap("mesh", this._map, layers, this.navMeshIsWalkable);
      //  navMesh.enableDebug(); // Creates a Phaser.Graphics overlay on top of the screen
     //   navMesh.debugDrawClear(); // Clears the overlay
        // Visualize the underlying navmesh

        // -->  okay wtf ? 
        // navMesh.debugDrawMesh({
        //     drawCentroid: true,
        //     drawBounds: false,
        //     drawNeighbors: true,
        //     drawPortals: true
        // });

        // Prueba de colision con spawner
        // let testSpawner: Sheep = <Sheep>foodSpawners[0];
        // const path = navMesh.findPath({ x: 4050, y: 3500 }, { x: testSpawner.x, y: testSpawner.y });

        // // Visualize an individual path
        // navMesh.debugDrawPath(path, 0xffd900);
    }

    navMeshIsWalkable(tile: Phaser.Tilemaps.Tile): boolean {
        // si la tile tiene colision no se puede andar..?
        if (tile.properties.collides) {
            return false;
        }
        return true;
    }
}