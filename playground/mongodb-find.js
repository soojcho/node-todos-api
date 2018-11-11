//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID();

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, db)=>{
  if(err){
    return console.log('Unable to connect to mongodb server');
  }
  console.log('Connected to mongodb server');

  // db.collection('Todos').find({
  //   _id: new ObjectID('5be844f857cfffb51ddade94')
  // }).toArray().then((docs)=>{
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs,undefined,2));
  // },(err)=>{
  //   console.log('unable to fetch todos',err);
  // });

  // db.collection('todos').find({name: 'jen'}).count().then((count)=>{
  //   console.log(`Todos count: ${count}`);
  // },(err)=>{
  //   console.log('unable to fetch todos',err);
  // });

  db.collection('Users').find({name: 'andrew'}).toArray().then((docs)=>{

    console.log(JSON.stringify(docs,undefined,2));
  },(err)=>{
    console.log('unable to fetch todos',err);
  });

  //db.close();
});
