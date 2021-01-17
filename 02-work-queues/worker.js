#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(error0, connection) {
  if (error0) {
    throw error0;
  }

  // create the channel
  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }
    
    var queue = 'task_queue';
    
    // assert a queue into existence
    channel.assertQueue(queue, {
      durable: true
    });

    channel.prefetch(1);
 
    channel.consume(queue, function(msg) {
      var secs = msg.content.toString().split('.').length - 1;
      
      console.log(" [x] Received %s", msg.content.toString());
      
      setTimeout(function() {
        console.log(" [x] Done");
        channel.ack(msg);
      }, secs * 1000);
    }, {
      noAck: false
    }); 
  });
});

