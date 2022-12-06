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

// setup the callbacks
client.on('connect', function () {
    console.log('Connected successfully');
});

client.on('error', function (error) {
    console.log(error);
});

const subscribedTopics = {
  getAll: "all/clinics",
  getOne: "one/clinic",
};
const subscribsionResult = Object.values(subscribedTopics);


client.on('connect', function () {
  // Subscribe to a topic
  client.subscribe(subscribsionResult, function () {
    // When a message arrives, print it to the console
    client.on('message', function (topic, message, packet) {
      console.log("Received '" + message + "' on '" + topic + "'")
    })
  })
})

const publishedTopics = {
  failedClinicPublish: "clinic/fail",
  successfullClinicPublish: "dentists/data",
  PublishError: "clinic/Error",
  storedClinics: "stored/dentists"
};


client.on('message', function (topic, message) {
    // called each time a message is received
    console.log('Received message:', topic, message.toString());
});

function UnsubscribeFromTopic() {
  subscribsionResult.forEach((topic) => {
    client.unsubscribe(topic, console.log("Unsubscribing from topic:" + topic));
  });
  client.end();
  console.log("Disconnecting from MQTT.");
}


module.exports.subscribedTopics = subscribedTopics;
module.exports.publishedTopics = publishedTopics;
module.exports.UnsubscribeFromTopic = this.UnsubscribeFromTopic;





client.on('connect', function () {
    // Subscribe to a topic
    client.subscribe('get/dentist/data', function () {
      // When a message arrives, print it to the console
      client.on('message', function (topic, message, packet) {
        console.log("Received '" + message + "' on '" + topic + "'")
      })
    })
})


// subscribe to topic 'my/test/topic'
client.subscribe('my/test/topic3');
client.subscribe('my/test/topic4');


// publish message 'Hello' to topic 'my/test/topic'
client.publish('my/test/topic1', 'Hello, Hope this is the booking handler reading');
client.publish('my/test/topic2', 'Hello, I am dentist and ironically toothless');

client.publish('dentists/data', 'Hello userinterface!');

