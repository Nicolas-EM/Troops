// Información de un lobby
export default interface lobbyData {
    code: string;
    players: {id: string, color: string}[],
    availableColors: ('Red' | 'Blue' | 'Purple' | 'Yellow')[],
    readyPlayers: 0
}

// Información que tiene un icono en el HUD
 export interface IconInfo {
    name: string;
    width: number;
    height: number;
}

// Array de recursos de un jugador
export interface Resources {
    wood: number;
    food: number;
    gold: number;
}