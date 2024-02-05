# Game Design Document - Troops
## Introduction
### Synopsis
Troops is a competitive multiplayer RTS game set in the medieval era. Two players clash on an island and must manage their resources to build a base and form an army capable of defeating their opponent. The player will attempt to destroy the enemy Town Hall in a fast-paced game filled with thrill, challenging decisions and strategy.

### Basic Information
|                 |                                                                                               |
|-----------------|-----------------------------------------------------------------------------------------------|
| Genre           | RTS (Real Time Strategy)                                                                      |
| Age Range       | 12+                                                                                           |
| PEGI Info       | PEGI 12                                                                                       |
| Target Audience | All gender, 25-40-year-olds, West, Low level players, interest in medieval history & strategy |

The age minimum is set at 12 years old due to the nature of this videogame. RTS games imply resource management and long-term planning skills, making it generally more appealing for older teenagers and youngsters (even if a child can understand the mechanics of the game). 

Regarding the target audience, players have been segmented based on gender, age, region, videogame skills and general interests. People aged between 25-40 years old are considered the primary audience for RTS games, as explained earlier. When choosing a recommended level of skills, there are four posibilities: basic, low, medium and high. Troops does not require extensive experience in videogames and the mechanics are easy to learn. However, people who primarily play smartphone apps such as "Candy Crush" may feel overwhelmed due to the ammount of information and resources the player needs to manage simultaneously. This is why the level has been set to "low". Last but not least, all the marketing resources will be directed towards young people interested in medieval history (given the game's setting), resource management, brain grames and strategy.

## Lore and context //TODO
The game is set in a medieval world, where two rival factions are fighting for control of the land. Each player is the leader of one of these factions, and must build up their base and army to defeat the enemy's Hall to win. (WIP)

## Game Session Overview
The player enters the website and can choose from three different options:
1. **PLAY**: Join a lobby and wait until matched with another player. Start a game on a randomly selected map (color selected by order of arrival, 1st blue and 2nd red).
2. **CREATE A GAME**: Generate a code to share with a friend. The creator can choose a map (or select "random") and the team color (blue, red, yellow, purple).
3. **JOIN A GAME**: Use a friend's code to join their game. The joiner can pick a team color, which must be different from the creator's team.

The game begins, with each player spawning randomly on the map with a Town Hall and three villagers. They will progressively explore the map and gather resources to build an army, and they will attempt to destroy the opponent's Town Hall by attacking them. The game has no time limit and cannot be paused, and a player wins by destroying the oponent's Town Hall, regardless of remaining resources or soldiers. There is no point system; it's a binary win or lose outcome. After the game ends, players return to the initial menu and can choose to play again or exit.

## Goal
The ultimate purpose of Troops is to provide an enjoyable gaming experience for individuals during their leisure time, allowing players to engage in a game that is not overly time-consuming and does not demand advanced skills. Despite this, Troops aims to captivate players with a complexity and depth that sets it apart from basic and repetitive smartphone games.

## Components
### Buildings

|     Name      |                           Image                               |                        Description                            |
|:-------------:|:-------------------------------------------------------------:|:-------------------------------------------------------------:|
| Town Hall     | ![Town hall Sprite](/assets/previews/Buildings/castle.png)    | Can spawn villagers. If destroyed, the player loses the game. |
| Village House | ![Village House Sprite](/assets/previews/Buildings/house.png) | Sets the maximum population.                                  |
| Tower         | ![Tower Sprite](/assets/previews/Buildings/tower.png)         | Can spawn soldiers and archers.                               |

### NPCs

|     Name      |                        Image                             |                        Description                          |
|:-------------:|:--------------------------------------------------------:|:-----------------------------------------------------------:|
| Villager      | ![Villager Sprite](/assets/previews/NPCs/villager.png)   | Can gather resources and build a village house or a tower.  |
| Soldier       | ![Soldier Sprite](/assets/previews/NPCs/soldier.png)     | Can deal melee damage using a sword against enemies.        |
| Archer        | ![Archer Sprite](/assets/previews/NPCs/archer.png)       | Can deal ranged damage by shooting arrows at enemies.       |

### Resources

|     Name      |                    Resource Image                    |                                       Description                                     | Source Image                                                     |
|:-------------:|:----------------------------------------------------:|:-------------------------------------------------------------------------------------:|:---------------------------------------------------------------:|
| Gold          | ![Gold Sprite](/assets/previews/resources/gold.png)  | Gathered in gold mines. Used for spawning soldiers and archers, and building towers.  | ![Gold Source Sprite](/assets/previews/resources/gold_source.png) |
| Wood          | ![Wood Sprite](/assets/previews/resources/wood.png)  | Obtained by chopping down trees. Used for building villager houses and towers, and spawning archers. | ![Wood Source Sprite](/assets/previews/resources/wood_source.png) |
| Food          | ![Food Sprite](/assets/previews/resources/food.png)  | Obtained from sheeps. Used for spawning villagers and soldiers. | ![Food Source Sprite](/assets/previews/resources/food_source.png) |

## Attributes
### Player
- Resources (Gold, Wood, Food)
- Current population
- Maximum population

### Building
- Health
- Vision range
- Size
- Building cost
- Building time

### NPC
- Health
- Vision range
- Size (?)
- Spawning cost
- Spawning time
- Attack Damage (soldiers and archers only)
- Range (soldiers and archers only)
- Movement speed

## MDA
### Mechanics

|     Name         |                                                                  Description                                                             |
|------------------|------------------------------------------------------------------------------------------------------------------------------------------|
| Select entities  | Allows the player to choose one or more entities to perform actions upon.                                                                |
| Move NPC         | NPCs can move around the map to explore it.                                                                                              |
| Gather           | Villagers gather resources (gold/wood/food) from their sources (mine/tree/sheep). They continue gathering until the source is depleted.  |
| Build            | Villagers build houses or towers by spending resources. The building process takes time to complete.                                     |
| Attack           | Soldiers or archers deal damage to enemy NPCs or buildings within range.                                                                 |
| Spawn            | A building is used to spawn NPCs at full health. Spawning takes time, only 1 NPC can be spawned at a time and the others will be queued. |
| Camera movement  | Allows players to navigate the map by moving the in-game camera, enabling exploration and control.                                       |

### Dynamics //TODO

### Aesthetics (graphics & sound) //TODO
The graphics have been hinted in the components prior to this section. The music will compliment the overall medieval theme of the game. This will be archived through some epic themes for battle, and village-like themes for collecting resources.

## Controls
### Keyboard
- The keys `W` `A` `S` `D` can be used to move the camera around the map.
- Pressing `Esc` will open a menu to change the settings of the game (enable/disable sound, fullscreen options...), read the help page (game controls or rules) or surrender and exit the current game.
- Hot keys:
    - While the Town Hall is selected, pressing `1` adds a villager to the spawning queue as long as the player has enough resources.
    - While a tower is selected, pressing `1` adds a soldier to the spawning queue as long as the player has enough resources.
    - While a tower is selected, pressing `2` adds an archer to the spawning queue as long as the player has enough resources.
    - While a villager is selected, pressing `1` allows you to build a new house as long as the player has enough resources.
    - While a villager is selected, pressing `2` allows you to build a new tower as long as the player has enough resources.

### Mouse
- The mouse can be used to select individual (left-click) or a group of NPCs (click&drag), or a building (left-click).
    - While a NPC(s) is selected, right-clicking in an empty location prompts the NPC(s) to move to that position.
    - While a villager is selected, right-clicking on a source (mine/tree/sheep) prompts the villager to move there and gather the resource.
    - While a villager is selected, the player can left-click on the type of building the villager will build.
    - While a villager is selected, right-clicking with a chosen building in an empty location prompts the villager to move there and start building it.
    - While a soldier or an archer is selected, right-clicking on an enemy NPC or building prompts the unit to attack.
    - While the Town Hall is selected, the player can left-click on the villager to add it to the spawning queue.
    - While a tower is selected, the player can left-click on the type of NPC (soldier/archer) that will be added to the spawning queue.

## Tables and data
### Spawning/Building Cost
| Type      | Gold Cost     | Wood Cost     | Food Cost     |
|-----------|:-------------:|:-------------:|:-------------:|
| Villager  | 0             | 0             | FCV           |
| Soldier   | GCV           | 0             | 3 * FCV       |
| Archer    | GCV           | 3 * WCV       | 0             |
| House     | 0             | WCV           | 0             |
| Tower     | 2 * GCV       | 2 * WCV       | 0             |

**GCV** = Gold cost variable

**WCV** = Wood cost variable

**FCV** = Food cost variable

### Spawning/Building Time
| Type      | Time (s)                |
|-----------|:-----------------------:|
| Villager  |         S_TIME          |
| Soldier   |     1.5 * S_TIME        |
| Archer    |     1.75 * S_TIME       |
| House     |         B_TIME          |
| Tower     |       2 * B_TIME        |

**S_TIME** = Spawning time variable

**B_TIME** = Building time variable

### Health
| Type      | Health             |
|-----------|:------------------:|
| Villager  |         N_H        |
| Soldier   |      2.5 * N_H     |
| Archer    |      1.5 * N_H     |
| Town Hall |       5 * B_H      |
| House     |        B_H         |
| Tower     |       3 * B_H      |

**N_H** = NPC health variable

**B_H** = Building health variable

### Vision Range
| Type      | Vision Range       |
|-----------|:------------------:|
| Villager  |         VIS        |
| Soldier   |         VIS        |
| Archer    |      1.5 * VIS     |
| Town Hall |       5 * VIS      |
| House     |       2 * VIS      |
| Tower     |       3 * VIS      |

**VIS** = Vision range variable

### Size
| Type      | Size (width, height)       |
|-----------|:--------------------------:|
| Villager  |      SIZE px, SIZE px      |
| Soldier   |      SIZE px, SIZE px      |
| Archer    |      SIZE px, SIZE px      |
| Town Hall |  4 * SIZE px, 2 * SIZE px  |
| House     |  3 * SIZE px, 3 * SIZE px  |
| Tower     | 3 * SIZE px, 2.5 * SIZE px |

**SIZE** = Size in pixels variable

### Movement Speed
| Type      | Speed (px/s)       |
|-----------|:------------------:|
| Villager  |         SPD        |
| Soldier   |         SPD        |
| Archer    |         SPD        |

**SPD** = Movement speed variable

### Attack and Range
| Type      | Damage             | Range              |
|-----------|:------------------:|:------------------:|
| Soldier   |  1.25 * ATK        | 0                  |
| Archer    |  ATK               | RNG                |

**ATK** = Attack damage variable

**RNG** = Range variable

### Resource Stats
| Type      | Production Rate       | Total Resources      |
|-----------|:---------------------:|:--------------------:|
| Gold      |       G_Rate          | G_Ttl                |
| Wood      |       W_Rate          | W_Ttl                |
| Food      |       F_Rate          | F_Ttl                |

_Note:_ Total resources per source (e.g. each gold mine generates 500 gold max, after which it no longer generates gold).

## Emotions //TODO

_Note:_ Rewards & punishment are not explicit due to the nature of an RTS.

-- Progress serves as an intrinsic motivation, as the player will want to improve their army to defeat the enemy. 

## Map Design
The game will feature three distinct maps, each equipped with a set of resource spawning points to achieve a balanced resource distribution in every game. Players can choose from these maps based on the gaming experience they seek.

The maps include:
- River Crossing: A symmetrical map with a river running through the middle, and only <B_Amnt> bridges to cross it. This design creates a high-pressure zone on the bridges, making them the primary route for attacking the opponent.
- Desert Oasis: This map features a central oasis surrounded by open terrain. Players are encouraged to launch fast attacks due to the vulnerability they face in this open environment.
- Mountain Pass: Players spawn in a forest at one of the four corners of the map, with a very low visibility level, and limited paths to explore it. This map enables swift attacks along defined routes while offering a strategic advantage for defense, as players can anticipate the directions of potential attacks.