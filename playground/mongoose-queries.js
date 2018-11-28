const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var id = '5be864decb94681f1ed2f5b2';

User.findById(id).then((user)=>{
  if(!ObjectID.isValid(id)){
    return console.log('ID not valid');
  }
  if(!user){
    return console.log('User not found');
  }

  console.log('User',user);
  //console.log(JSON.stringify(user,undefined,2));
}).catch((e)=>console.log(e));

// if(!ObjectID.isValid(id)){
//   console.log('ID not valid');
// }
//
// Todo.find({
//   _id: id
// }).then((todos)=>{
//   console.log('Todos',todos);
// });
//
// Todo.findOne({
//   _id:id
// }).then((todo)=>{
//   console.log('Todo', todo);
// });
//
// Todo.findById(id).then((todo)=>{
//   if(!todo){
//     return console.log('Id not found');
//   }
//   console.log('Todo By Id', todo);
// }).catch((e)=>console.log(e));
