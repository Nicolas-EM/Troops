import { io, Socket } from 'socket.io-client';

interface Client {
    socket: Socket;
    sendTest: () => void;
    askNewPlayer: () => void;
    sendClick: (x: number, y: number) => void;
}

const socket = io();
export const Client: Client = {
    socket: socket,

    sendTest: function (): void {
        console.log("test sent");
        this.socket.emit('test');
    },

    askNewPlayer: function (): void {
        this.socket.emit('newplayer');
    },

    sendClick: function (x: number, y: number): void {
        this.socket.emit('click', { x: x, y: y });
    }
};

Client.socket.on('newplayer', function (data: { id: string; x: number; y: number }): void {
    // Assuming Game is defined elsewhere
    // Game.addNewPlayer(data.id, data.x, data.y);
    console.log(`new player ${data.id}`);
});

// Client.socket.on('allplayers', function (data: { id: string; x: number; y: number }[]): void {
//     for (let i = 0; i < data.length; i++) {
//         Game.addNewPlayer(data[i].id, data[i].x, data[i].y);
//     }

//     Client.socket.on('move', function (data: { id: string; x: number; y: number }): void {
//         Game.movePlayer(data.id, data.x, data.y);
//     });

//     Client.socket.on('remove', function (id: string): void {
//         Game.removePlayer(id);
//     });
// });
