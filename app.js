//require express gives a function
const express = require('express');

//express function gives an object called an app object.
//app object has a bunch of functionalities. 
const app = express();


//express by default sets the status code to 200
//get method allows us to define a request handler for incoming get requests.
//1st parameter: the path
//2nd parameter: the function to execute when path is visited.
//An anonymous function is allowed.
//function takes 3 parameters automatically. request, response, and next function.
//response object has a bunch of functionalities on it to send back a response.
//the combination of a path and a request + response handler function is
//called a route or route handler.
app.get('/currenttime', function (request, response, next) {
response.send('<h1>' + new Date().toISOString() + '</h1>')
});


//another route for just / path
app.get('/', function(request, response) {
  response.send("<h1>Hello World!</h1>")
})


//listen to port 3000
app.listen(3000)


