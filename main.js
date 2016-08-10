var express = require('express');
var app = express();
var serv = require('http').Server(app);

app.get('/',function(req, res) {
    res.sendFile(__dirname + '/index.html');
});
app.use('/',express.static(__dirname + '/'));

serv.listen(2000);
console.log("Server started.");

var SOCKET_LIST = {};
var playerList = {};

function Player(playerId){
	var player = {
    buttonLeft: false,
    buttonRight: false,
    buttonUp: false,
    buttonDown: false,
    shooting: false,
    health: 100,
		x:400,
		y:300,
		id:playerId,
		number: Math.floor(Math.random() * 10),
    bulletsOnScreen: []
	}
	return player
}


var shootLeft = null
var shootRight = null
function bullets(x, y, left, right){
  var bullet ={
    x: x,
    y: y,
    left: left,
    right: right
  }
  return bullet
}

var io = require('socket.io')(serv,{});

io.sockets.on('connection', function(socket){
  console.log('connected');
  socket.id = Math.random();
  SOCKET_LIST[socket.id] = socket;


	var player = new Player(socket.id)
	playerList[socket.id] = player

  socket.on('disconnect',function(){
    console.log('dosconnect');
		delete playerList[socket.id];
    delete SOCKET_LIST[socket.id];
  });


  socket.on('goLeft', function(){
		player.buttonLeft = true
    shootLeft = true
    shootRight = null
	})
  socket.on('goRight', function(){
		player.buttonRight = true
    shootLeft = null
    shootRight = true
	})
  socket.on('jumpUp',function(){
  player.buttonUp = true
  })
  socket.on('pewPew', function(){
    player.shooting = true
  })

  socket.on('goLeftStop', function(){
    player.buttonLeft = false
  })
  socket.on('goRightStop', function(){
    player.buttonRight = false
  })
  socket.on('jumpUpStop',function(){
    player.buttonUp = false
  })
  socket.on('stopPew', function(){
    player.shooting = false
  })


});



setInterval(function(){
  var pack = [];



  for(var i in playerList){
    var player = playerList[i];

    player.bulletsOnScreen.forEach(function(currBullet, index){
      if(currBullet.left){
        currBullet.x -= 20
        for(var players in playerList){
          var currPlayer = playerList[players];
          if(currBullet.x > currPlayer.x && currBullet.x < currPlayer.x + 50 && currBullet.y > currPlayer.y - 15 && currBullet.y < currPlayer.y + 40){
            player.bulletsOnScreen.splice(index, 1)
            currPlayer.health -= 2;
          }
        }
      }else if (currBullet.right) {
        currBullet.x += 20
        for(var players in playerList){
          var currPlayer = playerList[players];
          if(currPlayer.id != player.id){
            if(currBullet.x > currPlayer.x - 50 && currBullet.x < currPlayer.x && currBullet.y > currPlayer.y - 15 && currBullet.y < currPlayer.y + 40){
              player.bulletsOnScreen.splice(index, 1)
              currPlayer.health -= 2;
            }
          }
        }
      }

      if(currBullet.x > 1100 || currBullet.x < 0){
        player.bulletsOnScreen.splice(index, 1)
      }
    })

    if(player.shooting){
      bullet = new bullets(player.x, player.y, shootLeft, shootRight)
      player.bulletsOnScreen.push(bullet)
      // console.log(playerList);
    }


    if(player.buttonLeft && player.x > 10){
      if(!((player.x < 506 && player.x > 220) && (player.y > 354 && player.y < 430))){
        if(!((player.x > 600 && player.x < 906) && (player.y > 210 && player.y < 295))){
          if(!((player.x < 181) && (player.y > 204 && player.y < 275))){
            player.x -= 8
          }
        }
      }
    }

    if(player.buttonRight && player.x < 1050){
      if(!((player.x > 200 && player.x < 500) && (player.y > 354 && player.y < 430))){
        if(!((player.x > 594 && player.x < 890) && (player.y > 210 && player.y < 295))){
          if(!((player.x > 794) && (player.y > 350 && player.y < 440))){
            player.x += 8
          }
        }
      }
    }

    if(player.buttonUp && player.y > 12){
      if(!((player.y > 375 && player.y < 445) && (player.x > 200 && player.x < 500))){
        if(!((player.x > 600 && player.x < 890) && (player.y > 210 && player.y < 295))){
          if(!((player.x > 800) && (player.y > 350 && player.y < 440))){
            if(!((player.x < 175) && (player.y > 210 && player.y < 290))){
              player.y -= 18
            }
          }
        }
      }
    }

    if(player.y < 500){
      if(!((player.x > 210 && player.x < 500) && (player.y > 350 && player.y < 430))){
        if(!((player.x > 600 && player.x < 890) && (player.y > 200 && player.y < 275))){
          if(!((player.x > 800) && (player.y > 350 && player.y < 425))){
            if(!((player.x < 175) && (player.y > 200 && player.y < 275))){
              player.y += 6
            }
          }
        }
      }
    }

    pack.push({
      x:player.x,
      y:player.y,
      number:player.number,
      health: player.health,
      bullets: player.bulletsOnScreen
    });
  }
  for(var i in SOCKET_LIST){
    var socket = SOCKET_LIST[i];
    socket.emit('newPositions',pack);
    // socket.emit('bulletStuf', bulletsOnScreen)
	}



},100);
