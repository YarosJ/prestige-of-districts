 ### AMQPChannel class
 
Establishes AMQP connection and make able to send and receive messages from queue with methods sendToQueue() and consume()

#### Usage:
```js

const channel = await new AMQPChannel({
  queueName: '<Your Queue Name>',
  host: '<Your RabbitMQ Host>',
});

await channel.connect();

channel.sendToQueue({
  foo: 'bar',
});

nlpOutputChannel.consume((data) => {
  console.log(data);
});

```
