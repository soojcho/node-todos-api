//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID();

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, db)=>{
  if(err){
    return console.log('Unable to connect to mongodb server');
  }
  console.log('Connected to mongodb server');

  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID('5be85b3e05f594ea0d8b19b8')
  },{
    $set: {
name: 'andrew'
    }
  , 
    $inc:{
      age: 1
    }
  },{
    returnOriginal: false
  }).then((result)=>{
    console.log(result);
  });

  //db.close();
});
