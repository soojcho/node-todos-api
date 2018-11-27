//library modules/imports
var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

//local modules/imports
//call properties/objects defined in other files for server
//configuration to datbase
var {mongoose} = require('./db/mongoose')
//model for user
var {User} = require('./models/user');
//model for todo
var {Todo} = require('./models/todo');

var app = express();
const port = process.env.PORT || 3000;

//access third-party middleware json method from the library body-parser for sending json to server
//this allows us to access "body" of req in post
app.use(bodyParser.json());

//configure routes, send json object to server with callback function so server can respond back to client.
//rest api
//CRUD operation; use post HTTP to send the resource - "create" -
//in the json format which server, once it receives the text property
//will create a new model and send the complete model with the id, completed property, completed app back to the client.
//http endpoint for todo rest api
app.post('/todos',(req, res)=>{
  //grab the resource from /todo and create an instance of mongoose model
  var todo = new Todo({
    text: req.body.text
  });

  //promise if else
  //actually save the data to database
  todo.save().then((doc)=>{
    //callback for the success case; send doc back with id, etc.
    res.send(doc);
  },(e)=>{
    //httpstatuses.com for list of http statuses
    res.status(400).send(e);
  });
});

app.get('/todos',(req,res)=>{
  Todo.find().then((todos)=>{
    res.send({todos});
  },(e)=>{
    res.status(400).send(e);
  })
});

//fetch a variable passed from url
//create a "id" variable
app.get('/todos/:id', (req, res) => {
  var id = req.params.id; //why is it from req that params object is called off of? because it's defined in the given url
  if(!ObjectID.isValid(id)){ //how does it know whether id is valid or not? baked into ObjectID from mongodb module probably.
    return res.status(404).send();//prevent function execution
  }
  Todo.findById(id).then((todo)=>{ //findbyId is from mongoose 3rd party module
    if(!todo){
      return res.status(404).send();
    }
    res.send({todo});
  }).catch((e)=>{
    res.status(400).send();
  });
});

app.delete('/todos/:id',(req,res)=>{
  var id = req.params.id;
  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }

  Todo.findByIdAndRemove(id).then((todo)=>{
    if(!todo){
      return res.status(404).send();
    }
    res.send({todo});
  }).catch((e)=>{
    res.status(400).send();
  });
});

//for now a local port '3000' to conenct to server, with a callback log text to respond with when app is up; eventually will deploy to heroku
app.listen(port,()=>{
  console.log(`started on port: ${port}`);
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
