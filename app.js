//npm install nodemon --save-dev so the server auto restarts 
//whenever code changes.
//add  "start": "nodemon app.js" under scripts in package json
//if you named it something thats not "start", then you have to do 
//npm run "the name"

//require the filesystem package that's built into nodeJS 
const fs = require('fs');


//package lets you construct complete paths that work on all operating systems
const path = require('path');


//require express gives a function
const express = require('express');

//express function gives an object called an app object.
//app object has a bunch of functionalities. 
const app = express();


//handles incoming requests. Add a handler that should be executed on all
//incoming requests (middleware function)
//url encoded is a method that is an incoming request data parser.
//If the request has form data, it will translate data into js object
app.use(express.urlencoded({extended: false}));

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
//the name attribute in the input element gives us a key we can use to extract this data
//from the request object's body property
app.get('/', function(request, response) {
  response.send("<form action='/storeUser' method='POST'><label>your name</label><input type='text' name='username'><button>submit</button></form>")
})


//route for POST method after submitting the form
app.post('/storeUser', function(req, res){
const username = req.body.username;


//tell file system package where the file you want to write is
//dirname is a built-in variable that holds the absolute path of this project directory
const filePath = path.join(__dirname, 'data', 'users.json')

//file data is the file contents in text format
const fileData = fs.readFileSync(filePath)

//change data from text to javascript
const existingUsers = JSON.parse(fileData)

existingUsers.push(username);

//writeFileSync wants raw text not javascript
fs.writeFileSync(filePath, JSON.stringify(existingUsers))


res.send('<h1>Username stored!</h1>');
})



//route for getting file data with users
app.get('/users', function(request, response) {
  const filePath = path.join(__dirname, 'data', 'users.json')
 
const fileData = fs.readFileSync(filePath)

const existingUsers = JSON.parse(fileData)

let responseData = '<ul>';

for (const user of existingUsers){
  responseData = responseData + '<li>' + user + '</li>'
}

responseData += '</ul>'


  response.send(responseData);

})


//listen to port 3000
app.listen(3000)


