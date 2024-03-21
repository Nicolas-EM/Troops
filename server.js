const path = require('path');
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const port = 8081;

const maxPlayers = 2;

// Store lobby information
const defaultLobby = {
    code: "",
    players: [],
    availableColors: ['Red', 'Blue', 'Purple', 'Yellow'],
    readyPlayers: 0
};

const lobbies = {};

const environment = process.env.NODE_ENV || 'dev';
if (environment === 'dev')
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
    let code;
    do {
        code = Math.random().toString(36).substring(2, 8).toUpperCase();
    } while (lobbies[code] !== undefined);

    return code;
}

io.on('connection', socket => {
    console.log('User connected');

    socket.on('quickPlay', () => {
        console.log('Quick play requested');

        let availableLobby = null;

        // Find a lobby with fewer than maxPlayers
        for (const lobbyCode in lobbies) {
            const lobby = lobbies[lobbyCode];
            if (lobby.players.length < maxPlayers) {
                availableLobby = lobby;
                break;
            }
        }

        if (availableLobby) {
            // Join available lobby
            socket.emit('lobbyCreated', availableLobby.code);
        } else {
            // No available lobbies, create a new one
            const lobbyCode = generateLobbyCode(); // Function to generate a unique lobby code
            lobbies[lobbyCode] = defaultLobby;
            lobbies[lobbyCode].code = lobbyCode;
            
            socket.join(lobbyCode);
            socket.emit('lobbyCreated', lobbyCode);
        }
    });

    socket.on('createLobby', () => {
        const lobbyCode = generateLobbyCode(); // Function to generate a unique lobby code
        lobbies[lobbyCode] = defaultLobby;
        lobbies[lobbyCode].code = lobbyCode;
        
        socket.join(lobbyCode);
        socket.emit('lobbyCreated', lobbyCode);
    });

    // Handle lobby joining
    socket.on('joinLobby', (lobbyCode) => {
        const lobby = lobbies[lobbyCode];

        if (!lobby || lobby.players.length >= maxPlayers) {
            console.log(`Player failed to join lobby (doesn't exist or full)`);
            socket.emit(`exit`);    // TODO: Handle case client-side
        }
        else {
            console.log(`Player joined the lobby ${lobbyCode}`);

            const color = assignColor(lobby);

            // Add player data to lobby
            lobby.players.push({
                id: socket.id,
                color: color,
                ready: false
            });

            // register player to lobby socket
            socket.join(lobbyCode);

            // update all player's lobbies
            socket.emit('updateLobby', { lobby: lobby });
            io.to(lobbyCode).emit('updateLobby', { lobby: lobby });
        }
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
    socket.on('ready', (lobbyCode) => {
        const lobby = lobbies[lobbyCode];
        const playerIndex = lobby.players.findIndex(player => player.id === socket.id);
        if (playerIndex !== -1) {
            if (lobby.players[playerIndex].ready) {
                console.log("not ready anymore")
                // Unready
                lobby.players[playerIndex].ready = false;
                lobby.readyPlayers--;
            } else {
                lobby.players[playerIndex].ready = true;
                lobby.readyPlayers++;
            }
            io.to(lobbyCode).emit('updateLobby', { lobby: lobby });
        }
    });

    // Handle player disconnecting from lobby
    socket.on('disconnect', () => {
        // Find lobbies where the player is present
        for (const lobbyCode in lobbies) {
            const lobby = lobbies[lobbyCode];
            const playerIndex = lobby.players.findIndex(player => player.id === socket.id);

            // If player is found in the lobby
            if (playerIndex !== -1) {
                // Remove player from the lobby
                const removedPlayer = lobby.players.splice(playerIndex, 1)[0];

                // Update readyPlayers count if the player was ready
                if (removedPlayer.ready) {
                    lobby.readyPlayers--;
                }

                // Add player's color back to available colors
                if (removedPlayer.color) {
                    lobby.availableColors.push(removedPlayer.color);
                }

                // Update all players in the lobby
                io.to(lobbyCode).emit('updateLobby', { lobby: lobby });

                // If lobby becomes empty after the player leaves, remove the lobby
                if (lobby.players.length === 0) {
                    delete lobbies[lobbyCode];
                }
            }
        }
    });

    // Set NPC Target
    socket.on('npctarget', (npc, position) => {
        io.emit('npctarget', npc, position);
    })
});

http.listen(port, () => {
    console.log('Servidor listening on port ', port);
});