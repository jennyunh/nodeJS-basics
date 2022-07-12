const http = require("http");

/* The request object has a url property that holds the path

e.g: localhost:3000/currenttime    the url property will hold

"/currenttime" */

//function that handles incoming requests
function handleRequest(request, response) {
  if (request.url === "/currenttime") {
    response.statusCode = 200;
    response.end('<h1>' + new Date().toISOString() + '</h1>')
  } else if (request.url === "/") {
    //statusCode is a property in the response object
    //statusCode tells browser whether a request succeeded or not.
    //200 is success
    //404 is does not exist

    //localhost: 3000/currenttime

    response.statusCode = 200;

    //end preparing the reponse and send it to the client.
    response.end("<h1>HELLLLLLOOOO WOOORROLDOLODLDOLD</h1>");
  }
}

//first parameter wanted by createServer is
//a request listener.
const server = http.createServer(handleRequest);

//listen to incoming requests on port 3000
server.listen(3001);
