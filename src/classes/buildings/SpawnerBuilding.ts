import PlayerData from "../../magic_numbers/player_data";
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
    // TODO: magic number
    protected spawnInterval: number = 10000; // 10 seconds in milliseconds

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string | Phaser.Textures.Texture, owner: Player, health: number, totalHealth: number, visionRange: number, iconInfo: IconInfo, frame?: string | number) {
        super(scene, x, y, texture, owner, health, totalHealth, visionRange, iconInfo, frame);
    }

    queueNPC(npcType: typeof Archer | typeof Goblin | typeof Soldier | typeof Villager): void {
        console.log("NPC queued");
        this.spawnQueue.push(npcType);
        if (!this.spawnTimer)
            this.startSpawnTimer();
    }
    
    cancelNPC() {
        this.spawnQueue.shift();
    }

    spawn(): void {
        if (this.spawnQueue.length > 0) {
            const npcType = this.spawnQueue.shift();
            this._owner.addNPC(new npcType(<Game>(this.scene), this.x + this.width, this.y, this._owner));
        }
        if (this.spawnQueue.length === 0) {
            // No more NPCs in queue, stop timer
            this.stopSpawnTimer();
        }
    }

    startSpawnTimer(): void {
        this.spawnTimer = this.scene.time.addEvent({
            delay: this.spawnInterval,
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