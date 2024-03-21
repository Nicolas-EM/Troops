const path = require('path');
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const port = 8081;

// Store lobby information
const defaultLobby = {
    code: "",
    players: [],
    availableColors: ['Red', 'Blue', 'Purple', 'Yellow'],
    readyPlayers: 0
};

const lobbies = {};

const environment = process.env.NODE_ENV || 'dev';
if(environment === 'dev')
    app.use(express.static('./dist/'));
else
    app.use(express.static('./docs/'));

function assignColor(lobby) {
    const availableColors = lobby.availableColors.filter(color => !lobby.players.some(player => player.color === color));
    if (availableColors.length === 0) {
        // Handle case when no available colors are left
        return null;
    }
    const randomIndex = Math.floor(Math.random() * availableColors.length);
    const selectedColor = availableColors[randomIndex];
    lobby.availableColors.splice(randomIndex, 1); // Remove the selected color
    return selectedColor;
}

function generateLobbyCode() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
}

io.on('connection', socket => {
    console.log('User connected');

    socket.on('createLobby', (lobbyName) => {
        const lobbyCode = generateLobbyCode(); // Function to generate a unique lobby code
        lobbies[lobbyCode] = defaultLobby;
        lobbies[lobbyCode].code = lobbyCode;
        socket.join(lobbyCode);

        console.log(`Created lobby ${lobbyCode}`);

        socket.emit('lobbyCreated', lobbyCode);
    });

    // Handle lobby joining
    socket.on('joinLobby', lobbyCode => {
        console.log(`Player joined the lobby ${lobbyCode}`);
        const lobby = lobbies[lobbyCode];
        const color = assignColor(lobby);
        console.log(`Player assigned ${color}`);
        lobby.players.push({
            id: socket.id,
            color: color,
            ready: false
        });
        socket.join(lobbyCode);
        io.to(lobbyCode).emit('updateLobby', { lobby: lobby });
    });

    socket.on('chooseColor', (lobbyCode, color) => {
        const lobby = lobbies[lobbyCode];
        const playerIndex = lobby.players.findIndex(player => player.id === socket.id);
        if (playerIndex !== -1) {
            // Add original color to available colors
            lobby.availableColors.push(lobby.players[playerIndex].color);

            lobby.players[playerIndex].color = color;
            
            // Remove new color from available colors
            lobby.availableColors = lobby.availableColors.filter(availableColor => availableColor !== color);
            
            io.emit('updateLobby', { lobby: lobby });
        }
    });

    // Handle player readiness
    socket.on('ready', () => {
        console.log("player ready")
        const playerIndex = lobby.players.findIndex(player => player.id === socket.id);
        if (playerIndex !== -1) {
            if(lobby.players[playerIndex].ready) {
                console.log("not ready anymore")
                // Unready
                lobby.players[playerIndex].ready = false;
                lobby.readyPlayers--;
            } else {
                lobby.players[playerIndex].ready = true;
                lobby.readyPlayers++;
                console.log(`numPlayers: ${lobby.players.length}`);
                console.log(`readied: ${lobby.readyPlayers}`)
                if (lobby.players.length > 1 && lobby.readyPlayers === lobby.players.length) {
                    console.log("starting game")
                    io.emit('startGame', { lobby: lobby });
                }
            }
        }
    });

    // Handle player disconnecting from lobby
    // socket.on('disconnect', () => {
    //     console.log(`User disconnected`);
    //     const playerIndex = lobby.players.findIndex(player => player.id === socket.id);
    //     if (playerIndex !== -1) {
    //         const player = lobby.players[playerIndex];
    //         console.log(`Player ${player.color} disconnected`);
    //         lobby.players.splice(playerIndex, 1);
    //         io.emit('playerLeft', player.id);
    //     }
    // });

    // Set NPC Target
    socket.on('npctarget', (npc, position) => {
        io.emit('npctarget', npc, position);
    })
});

http.listen(port, () => {
    console.log('Servidor listening on port ', port);
});