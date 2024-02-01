# Game Design Document - Title In Progress
## Introduction
### Synopsis
// TODO

### Basic Information
|                 |                              |
|-----------------|------------------------------|
| Genre           | RTS (Real Time Strategy)     |
| Age Range       | 12-99                        |
| PEGI Info       | PEGI 12                      |
| Target Audience | 4x & strategy games enjoyers |

## Components
### Buildings
#### Town Hall
![Town hall Sprite](/assets/previews/Buildings/castle.png)

Can spawn villagers.

#### Village House
![Village House Sprite](/assets/previews/Buildings/house.png)

Determines maximum population.

#### Tower
![Tower Sprite](/assets/previews/Buildings/tower.png)

Can spawn soldiers and archers.

### NPCs
#### Soldier
![Soldier Sprite](/assets/previews/NPCs/soldier.png)

Can deal melee damage.

#### Archer
![Archer Sprite](/assets/previews/NPCs/archer.png)

Can deal ranged damage.

#### Villager
![Villager Sprite](/assets/previews/NPCs/villager.png)

Can gather resources.

### Resources
#### Gold Mine
![Gold Source Sprite](/assets/previews/resources/gold_source.png)
![Gold Sprite](/assets/previews/resources/gold.png)

#### Wood
![Wood Source Sprite](/assets/previews/resources/wood_source.png)
![Wood Sprite](/assets/previews/resources/wood.png)

#### Food
![Food Source Sprite](/assets/previews/resources/food_source.png)
![Food Sprite](/assets/previews/resources/food.png)

## Attributes
### Player
- Resources (Gold, Wood, Food)
- Current population
- Maximum population

### Building
- Health
- Building cost
- NPC Type

### NPC
- Health
- Attack Damage
- Range

## Mechanics
### Gather
Villagers can gather a resource (gold, wood, food) at its source (mine, tree, sheep). Each source provides X > 1 of that resource per Y > 1 seconds passed.

### Build
Villagers can build houses or towers by spending gold and wood. Building takes time to complete.

### Attack
Soldiers or archers can deal damage within range to enemy NPCs or buildings.

### Spawn
A building can be used to spawn NPCs at full health. Spawning takes time and only 1 NPC can be spawned at a time.

## Dynamics

## Aesthetics (graphics & sound)
The graphics have been hinted in the components prior to this section. The music will compliment the overall medieval theme of the game. This will be archived through some epic themes for battle, and village-like themes for collecting resources.

## Controls
### Keyboard
The keys WASD can be used to move the camera around the map.

### Mouse
The mouse can be used to select individual or a group of NPCs as well as a building.

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
| Villager  | 0             | 0             |
| Soldier   |               |               |
| Archer    |               |               |

### Resource Stats
| Type      | Production Rate | Total Resources |
|-----------|:---------------:|:---------------:|
| Gold      |                 |                 |
| Wood      |                 |                 |
| Food      |                 |                 |

_Note:_ Total resources per source (e.g. each gold mine generates 500 gold max, after which it no longer generates gold).

## Story and narrative (characters, plot, ending)

## Emotions

Motivation (intrinsic and extrinsic, rewards, punishment, difficulty)
Level design → Diseño del mapa?

