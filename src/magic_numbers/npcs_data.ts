import { IconInfo, Resources } from "../utils";

// TODO revisar dimensiones

export default class NPCsData {

    // Villager
    public static VILLAGER_ICON_INFO: IconInfo = {
        name: "Villager_",
        width: 200,
        height: 200
    }
    public static VILLAGER_HEALTH = 100;
    public static VILLAGER_VISION_RANGE = 5;
    public static VILLAGER_SPEED = 1;
    public static VILLAGER_SPAWNING_TIME = 5000;
    public static VILLAGER_SPAWNING_COST: Resources = {
        wood: 0,
        food: 10,
        gold: 0
    }
    
    // Soldier
    public static SOLDIER_ICON_INFO: IconInfo = {
        name: "Soldier_",
        width: 100,
        height: 100
    }
    public static SOLDIER_HEALTH = 100;
    public static SOLDIER_VISION_RANGE = 5;
    public static SOLDIER_SPEED = 1;
    public static SOLDIER_DAMAGE = 10;
    public static SOLDIER_ATTACK_RANGE = 10;
    public static SOLDIER_SPAWNING_TIME = 5000;    
    public static SOLDIER_SPAWNING_COST: Resources = {
        wood: 10,
        food: 10,
        gold: 0
    }

    // Archer
    public static ARCHER_ICON_INFO: IconInfo = {
        name: "Soldier_",
        width: 100,
        height: 100
    }
    public static ARCHER_HEALTH = 100;
    public static ARCHER_VISION_RANGE = 10;
    public static ARCHER_SPEED = 1;
    public static ARCHER_DAMAGE = 10;
    public static ARCHER_ATTACK_RANGE = 5;
    public static ARCHER_SPAWNING_TIME = 5000;    
    public static ARCHER_SPAWNING_COST: Resources = {
        wood: 10,
        food: 10,
        gold: 0
    }

    // Goblin
    public static GOBLIN_ICON_INFO: IconInfo = {
        name: "Soldier_",
        width: 100,
        height: 100
    }
    public static GOBLIN_HEALTH = 100;
    public static GOBLIN_VISION_RANGE = 5;
    public static GOBLIN_SPEED = 1;
    public static GOBLIN_DAMAGE = 10;
    public static GOBLIN_ATTACK_RANGE = 10;
    public static GOBLIN_SPAWNING_TIME = 5000;    
    public static GOBLIN_SPAWNING_COST: Resources = {
        wood: 10,
        food: 0,
        gold: 10
    }

}