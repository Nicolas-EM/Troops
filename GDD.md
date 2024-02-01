# Game Design Document - Title In Progress
## Introduction
### Synopsis

### Basic Information
|                 |                              |
|-----------------|------------------------------|
| Genre           | RTS (Real Time Strategy)     |
| Age Range       | 12-99                        |
| PEGI Info       | PEGI 12                      |
| Target Audience | 4x & strategy games enjoyers |


## Mechanics (space, resources, attributes, states, actions, rules, abilities, luck)
### Components
#### Buildings
##### Town Hall
![Town hall Sprite](/assets/previews/Buildings/castle.png)


##### Village House
![Village House Sprite](/assets/previews/Buildings/house.png)

##### Tower
![Tower Sprite](/assets/previews/Buildings/tower.png)

#### NPCs
##### Soldier
![Soldier Sprite](/assets/previews/NPCs/soldier.png)

##### Archer
![Archer Sprite](/assets/previews/NPCs/archer.png)

##### Villager
![Villager Sprite](/assets/previews/NPCs/villager.png)

#### Resources
##### Gold Mine
![Gold Source Sprite](/assets/previews/resources/gold_source.png)
![Gold Sprite](/assets/previews/resources/gold.png)

##### Wood
![Wood Source Sprite](/assets/previews/resources/wood_source.png)
![Wood Sprite](/assets/previews/resources/wood.png)

##### Food
![Food Source Sprite](/assets/previews/resources/food_source.png)
![Food Sprite](/assets/previews/resources/food.png)

### Actions

#### Gather
#### Build
#### Attack


## Dynamics

## Aesthetics (graphics & sound)
The graphics have been hinted in the components prior to this section. The music will compliment the overall medieval theme of the game. This will be archived through some epic themes for battle, and village-like themes for collecting resources.

## Controls
Keyboard & Mouse

## Tables and data
### Spawning/Building Cost
| Type      | Gold Cost     | Wood Cost     | Food Cost     |
|-----------|:-------------:|:-------------:|:-------------:|
| Villager  | 0             | 0             | FOOD_COST_VAR |
| Soldier   | GOLD_COST_VAR | 0             | 0             |
| Archer    | GOLD_COST_VAR | WOOD_COST_VAR | 0             |
| Town Hall | INF           | INF           | INF           |
| House     | GOLD_COST_VAR | WOOD_COST_VAR | 0             |
| Tower     | GOLD_COST_VAR | WOOD_COST_VAR | 0             |

### Spawning/Building Time
| Type      | Time (s)      |
|-----------|:-------------:|
| Villager  |               |
| Soldier   |               |
| Archer    |               |
| Town Hall |               |
| House     |               |
| Tower     |               |

### Health
| Type      | Health        |
|-----------|:-------------:|
| Villager  |               |
| Soldier   |               |
| Archer    |               |
| Town Hall |               |
| House     |               |
| Tower     |               |

### Attack Stats
| Type      | Damage        | Range         |
|-----------|:-------------:|:-------------:|
| Soldier   |               |               |
| Archer    |               |               |

### Resource Stats
| Type      | Rate          | Total Resources |
|-----------|:-------------:|:---------------:|
| Gold      |               |                 |
| Wood      |               |                 |
| Food      |               |                 |

_Note:_ Total resources per source (e.g. each gold mine generates 500 gold max, after which it no longer generates gold).

## Story and narrative (characters, plot, ending)

## Emotions

Motivation (intrinsic and extrinsic, rewards, punishment, difficulty)
Level design → Diseño del mapa?

