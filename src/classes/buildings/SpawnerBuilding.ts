import Client from "../../client";
import Game from "../../scenes/Game";
import { IconInfo } from "../../utils";
import Archer from "../npcs/Archer";
import Goblin from "../npcs/Goblin";
import NPC from "../npcs/NPC";
import Soldier from "../npcs/Soldier";
import Villager from "../npcs/Villager";
import Player from "../Player";
import Building from "./Building"

export default abstract class SpawnerBuilding extends Building {
    protected spawnQueue: (typeof Archer | typeof Goblin | typeof Soldier | typeof Villager)[] = [];
    protected spawnTimer: Phaser.Time.TimerEvent | null = null;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string | Phaser.Textures.Texture, owner: Player, health: number, totalHealth: number, visionRange: number, iconInfo: IconInfo, frame?: string | number) {
        super(scene, x, y, texture, owner, health, totalHealth, visionRange, iconInfo, frame);
    }

    queueNPC(npcType: typeof Archer | typeof Goblin | typeof Soldier | typeof Villager): void {
        if(this._owner.hasResource(npcType.COST)) {
            this._owner.pay(npcType.COST);
            this.spawnQueue.push(npcType);
            if (!this.spawnTimer)
                this.startSpawnTimer(npcType.SPAWN_TIME_MS);
        }
    }
    
    cancelNPC() {
        this.spawnQueue.shift();
    }

    spawn(): void {
        if (this.spawnQueue.length > 0 && this._owner.getNPCs().length < this._owner.getMaxPopulation()) {
            const npcType = this.spawnQueue.shift();
            Client.spawnNpc(npcType.name, this.x + this.width, this.y, this._owner.getColor());
        }
        if (this.spawnQueue.length === 0) {
            // No more NPCs in queue, stop timer
            this.stopSpawnTimer();
        }
    }

    startSpawnTimer(delay: number): void {
        this.spawnTimer = this.scene.time.addEvent({
            delay,
            callback: this.spawn,
            callbackScope: this,
            loop: true
        });
    }

    stopSpawnTimer(): void {
        if (this.spawnTimer) {
            this.spawnTimer.destroy();
            this.spawnTimer = null;
        }
    }
};