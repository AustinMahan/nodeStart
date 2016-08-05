var http = require('http');
var stuff = [1,2,3,4,5,6,7,8,9]
const PORT=8888;
function handleRequest(request, response){
  response.setHeader('Access-Control-Allow-Origin', '*');
	response.setHeader('Access-Control-Request-Method', '*');
	response.setHeader('Access-Control-Allow-Methods', 'POST, GET');
	response.setHeader('Access-Control-Allow-Headers', '*');

console.log(request.method);
	if ( request.method === 'POST' ) {

    request.on('data', function(chunk) {
      chunk = chunk.toString()
      console.log(chunk);
      var pos = chunk.charAt(0)
      console.log(pos);
      stuff[pos] = "X"
    }).on('end', function() {
        response.writeHead(200);
        response.write(stuff)
        response.end()
    }).on('error', function(err){
      console.log(err);
      response.write(JSON.stringify(err))
      response.end()
    })
	}else{
    response.write(JSON.stringify(body))
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


//main.js
//

//index.html
/// prevent default then make ajax call to the server to get the data back
