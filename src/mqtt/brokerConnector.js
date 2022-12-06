const mqtt = require('mqtt');
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })


// initialize the MQTT client
const client = mqtt.connect({
    host: process.env.HOST,
    port: process.env.PORT,
    protocol: 'mqtts',
    username: process.env.USERNAME,
    password: process.env.PASSWORD
  })

  /* client.on('connect', function () {
    // Subscribe to a topic
    client.subscribe('my/test/topic1', function () {
      // When a message arrives, print it to the console
      client.on('message', function (topic, message, packet) {
        console.log("Received '" + message + "' on '" + topic + "'")
      })
    })
}) */

// setup the callbacks
client.on('connect', function () {
    console.log('mqtt Connected successfully');
});

client.on('error', function (error) {
    console.log(error);
});


client.on('message', function (topic, message) {
    // called each time a message is received
    console.log('Received message:', topic, message.toString());
});

// subscribe to topic 'my/test/topic'
client.subscribe('my/test/topic1');
client.subscribe('my/test/topic4');
client.subscribe('dentistimo/dentists');
;


// publish message 'Hello' to topic 'my/test/topic'
client.publish('my/test/topic5', 'Hello, Hope this is the booking handler reading');
client.publish('my/test/topic6', 'Hello, I am dentist and ironically toothless');

/* const publish = async (topic, message, qos = 0) => {
  if (client) {
    client.publish("dentistimo/" + topic, message, qos);
  } else {
    publish(topic, message);
  }
}; */

//client.publish('dentists/data', 'Hello userinterface!');

