//library modules/imports
var express = require('express');
var bodyParser = require('body-parser');

//local modules/imports
//call properties/objects defined in other files for server
//configuration to datbase
var {mongoose} = require('./db/mongoose')
//model for user
var {User} = require('./models/user');
//model for todo
var {Todo} = require('./models/todo');

var app = express();

//access third-party middleware json method from the library body-parser for sending json to server
//this allows us to access "body" of req in post
app.use(bodyParser.json());

//configure routes, send json object to server with callback function so server can respond back to client.
//rest api
//CRUD operation; use post HTTP to send the resource - "create" -
//in the json format which server, once it receives the text property
//will create a new model and send the complete model with the id, completed property, completed app back to the client.
app.post('/todos',(req, res)=>{
  //create an instance of mongoose model
  var todo = new Todo({
    text: req.body.text
  });

  //promise if else
  //actually save the data to database
  todo.save().then((doc)=>{
    //callback for the success case; send doc back
    res.send(doc);
  },(e)=>{
    //httpstatuses.com for list of http statuses
    res.status(400).send(e);
  });
});

//for now a local port '3000' to conenct to server, with a callback log text to respond with when app is up; eventually will deploy to heroku
app.listen(3000,()=>{
  console.log('started on port 3000');
});

module.exports = {app};

//Todo validation
//User validation

// var otherTodo = new Todo({
//   text: '     make this video',
//   completed: true,
//   completedat: 90
// });
//
// newTodo.save().then((doc)=>{
//   console.log('save todo',doc);
// },(e)=>{
//   console.log('unable to save');
// })
//
// var newUser = new User({
//   User: 'myname',
//   email: 'abc@de.com'
// });
