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
  
    var queue = 'hello';
   
    // asssert a queue into existence
    channel.assertQueue(queue, {
      durable: false
    });


    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

    // consume messages from the queue
    channel.consume(queue, function(msg) {
      console.log(" [x] Received %s", msg.content.toString());
    }, {
      noAck: true
    });
  });
});

