var http = require('http');
var url = require('url');
var stringDecoder  = require('string_decoder').StringDecoder;

var server = http.createServer(function (req,res){
  // get url and pass it
  var parseUrl = url.parse(req.url,true);

  // get the path from the url
  var path = parseUrl.pathName;

  // get the HTTP method
  var method = req.method.toLowerCase();

  // parse query string
  var queryStringObject = parseUrl.query;

  //get headers as an object
  var head = req.headers;

  //get the payload, it any
  var decoder  = new StringDecoder('utf-8');

  var buffer = '';
  // send the response
  res.on('data',function() {
    buffer += decoder.write(data);
  });

  res.on('end',function() {
    buffer += decoder.end();
    res.end("hello world\n");

    console.log("http path we get: "+path);
    console.log("method: "+method);
    console.log("query: ",queryStringObject);
    console.log("header: "+head);
  });

  //get the http method

});

server.listen(3000,function(){
  console.log("Server Listening on the port");
});
