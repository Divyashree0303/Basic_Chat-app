const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const {Server} = require('socket.io');
const io = new Server(server);

app.set('view engine','ejs');

app.get('/', (req,res) => {
    res.render('home/home');
});

io.on('connection',socket => {
    console.log('A user connected');
    socket.on('disconnect',() => {
        console.log('user disconnected');
    });
})

io.on('connection', socket => {
    socket.on('chat message', msg => {
        console.log('message: ' + msg);
    })
})

io.on('connection', socket =>{
    socket.on('chat message', msg =>{
        io.emit('chat message',msg);
    });
});

server.listen(3000, () => {
    console.log('listening on port 3000');
});