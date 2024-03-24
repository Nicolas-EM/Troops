import * as Phaser from "phaser";
import Map from "../classes/Map";
import Hud from "./Hud";
import { PhaserNavMeshPlugin } from "phaser-navMesh";
import PlayerEntity from "../classes/PlayerEntity";
import NPC from "../classes/npcs/NPC";
import Tree from "../classes/resources/Tree";
import GoldMine from "../classes/resources/GoldMine";
import Sheep from "../classes/resources/Sheep";
import ResourceSpawner from "../classes/resources/ResourceSpawner";

// MAGIC NUMBER
const MIN_ZOOM = 0.6;
const MAX_ZOOM = 1;
const ZOOM_AMOUNT = 0.05;
const MOVEMENT_OFFSET = 10;

export default class Game extends Phaser.Scene {
  public navMeshPlugin: PhaserNavMeshPlugin;
  private p1: string; //player 1 and 2
  private p2: string;
  private pointerInMap = true;
  private mapId: string;
  private _map: Map;
  private _selectedEntity: PlayerEntity | ResourceSpawner;
  private _buildingsLayer: Phaser.GameObjects.GameObject[];
  cursors: any;
  public clickedNonTerrain: any;
  private optionsMenuOpened = false;

  constructor() {
    super({ key: "game" });
  }

  // Para pasar atributos de una escena a otra
  // En este caso, pasamos el ID del mapa
  init(data) {
    this.mapId = data.mapId;
    this.p1 = data.p1;
    this.p2 = data.p2;
  }

