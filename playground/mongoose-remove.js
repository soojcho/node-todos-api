const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove() deletes multiple records
// you can't pass in empty argument, need ot have an Object

Todo.remove({}).then((result)=>{
  console.log(result);
});

Todo.findOneAndRemove({_id:'5be84dea57cfffb51ddae1db'}).then((todo)=>{

});

//Todo.findById()
