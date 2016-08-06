var http = require('http');
var stuff = {'things':[1,2,3,4,5,6,7,8,9]}
var body = {};
const PORT=8888;
function handleRequest(request, response){
  response.setHeader('Access-Control-Allow-Origin', '*');
	response.setHeader('Access-Control-Request-Method', '*');
	response.setHeader('Access-Control-Allow-Methods', 'POST, GET');
	response.setHeader('Access-Control-Allow-Headers', '*');

console.log(request.method);

	if ( request.method === 'POST' ) {
    request.on('data', function(chunk) {
      console.log(chunk.toString());
      if(chunk.toString() == 'player1' || chunk.toString() == 'player2'){
        stuff = chunk.toString()
      }else{
        var playerAndChoice = JSON.parse(chunk.toString())
        var user = Object.keys(playerAndChoice)[0]

        if(user == 'player1'){
          var posX = playerAndChoice[user]
          stuff.things[posX-1] = "X"
        }else if(user == 'player2'){
          var posO = playerAndChoice[user]
          stuff.things[posO-1] = "O"
        }
      }
    }).on('end', function() {
        response.writeHead(200);
        response.write(JSON.stringify(stuff))
        response.end()
    }).on('error', function(err){
      console.log(err);
      response.write(JSON.stringify(err))
      response.end()
    })
	}else{
    response.write(JSON.stringify(stuff))
    response.end()
  }


  // var body = [];
  // request.on('data', function(chunk) {
  //   body.push(chunk);
  // }).on('end', function() {
  //   body = Buffer.concat(body).toString();
  //     console.log(body);
  //     response.end()
  // });

}

var server = http.createServer(handleRequest);
server.listen(PORT, function(){
  console.log("Server listening on: http://localhost:%s", PORT);
});
