// Información de un lobby
export default interface lobbyData {
    code: string;
    players: { id: string, color: string, ready: boolean }[],
    availableColors: ('Red' | 'Blue' | 'Purple' | 'Yellow')[],
    readyPlayers: 0
}

// Información que tiene un icono en el HUD
export interface IconInfo {
    name: string;
    width: number;
    height: number;
}

// Otra información del HUD
export interface HudInfo {
    entity: IconInfo,
    info: {
        health: number,
        totalHealth: number,
    },
    actions: {run: () => void, id: number}[]
}

// Array de recursos de un jugador
export interface Resources {
    wood: number;
    food: number;
    gold: number;
}