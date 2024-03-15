import { io, Socket } from 'socket.io-client';
import Lobby from "./scenes/Lobby";
import lobbyData from './Classes/server/LobbyData';

class Client {
    static socket: Socket = io();

    constructor(scene: Phaser.Scene) {
        Client.joinLobby();

        Client.socket.on('updateLobby', (data: {lobby: lobbyData}) => {
            // Update player list display in the lobby scene
            if (scene.scene.isActive('lobby')) {
                (<Lobby>scene).updateLobby(data.lobby);
            }
        });
    }

    sendTest(): void {
        console.log("test sent");
        Client.socket.emit('test');
    }

    static joinLobby(): void {
        Client.socket.emit('joinLobby');
    }

    static chooseColor(color: string): void {
        Client.socket.emit('chooseColor', color);
    }
}

export default Client;