const expect = require('expect');
const request = require('request');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [{
  _id: new ObjectID(),
  text: 'First test todo'
},{
  _id: new ObjectID(),
  text: 'Second test todo',
  completed: true,
  completedAt: 333
}];

beforeEach((done)=>{
  Todo.remove({}).then(()=> done());
});

describe('POST /todos',()=>{

  //specify done since it will be an asynchronous test
  //callback function takes the argument "done"
  it('should create a new todo',(done)=>{
    //decide on a string as a setup data
    var text = 'test todo text';

    //making the request via supertest
    //passing in the app we want to make the request on
    request(app)
      .post('/todos')
      .send({text})//pass an object that will be converted to json via supertest
      .expect(200)//make assertions about the request
      .expect((res)=>{//create a custom expect assertion to make sure the body comes back
        expect(res.body.text).toBe(text);
      })
      //call end to wrap things up and
      //check what got called in mongoDB collection
      .end((err,res)=>{
        if(err){
          return done(err);//stop function if error exists
        }
        //make sure the todos was added request above worked
        Todo.find().then((todos)=>{
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e)=>done(e));
      })
  })
});

//NEEDS REVIEW
describe('GET /todos',()=>{
  it('should get all todos',(done)=>{
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res)=>{
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  });
});

describe('GET /todos/:id',()=>{
  it('should return todos doc',(done)=>{//asynchronous test so needs done argument
    request(app)//supertest request from the app
      .get(`/todos/${todos[0]._id.toHexString()}`) //use the id of the first todo
      .expect(200)//assertions when this request gets fired
      .expect((res)=>{
        expect(res.body.todos.text).toBe(todos[0].text); //make sure text property we get equals text property we send
      })
      .end(done);
  });

  it('should return 404 if todo not found',(done)=>{
    var hexId = new ObjectID().toHexString();

    request(app)
      .get(`/todos/${hexId}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 for non-Object ids',(done)=>{
    reqeust(app)
      .get('/todos/123abc')
      .expect(404)
      .end(done);
  });
});

describe('DELETE /todos/:id',()=>{
  it('should remove a todo',(done)=>{
    var hexId = todos[1]._id.toHexString();

    request(app)
      .delete(`/todos/${hexId}`)
      .expect(200)
      .expect((res)=>{
        expect(res.body.todo._id).toBe(hexId);
      })
      .end((err,res)=>{
        if(err){
          return done(err);
        }

        Todo.find(hexId).then((todos)=>{//why here rather than before end?
          expect(todos).toNotExist();
          done();
        }).catch((e)=>done(e));
      })
  });
  it('should return 404 if todo not found',(done)={
    var hexId = new ObjectID().toHexString();

    request(app)
      .delete(`/todos/${hexId}`)
      .expect(404)
      .end(done);
  });
  it('should return 404 if return object is invalid',(done)=>{
    reqeust(app)
      .delete('/todos/123abc')
      .expect(404)
      .end(done);
  });
});

describe('PATCH /todos/:id',()=>{
  it('should update the todo',(done)=>{
    var hexId = todos[0]._id.toHexString();
    var text = 'this should be the new text';

    request(app)
      .patch(`/todos/${hexId}`)
      .send({
        completed: true,
        text
      })
      .expect(200)
      .expect((res)=>{
        expect(res.body.todo.text).toBe(text);
        expect(res.body.todo.completed).tobe(true);
        expect(res.body.todo.completedAt).tobeA('number');
      })
      .end(done);
  });

  it('should clear completedAt when todo is not completed',(done)=>{
    var hexId = todos[1]._id.toHexString();
    var text = 'this should be the new text!!';

    request(app)
      .patch(`/todos/${hexId}`)
      .send({
        completed: false,
        text
      })
      .expect(200)
      .expect((res)=>{
        expect(res.body.todo.text).toBe(text);
        expect(res.body.todo.completed).tobe(false);
        expect(res.body.todo.completedAt).toNotExist();
      })
      .end(done);
  });
});
