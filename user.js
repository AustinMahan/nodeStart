$(document).ready(function(){
var changes = {}
var gameState = []


//immediatly grabs and updates using what is on the server
$.ajax({
  method: "GET",
  url: "https://localhost:8888"
}).done(function(data){
  gameState = JSON.parse(data).things
  for(var i = 0; i < 9; i++){
    changes['change' + (i+1)] = gameState[i]
    $('.change' + (i+1)).html(gameState[i])
  }
testForWinner()
}).fail(function(err){
  console.log(err);
})




//makes sure a player is selected
  var player = ''
  $('.player').click(function(){
    console.log($(this).attr('name'));
    player = $(this).attr('name')
  })
//if one of the letters is clicked then it will replace that letter on the server and on the page
  $('p').click(function(){
    if(player == ''){
      console.log('Select Player');
      return
    }
    var num = $(this).text()
    var sendData = {}
    sendData[player] = num

    $.ajax({
      method: "POST",
      url: "https://localhost:8888",
      data: JSON.stringify(sendData)
    }).done(function(data){
      gameState = JSON.parse(data).things
      for(var i = 0; i < 9; i++){
        changes['change' + (i+1)] = gameState[i]
        $('.change' + (i+1)).html(gameState[i])
      }

      if(testForWinner() != false){
        var winner = testForWinner()
        console.log(winner);
        $.ajax({
          method: 'POST',
          url: "https://localhost:8888",
          data: winner
        }).done(function(winMesg){
          $('body').append(`<p class='WinnerMes'> ${winMesg} Wins</p>`)
        }).fail(function(err){
          console.log(err);
        })
      }
    }).fail(function(err){
      console.log(err);
    })
  })

// looks if any player has 3 in a row
function testForWinner(){
  if(changes.change1 == changes.change2 && changes.change2 == changes.change3){
    if(changes.change1 == 'X'){
      console.log('player 1 wins');
      return 'player1'
    }else{
      console.log('player 2 wins');
      return 'player2'
    }
  }else if(changes.change4 == changes.change5 && changes.change5 == changes.change6){
    if(changes.change4 == 'X'){
      console.log('player 1 wins');
      return 'player1'
    }else{
      console.log('player 2 wins');
      return 'player2'
    }
  }else if(changes.change7 == changes.change8 && changes.change8 == changes.change9){
    if(changes.change7 == 'X'){
      console.log('player 1 wins');
      return 'player1'
    }else{
      console.log('player 2 wins');
      return 'player2'
    }
  }else if(changes.change1 == changes.change4 && changes.change4 == changes.change7){
    if(changes.change1 == 'X'){
      console.log('player 1 wins');
      return 'player1'
    }else{
      console.log('player 2 wins');
      return 'player2'
    }
  }else if(changes.change2 == changes.change5 && changes.change5 == changes.change8){
    if(changes.change2 == 'X'){
      console.log('player 1 wins');
      return 'player1'
    }else{
      console.log('player 2 wins');
      return 'player2'
    }
  }else if(changes.change3 == changes.change6 && changes.change6 == changes.change9){
    if(changes.change3 == 'X'){
      console.log('player 1 wins');
      return 'player1'
    }else{
      console.log('player 2 wins');
      return 'player2'
    }
  }else if(changes.change1 == changes.change5 && changes.change5 == changes.change9){
    if(changes.change1 == 'X'){
      console.log('player 1 wins');
      return 'player1'
    }else{
      console.log('player 2 wins');
      return 'player2'
    }
  }else if(changes.change3 == changes.change5 && changes.change5 == changes.change7){
    if(changes.change4 == 'X'){
      console.log('player 1 wins');
      return 'player1'
    }else{
      console.log('player 2 wins');
      return 'player2'
    }
  }
  return false;
}


})
