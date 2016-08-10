$(document).ready(function(){
  //sets the canvas to a 2d model
  const ctx = document.getElementById("ctx").getContext("2d");

  // sets all imgs to a variable that is called later
  var brick = document.getElementById("brickimg");
  var background = document.getElementById("backgroundimg");
  var bulletImg = document.getElementById("bulletImg")

  //makes the background and draws the bottom floor bricks
  ctx.drawImage(background, 0, 0, 1100, 500);
  for(var i = 0; i < 1100; i+=50){
    let obj = {}
    obj.x = i
    obj.y = 550
    ctx.drawImage(brick, i , 550, 50, 50)
  }

  //opens a socket and sets it to a variable
  var socket = io();

  //when the player recieves data from the server it exicutes the following code
  socket.on('newPositions',function(data){
    //draws the bricks and the background on the page and clears it so imgs don't replicate
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

    // selets the img of the player randomly
    for(var i = 0 ; i < data.length; i++){
      var xVal = data[i].x
      var yVal = data[i].y
      var arrOfPlayers = [document.getElementById("ironMan"), document.getElementById('spiderMan'),document.getElementById('thor'),document.getElementById('hulk'),document.getElementById('blackWidow'),document.getElementById('thor'),document.getElementById('spiderMan')]

      var image = arrOfPlayers[data[i].number]
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
      //looks at players health
      // if(i == 0){
      //   $('#p1Health').val(data[0].health)
      // }else if(i == 1){
      //   $('.player2Header').fadeIn(1)
      //   $('#p2Health').val(data[1].health)
      // }else if(i == 2){
      //   $('.player3Header').fadeIn(1)
      //   $('#p3Health').val(data[2].health)
      // }
    }
  });

  socket.on('playerHealth', function(data){
    var healthArr = Object.keys(data)
    healthArr.forEach(function(eachPlay, index){
      // console.log(eachPlay);
      console.log(index);
      $('.p' + index + 'Health').val(data[eachPlay])
    })
  })

  socket.on('lost', function(){
    $('body').empty()
    $('body').append('<h1 style="font-size: 70px;"> YOU LOSE!!!</h1>')
  })

    $('body').keydown(function(event){
      if(event.which == 38){
        //up
        socket.emit('jumpUp')
      }else if(event.which == 37){
        //left
        socket.emit('goLeft')
      }else if(event.which == 83){
        //down
        socket.emit('dropDown')
      }else if(event.which == 39){
        //right
        socket.emit('goRight')
      }else if(event.which == 32){
        //shoot
        socket.emit('pewPew')
      }
    })

    $('body').keyup(function(event){
      if(event.which == 38){
        //up
        socket.emit('jumpUpStop')
      }else if(event.which == 37){
        //left
        socket.emit('goLeftStop')
      }else if(event.which == 83){
        //down
        socket.emit('dropDownStop')
      }else if(event.which == 39){
        //right
        socket.emit('goRightStop')
      }else if(event.which == 32){
        //shoot
        socket.emit('stopPew')
      }
    })


  })
