var expect = require('expect');

var {messageGenerator} = require('./message.js');

describe('generateMessage',() =>{
  it('should generate correct message',() =>{
    var from = "bunku";
    var text = "hello bunku";
    var message = messageGenerator(from,text);

    expect(message).toMatchObject(message,text);

  })
})
