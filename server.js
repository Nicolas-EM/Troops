const path = require('path');
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const port = 8081; // El puerto
let clients = [];

app.use(express.static('./docs/'));


io.on('connection', socket => {
    console.log('a user connected');
    clients.push(socket); // metemos el socket en el array

    socket.on('disconnect', () => {
        console.log('a user disconnected');
        clients.splice(clients.indexOf(socket), 1); // lo sacamos del array
    });
});

http.listen(port, () => {
    console.log('Servidor listening on port ', port);
});