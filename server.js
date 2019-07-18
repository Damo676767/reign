var express = require('express');
var app = express();
const port = process.env.PORT ||3000;
var server = app.listen(port);
app.use(express.static('public'));
var gamelist = [];
const Game = require('./game.js');//.default;



console.log("Running");
var socket = require('socket.io');
var io = socket(server);
io.sockets.on('connection', newConnection);


function newConnection(socket){
  console.log(socket.id);
  socket.on('startgame', startGame);
  socket.on('joingame', joinGame);

  function startGame(data){
    
    var game = new Game(socket.id)
    shuf(game.mdeck);
    console.log(socket.id+" began to host game: "+game.code);
    gamelist.push(game);
    //socket.broadcast.emit('gamestarted',socket.id);
    io.sockets.emit('gamestarted',game.code);
  }

  function joinGame(data){
    console.log(socket.id+" requested to join game: "+data);
  }

}



function shuf(x){
  var temp_val;
  var temp_index;
  for (i=x.length-1;i>0;i--){
    temp_index = Math.floor(Math.random(i+1));
    if (temp_index != i){
      temp_val = x[i];
      x[i] = x[temp_index];
      x[temp_index] = temp_val;
    }
  }
}