  create() {
    // Hud
    this.scene.run("hud");
    this.events.on("menuOpened", () => {
      this.optionsMenuOpened = true;
    });
    this.events.on("menuClosed", () => {
      this.optionsMenuOpened = false;
    });

    this._map = new Map(this, this.mapId, this.p1, this.p2);
    this.createAnimations();
    // Event listener al hacer scroll
    this.input.on("wheel", (pointer, gameObjects, deltaX, deltaY, deltaZ) => {
      if (!this.optionsMenuOpened) {
        if (deltaY > 0) {
          this.cameras.main.zoom = Phaser.Math.Clamp(
            this.cameras.main.zoom - ZOOM_AMOUNT,
            MIN_ZOOM,
            MAX_ZOOM
          );
        }
        if (deltaY < 0) {
          this.cameras.main.zoom = Phaser.Math.Clamp(
            this.cameras.main.zoom + ZOOM_AMOUNT,
            MIN_ZOOM,
            MAX_ZOOM
          );
        }
      }
    });

    this.input.on("gameout", () => (this.pointerInMap = false));
    this.input.on("gameover", () => (this.pointerInMap = true));

    // Set limits for movement
    this.cameras.main.setBounds(
      0,
      0,
      this._map.getWidthInPixel(),
      this._map.getHeightInPixel()
    );

    // WASD for camera movement
    this.cursors = this.input.keyboard!.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    });

    this.input.on(
      "pointerdown",
      (pointer: Phaser.Input.Pointer, gameObject) => {
        if (
          pointer.rightButtonDown() &&
          this.pointerInMap &&
          this._selectedEntity
        ) {
          const pointerPosition = new Phaser.Math.Vector2(
            pointer.worldX,
            pointer.worldY
          );

          if (this._selectedEntity instanceof NPC) {
            if(this.clickedNonTerrain === undefined || this.clickedNonTerrain === null){
              
              this._selectedEntity.setTarget(pointerPosition, this._map.navMesh,"none");
            }
            else{
              if(this.clickedNonTerrain instanceof Tree){
                this._selectedEntity.setTarget(pointerPosition, this._map.navMesh,"Tree");
                this.clickedNonTerrain = null;
              }
              else if(this.clickedNonTerrain instanceof GoldMine){
                this._selectedEntity.setTarget(pointerPosition, this._map.navMesh,"GoldMine");
                this.clickedNonTerrain = null;
              }
              else if(this.clickedNonTerrain instanceof Sheep){
                this._selectedEntity.setTarget(pointerPosition, this._map.navMesh,"Sheep");
                this.clickedNonTerrain = null;
                //si, esta duplicado, estoy testing
              }
              else{
                //nothing, error.
              }
              
            }
          }
        }
      }
    );
  }
  //TODO PROVISIONAL; REEMPLAZAR CON COLOR DEL PLAYER EN CUESTION!!!!
  createAnimations(): void {
    //all animations should be instanced here:
    this.createVillagerAnimations("Blue");
    this.createVillagerAnimations("Red");

    this.createSoldierAnimations("Blue");
    this.createSoldierAnimations("Red");

    this.createArcherAnimations("Blue");
    this.createArcherAnimations("Red");

    this.createGoblinAnimations("Blue");
    this.createGoblinAnimations("Red");
  }

  createVillagerAnimations(color: String): void {
    this.anims.create({
      key: `villagerIdle${color}`,
      frames: this.anims.generateFrameNumbers(`Villager_${color}`, {
        frames: [0, 1, 2, 3, 4, 5],
      }),
      frameRate: 8,
      
    });
    //we need to flip this when walking left
    this.anims.create({
      key: `villagerWalk${color}`,
      frames: this.anims.generateFrameNumbers(`Villager_${color}`, {
        frames: [6, 7, 8, 9, 10, 11],
      }),
      frameRate: 8,
      
    });
    this.anims.create({
      key: `villagerAxe${color}`,
      frames: this.anims.generateFrameNumbers(`Villager_${color}`, {
        frames: [18, 19, 20, 21, 22, 23],

      }),
      frameRate: 8,
      repeat: 5,
      
    });
    this.anims.create({
      key: `villagerHammer${color}`,
      frames: this.anims.generateFrameNumbers(`Villager_${color}`, {
        frames: [12, 13, 14, 15, 16, 17],
      }),
      frameRate: 8,
      repeat: 5,
      
    });
    //maybe this mneeds to be flipped as well..?
    // this.anims.create({
    //   key: "villagerCarrying",
    //   frames: this.anims.generateFrameNumbers(`Villager_${color}`, {
    //     frames: [24, 25, 26, 27, 28, 29],
    //   }),
    //   frameRate: 8,
    //   
    // });
    // //also flip this when walking left
    // this.anims.create({
    //   key: "villagerCarryWalk",
    //   frames: this.anims.generateFrameNumbers(`Villager_${color}`, {
    //     frames: [30, 31, 32, 33, 34, 35],
    //   }),
    //   frameRate: 8,
    //   
    // });
  }

  createSoldierAnimations(color: String): void {
    this.anims.create({
      key: `soldierIdleRight${color}`,
      frames: this.anims.generateFrameNumbers(`Soldier_${color}`, {
        frames: [0, 1, 2, 3, 4, 5],
      }),
      frameRate: 8,
      
    });

    //note, walk left is the same as this but with setFlipX(true)
    this.anims.create({
      key: `soldierWalkRight${color}`,
      frames: this.anims.generateFrameNumbers(`Soldier_${color}`, {
        frames: [6, 7, 8, 9, 10, 11],
      }),
      frameRate: 8,
      
    });
    //note, left attack is just this one, but call setFlipX(true) to attack left, then disable for normal behaviour.
    this.anims.create({
      key: `soldierAttackRight${color}`,
      frames: this.anims.generateFrameNumbers(`Soldier_${color}`, {
        frames: [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
      }),
      frameRate: 8,
      
    });
    this.anims.create({
      key: `soldierAttackDown${color}`,
      frames: this.anims.generateFrameNumbers(`Soldier_${color}`, {
        frames: [24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35],
      }),
      frameRate: 8,
      
    });
    this.anims.create({
      key: `soldierAttackUp${color}`,
      frames: this.anims.generateFrameNumbers(`Soldier_${color}`, {
        frames: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47],
      }),
      frameRate: 8,
      
    });
  }

  createArcherAnimations(color: String): void {
    this.anims.create({
      key: `archerIdleRight${color}`,
      frames: this.anims.generateFrameNumbers(`Archer_${color}`, {
        frames: [0, 1, 2, 3, 4, 5],
      }),
      frameRate: 8,
      
    });
    //flip needed
    this.anims.create({
      key: `archerWalkRight${color}`,
      frames: this.anims.generateFrameNumbers(`Archer_${color}`, {
        frames: [6, 7, 8, 9, 10, 11],
      }),
      frameRate: 8,
      
    });
    //flip needed: down
    this.anims.create({
      key: `archerShootUp${color}`,
      frames: this.anims.generateFrameNumbers(`Archer_${color}`, {
        frames: [12, 13, 14, 15, 16, 17, 18, 19],
      }),
      frameRate: 8,
      
    });
    //flip needed
    this.anims.create({
      key: `archerShootDiagonalUpRight${color}`,
      frames: this.anims.generateFrameNumbers(`Archer_${color}`, {
        frames: [20, 21, 22, 23, 24, 25, 26, 27],
      }),
      frameRate: 8,
      
    });
    //flip needed
    this.anims.create({
      key: `archerShootRight${color}`,
      frames: this.anims.generateFrameNumbers(`Archer_${color}`, {
        frames: [28, 29, 30, 31, 32, 33, 34, 35],
      }),
      frameRate: 8,
      
    });
    //flip needed
    this.anims.create({
      key: `archerShootDiagonalDownRight${color}`,
      frames: this.anims.generateFrameNumbers(`Archer_${color}`, {
        frames: [36, 37, 38, 39, 40, 41, 42, 43],
      }),
      frameRate: 8,
      
    });
    //flip needed
    this.anims.create({
      key: `archerShootDown${color}`,
      frames: this.anims.generateFrameNumbers(`Archer_${color}`, {
        frames: [44, 45, 46, 47, 48, 49, 50, 51],
      }),
      frameRate: 8,
      
    });
  }

  createGoblinAnimations(color: String): void {
    //flip needed for all
    this.anims.create({
      key: `goblinIdleRight${color}`,
      frames: this.anims.generateFrameNumbers(`Goblin_${color}`, {
        frames: [0, 1, 2, 3, 4, 5, 6 ],
      }),
      frameRate: 8,
      
    });
    this.anims.create({
      key: `goblinWalkRight${color}`,
      frames: this.anims.generateFrameNumbers(`Goblin_${color}`, {
        frames: [7, 8, 9, 10, 11, 12 ],
      }),
      frameRate: 8,
      
    });
    this.anims.create({
      key: `goblinAttackRight${color}`,
      frames: this.anims.generateFrameNumbers(`Goblin_${color}`, {
        frames: [13, 14, 15, 16, 17, 18 ],
      }),
      frameRate: 8,
      
    });
    this.anims.create({
      key: `goblinAttackDown${color}`,
      frames: this.anims.generateFrameNumbers(`Goblin_${color}`, {
        frames: [19, 20, 21, 22, 23, 24 ],
      }),
      frameRate: 8,
      
    });
    this.anims.create({
      key: `goblinAttackUp${color}`,
      frames: this.anims.generateFrameNumbers(`Goblin_${color}`, {
        frames: [25, 26, 27, 28, 29, 30 ],
      }),
      frameRate: 8,
      
    });
  }

  update(time: number, delta: number): void {
    this.cameraPan(delta);
    this.events.emit("update", time, delta);

    if (!this.optionsMenuOpened) {
      // Disable movement if menu opened
      if (this.cursors.up.isDown) {
        this.cameraMoveUp(delta);
      } else if (this.cursors.down.isDown) {
        this.cameraMoveDown(delta);
      }

      if (this.cursors.left.isDown) {
        this.cameraMoveLeft(delta);
      } else if (this.cursors.right.isDown) {
        this.cameraMoveRight(delta);
      }
    }
  }

  cameraMoveUp(delta) {
    this.cameras.main.scrollY =
      this.cameras.main.scrollY - delta / this.cameras.main.zoom;
  }

  cameraMoveDown(delta) {
    this.cameras.main.scrollY =
      this.cameras.main.scrollY + delta / this.cameras.main.zoom;
  }

  cameraMoveLeft(delta) {
    this.cameras.main.scrollX =
      this.cameras.main.scrollX - delta / this.cameras.main.zoom;
  }

  cameraMoveRight(delta) {
    this.cameras.main.scrollX =
      this.cameras.main.scrollX + delta / this.cameras.main.zoom;
  }

  cameraPan(delta: number) {
    let { width, height } = this.sys.game.canvas;
    const pointer = this.input.activePointer.position;

    if (pointer.x === 0 && pointer.y === 0) return;

    if (!this.pointerInMap) return;

    if (!this.optionsMenuOpened) {
      // Disable movement if menu opened
      if (pointer.x >= width - MOVEMENT_OFFSET && pointer.y >= MOVEMENT_OFFSET)
        this.cameraMoveRight(delta);
      else if (pointer.x <= MOVEMENT_OFFSET) this.cameraMoveLeft(delta);

      if (pointer.y >= height - MOVEMENT_OFFSET) this.cameraMoveDown(delta);
      else if (
        pointer.y <= MOVEMENT_OFFSET &&
        pointer.x <= width - MOVEMENT_OFFSET * 2
      )
        this.cameraMoveUp(delta);
    }
  }

  setSelectedEntity(entity: PlayerEntity | ResourceSpawner) {
    if (!this.optionsMenuOpened) {
      console.log("Game: Entity Selected");
      this._selectedEntity = entity;
      this.scene
        .get("hud")
        .events.emit("entityClicked", this._selectedEntity.getHudInfo());
    }
  }
}
