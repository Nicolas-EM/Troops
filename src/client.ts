import { io, Socket } from 'socket.io-client';
import Lobby from "./scenes/Lobby";
import lobbyData from './classes/server/LobbyData';
import NPC from './classes/npcs/NPC';
import Game from './scenes/Game';

class Client {
    static socket: Socket = io();
    static lobby: lobbyData;

    constructor(private scene: Phaser.Scene) {
        Client.joinLobby();

        Client.socket.on('updateLobby', (data: {lobby: lobbyData}) => {
            Client.lobby = data.lobby;
            // Update player list display in the lobby scene
            if (this.scene.scene.isActive('lobby')) {
                (<Lobby>(this.scene)).updateLobby();
            }
        });

        Client.socket.on('startGame', (data: {lobby: lobbyData}) => {
            (<Lobby>(this.scene)).startGame();
        });

        Client.socket.on('npctarget', (npcId: string, position: Phaser.Math.Vector2) => {
            (<Game>(this.scene)).setNpcTarget(npcId, position);
        })
    }

    setScene(scene: Phaser.Scene) {
        this.scene = scene;
    }

    static getMyColor(): string {
        return Client.lobby.players.find(player => player.id === Client.socket.id)?.color;
    }

    static sendTest(): void {
        console.log("test sent");
        Client.socket.emit('test');
    }

    // Lobby Functions
    static joinLobby(): void {
        Client.socket.emit('joinLobby');
    }

    static chooseColor(color: string): void {
        Client.socket.emit('chooseColor', color);
    }

    static readyUp(): void {
        Client.socket.emit('ready');
    }

    // Game Functions
    static setNpcTarget(npcId: string, position: Phaser.Math.Vector2):void {
        Client.socket.emit('npctarget', npcId, position);
    }
}

export default Client;