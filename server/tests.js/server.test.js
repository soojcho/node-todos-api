const expect = require('expect');
const request = require('request');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

describe('POST /todos',()=>{
  it('should create a new todo',(done)=>{
    var text = 'test todo text';

    request(app)
      .post('/todos')
      .send({text})
  })
});
