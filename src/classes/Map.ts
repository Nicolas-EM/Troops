import * as Phaser from 'phaser';

import ResourceSpawner from './resources/ResourceSpawner';
import Building from './buildings/Building';
import NPC from './npcs/NPC';

import TownHall from "../classes/buildings/Townhall";
import Tree from "./resources/Tree";
import Sheep from "./resources/Sheep";
import GoldMine from "./resources/GoldMine";
import Villager from "./npcs/Villager";
import Player from '../classes/Player';
import Game from '../scenes/Game';

import { PhaserNavMesh } from "phaser-navmesh";

export default class Map {
    private _map: Phaser.Tilemaps.Tilemap;
    private resourceSpawners: ResourceSpawner[];
    private buildings: Building[] = [];
    private NPCs: NPC[] = [];
    public navMesh: PhaserNavMesh;

    constructor(private scene: Game, private mapId: string, private p1: string, private p2: string) {
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
        this._map.createFromObjects('Resources/Gold', { type: "GoldMine", key: 'GoldMine', classType: GoldMine });

        // Townhalls
        let x = new Player(1, "Player 1", this.p1, this.scene); // TODO: Crear jugador real o algo

        this._map.getObjectLayer("Buildings")?.objects.forEach(obj => {
            if (obj.type === "Townhall_P1") {
                const p1_TownHall = new TownHall(this.scene, <number>obj.x, <number>obj.y, `Townhall_${this.p1}`, x);
                this.buildings.push(p1_TownHall);

                this.NPCs.push(new Villager(this.scene, <number>obj.x, <number>obj.y - 192, `Villager_${this.p1}`, x));
                this.NPCs.push(new Villager(this.scene, <number>obj.x + 320, <number>obj.y + 64, `Villager_${this.p1}`, x));
                this.NPCs.push(new Villager(this.scene, <number>obj.x + 64, <number>obj.y + 320, `Villager_${this.p1}`, x));
            } else if (obj.type === "Townhall_P2") {
                const p2_TownHall = new TownHall(this.scene, <number>obj.x, <number>obj.y, `Townhall_${this.p2}`, x);
                this.buildings.push(p2_TownHall);

                this.NPCs.push(new Villager(this.scene, <number>obj.x, <number>obj.y - 192, `Villager_${this.p2}`, x));
                this.NPCs.push(new Villager(this.scene, <number>obj.x - 320, <number>obj.y + 64, `Villager_${this.p2}`, x));
                this.NPCs.push(new Villager(this.scene, <number>obj.x - 64, <number>obj.y + 320, `Villager_${this.p2}`, x));
            }
        });

        // (<Game>this.scene).setSelectedEntity(this.NPCs[0]);

        ////////////////////////////// NAVMESH PATHFINDER //////////////////////////////    
        const layers = [waterLayer, groundLayer, grassLayer];

        this.navMesh = (<Game>this.scene).navMeshPlugin.buildMeshFromTilemap("mesh", this._map, layers, (tile) => this.navMeshIsWalkable(tile));
        // this.navMesh.enableDebug(); // Creates a Phaser.Graphics overlay on top of the screen
        // this.navMesh.debugDrawClear(); // Clears the overlay
        // Visualize the underlying navmesh

        // -->  okay wtf ? 
        // this.navMesh.debugDrawMesh({
        //     drawCentroid: true,
        //     drawBounds: false,
        //     drawNeighbors: true,
        //     drawPortals: true
        // });

        // Prueba de colision con spawner
        // let testSpawner: Sheep = <Sheep>foodSpawners[0];
        // const path = this.navMesh.findPath({ x: 4050, y: 3500 }, { x: testSpawner.x, y: testSpawner.y });

        // // Visualize an individual path
        // this.navMesh.debugDrawPath(path, 0xffd900);
    }

    tileHasObject(tile: Phaser.Tilemaps.Tile): boolean {
        for (let building of this.buildings) {
            if (tile.x >= building.x && tile.x + tile.width <= building.x && tile.y >= building.y && tile.y + tile.height <= building.y)
                return true;
        }

        for (let npc of this.NPCs) {
            if (tile.x >= npc.x && tile.x + tile.width <= npc.x && tile.y >= npc.y && tile.y + tile.height <= npc.y)
                return true;
        }

        return false;
    }

    navMeshIsWalkable(tile: Phaser.Tilemaps.Tile): boolean {
        if (tile.properties.collides || this.tileHasObject(tile)) {
            if (this.tileHasObject(tile)) {
                console.log("Tile has object");
                console.log(tile);
            }
            return false;
        }
        return true;
    }

    getWidthInPixel(): number {
        return this._map.widthInPixels;
    }

    getHeightInPixel(): number {
        return this._map.heightInPixels;
    }
}