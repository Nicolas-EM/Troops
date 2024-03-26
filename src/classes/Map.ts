import * as Phaser from 'phaser';

import ResourceSpawner from './resources/ResourceSpawner';
import Building from './buildings/Building';
import NPC from './npcs/NPC';

import TownHall from "../classes/buildings/Townhall";
import Tree from "./resources/Tree";
import Sheep from "./resources/Sheep";
import GoldMine from "./resources/GoldMine";
import Villager from "./npcs/Villager";
import Tower from './buildings/Tower';
import GoblinHut from './buildings/GoblinHut';
import VillagerHouse from './buildings/VillagerHouse';

import Game from '../scenes/Game';
import Client from '../client';
import { PhaserNavMesh } from "phaser-navmesh";

export default class Map {
    private _map: Phaser.Tilemaps.Tilemap;
    private resourceSpawners: ResourceSpawner[] = [];
    private buildings: Building[] = [];
    private NPCs: NPC[] = [];
    public navMesh: PhaserNavMesh;

    constructor(private scene: Game, private mapId: string) {
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
        this.resourceSpawners = this.resourceSpawners.concat(<ResourceSpawner[]>this._map.createFromObjects('Resources/Food', { type: "Sheep", key: 'Sheep', classType: Sheep }));
        this.resourceSpawners = this.resourceSpawners.concat(<ResourceSpawner[]>this._map.createFromObjects('Resources/Wood', { type: "Tree", key: 'Tree', classType: Tree }));
        this.resourceSpawners = this.resourceSpawners.concat(<ResourceSpawner[]>this._map.createFromObjects('Resources/Gold', { type: "GoldMine", key: 'GoldMine', classType: GoldMine }));

        this._map.getObjectLayer("Buildings")?.objects.forEach(obj => {
            if (obj.type === "Townhall_P1") {
                const p1 = (<Game>(this.scene)).getP1();

                if (Client.getMyColor() === p1.getColor()){
                    this.scene.cameras.main.centerOn(<number>obj.x, <number>obj.y);
                    this.scene.cameras.main.zoom = 0.7;
                }
                const p1_TownHall = new TownHall(this.scene, <number>obj.x, <number>obj.y, p1);
                this.buildings.push(p1_TownHall);

                this.buildings.push(new Tower(this.scene, <number>obj.x + 600, <number>obj.y, p1));
                this.buildings.push(new GoblinHut(this.scene, <number>obj.x + 600, <number>obj.y + 350, p1));
                this.buildings.push(new VillagerHouse(this.scene, <number>obj.x + 600, <number>obj.y - 350, p1));

                this.NPCs.push(new Villager(this.scene, <number>obj.x, <number>obj.y - 192, p1));
                this.NPCs.push(new Villager(this.scene, <number>obj.x + 320, <number>obj.y + 64, p1));
                this.NPCs.push(new Villager(this.scene, <number>obj.x + 64, <number>obj.y + 320, p1));
            } else if (obj.type === "Townhall_P2") {
                const p2 = (<Game>(this.scene)).getP2();

                if(Client.getMyColor() === p2.getColor()){
                    this.scene.cameras.main.centerOn(<number>obj.x, <number>obj.y);
                    this.scene.cameras.main.zoom = 0.7;
                }
                const p2_TownHall = new TownHall(this.scene, <number>obj.x, <number>obj.y, p2);
                this.buildings.push(p2_TownHall);

                this.NPCs.push(new Villager(this.scene, <number>obj.x, <number>obj.y - 192, p2));
                this.NPCs.push(new Villager(this.scene, <number>obj.x - 320, <number>obj.y + 64, p2));
                this.NPCs.push(new Villager(this.scene, <number>obj.x - 64, <number>obj.y + 320, p2));
            }
        });

        // (<Game>this.scene).setSelectedEntity(this.NPCs[0]);

        ////////////////////////////// NAVMESH PATHFINDER //////////////////////////////    
        const layers = [waterLayer];

        this.navMesh = (<Game>this.scene).navMeshPlugin.buildMeshFromTilemap("mesh", this._map, layers, (tile) => this.navMeshIsWalkable(tile));
        this.navMesh.enableDebug(); // Creates a Phaser.Graphics overlay on top of the screen
        this.navMesh.debugDrawClear(); // Clears the overlay
        // Visualize the underlying navmesh
        this.navMesh.debugDrawMesh({
            drawCentroid: true,
            drawBounds: false,
            drawNeighbors: true,
            drawPortals: true
        });
    }

    tileHasObject(tile: Phaser.Tilemaps.Tile): boolean {
        for (let building of this.buildings) {
            if(tile.pixelX >= building.x - building.width / 2 && tile.pixelX <= building.x + building.width / 2 - tile.width && tile.pixelY >= building.y - building.height / 2 && tile.pixelY <= building.y + building.height / 2 - tile.height)
                return true;
        }

        return false;
    }

    navMeshIsWalkable(tile: Phaser.Tilemaps.Tile): boolean {
        if (tile.properties.collides || this.tileHasObject(tile)) {
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