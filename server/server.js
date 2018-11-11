var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose')
var {User} = require('./models/user');
var {Todo} = require('./models/todo');

var app = express();

app.use(bodyParser.json());

app.post('/todos',(req, res)=>{
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc)=>{
    res.send(doc);
  },(e)=>{
    res.status(400).send(e);
  });
});

app.listen(3000,()=>{
  console.log('started on port 3000');
});

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
