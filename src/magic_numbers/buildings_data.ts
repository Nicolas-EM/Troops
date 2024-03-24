import { IconInfo, Resources } from "../utils";

// TODO revisar dimensiones

export default class BuildingsData {

    // Townhall
    public static TOWNHALL_ICON_INFO: IconInfo = {
        name: "Townhall_",
        width: 75,
        height: 65
    }
    public static TOWNHALL_HEALTH = 200;
    public static TOWNHALL_VISION_RANGE = 10;

    // Villager House
    public static VILLAGER_HOUSE_ICON_INFO: IconInfo = {
        name: "House_",        
        width: 100,
        height: 100
    }
    public static VILLAGER_HOUSE_HEALTH = 100;
    public static VILLAGER_HOUSE_VISION_RANGE = 10;
    public static VILLAGER_HOUSE_SPAWNING_TIME = 10000;
    public static VILLAGER_HOUSE_SPAWNING_COST: Resources = {
        wood: 10,
        food: 0,
        gold: 0
    }
    public static LIMIT_NPCS = 5;

    // Tower
    public static TOWER_ICON_INFO: IconInfo = {
        name: "Tower_",
        width: 100,
        height: 100
    }
    public static TOWER_HEALTH = 100;
    public static TOWER_VISION_RANGE = 10;
    public static TOWER_SPAWNING_TIME = 10000;
    public static TOWER_SPAWNING_COST: Resources = {
        wood: 10,
        food: 10,
        gold: 0
    }
    
    // Hut
    public static HUT_ICON_INFO: IconInfo = {
        name: "Hut_",
        width: 100,
        height: 100
    }
    public static HUT_HEALTH = 100;
    public static HUT_VISION_RANGE = 10;
    public static HUT_SPAWNING_TIME = 10000;
    public static HUT_SPAWNING_COST: Resources = {
        wood: 10,
        food: 0,
        gold: 10
    }

}