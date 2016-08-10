$(document).ready(function(){
  const ctx = document.getElementById("ctx").getContext("2d");


  var brick = document.getElementById("brickimg");
  var background = document.getElementById("backgroundimg");
  var bulletImg = document.getElementById("bulletImg")
  ctx.drawImage(background, 0, 0, 1100, 500);
  for(var i = 0; i < 1100; i+=50){
    let obj = {}
    obj.x = i
    obj.y = 550
    ctx.drawImage(brick, i , 550, 50, 50)
  }
  var socket = io();

  socket.on('newPositions',function(data){
    ctx.clearRect(0,0,1100,600);
    ctx.drawImage(background, 0, 0, 1100, 600);
    for(var i = 0; i < 1100; i+=50){
      ctx.drawImage(brick, i, 550, 50, 50)
    }
    for(var i = 250; i < 500; i += 25){
      ctx.drawImage(brick, i, 400, 25, 25)
    }
    for(var i = 650; i < 900; i+=25){
      ctx.drawImage(brick, i, 250, 25, 25)
    }
    for(var i = 850; i < 1100; i += 25){
      ctx.drawImage(brick, i, 400, 25, 25)
    }
    for(var i = 0; i < 175; i+=25){
      ctx.drawImage(brick, i, 250, 25, 25)
    }
    for(var i = 0 ; i < data.length; i++){
      var xVal = data[i].x
      var yVal = data[i].y
      // console.log(data[i].number);
      if(data[i].number == 0){
        var image = document.getElementById("ironMan");
      }else if(data[i].number == 1){
        var image = document.getElementById('spiderMan')
      }else if(data[i].number == 2){
        var image = document.getElementById('thor')
      }else if(data[i].number == 3){
        var image = document.getElementById('hulk')
      }else if(data[i].number == 4){
        var image = document.getElementById('blackWidow')
      }else if(data[i].number == 5){
        var image = document.getElementById('thor')
      }else if(data[i].number == 6){
        var image = document.getElementById('spiderMan')
      }else if(data[i].number == 7){
        var image = document.getElementById('thor')
      }else{
        var image = document.getElementById("ironMan");
      }

      ctx.drawImage(image, data[i].x, data[i].y, 50,50)

      if(data[i].bullets.length > 0){
        for(var j = 0; j < data[i].bullets.length; j++){
          if(data[i].bullets[j].right){
            ctx.drawImage(bulletImg, data[i].bullets[j].x + 60, data[i].bullets[j].y + 10, 10, 10)
          }else if(data[i].bullets[j].left){
            ctx.drawImage(bulletImg, data[i].bullets[j].x - 10, data[i].bullets[j].y + 10, 10, 10)
          }
        }
      }
      if(i == 0){
        $('#p1Health').val(data[0].health)
        if(data[0].health <= 0){
          $('#player1Lost').fadeIn()
        }
      }else if(i == 1){
        $('#p2Health').val(data[1].health)
      }
    }
  });


    $('body').keydown(function(event){
      if(event.which == 87){
        //up
        socket.emit('jumpUp')
      }else if(event.which == 65){
        //left
        socket.emit('goLeft')
      }else if(event.which == 83){
        //down
        socket.emit('dropDown')
      }else if(event.which == 68){
        //right
        socket.emit('goRight')
      }else if(event.which == 32){
        //shoot
        socket.emit('pewPew')
      }
    })

    $('body').keyup(function(event){
      if(event.which == 87){
        //up
        socket.emit('jumpUpStop')
      }else if(event.which == 65){
        //left
        socket.emit('goLeftStop')
      }else if(event.which == 83){
        //down
        socket.emit('dropDownStop')
      }else if(event.which == 68){
        //right
        socket.emit('goRightStop')
      }else if(event.which == 32){
        //shoot
        socket.emit('stopPew')
      }
    })


  })
