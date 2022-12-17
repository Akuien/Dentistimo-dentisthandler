const mqtt = require('mqtt');
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
const Dentist = require("../controller/dentists");
var Dentist1 = require('../model/dentist');
let topicResponse1 = "ui/dental-clinic";
let topicResponse2 = "ui/get-dental-clinic";

function getDentist(topic, payload) {

  if (topic == "dentist/getdentistbyId") {
      Dentist1.findOne({ _id: payload.toString() }).exec(function (err, dentists) {
          if (err) {
              return next(err);
          }
          console.log("Dental Clinicc", dentists + 'supp')
          let dentistsJson = JSON.stringify(dentists);
          client.publish(
              topicResponse2,
              dentistsJson,
              { qos: 1, retain: false },
              (error) => {
                  if (error) {
                      console.error(error);
                  }
              }
          );
      });
  } else if (topic == "dentist/getAllDentists") {
      Dentist1.find(function (err, dentists) {
          if (err) {
              return next(err);
          }

          console.log("Dental Clinic", dentists);

          let dentistsJson = JSON.stringify(dentists);
          client.publish(
              topicResponse1,
              dentistsJson,
              { qos: 1, retain: false },
              (error) => {
                  if (error) {
                      console.error(error);
                  }
              }
          );
      });
  }
}


// initialize the MQTT client
const client = mqtt.connect({
    host: process.env.HOST,
    port: process.env.PORT,
    protocol: 'mqtts',
    username: process.env.USERNAME,
    password: process.env.PASSWORD
  })

let topic = "dentist/#";

client.on("connect", () => {
  console.log('mqtt Connected successfully');
  client.subscribe([topic], () => {
    console.log(`Subscribed to ${topic}`);
  });
});

client.on('connect', function () {
    console.log('Connected') // subscribe and publish to the same topic
    client.subscribe('dentist/getAllDentists', function (err) {
      if (!err) {
        client.publish('ui/dental-clinic', 'Hello mqtt all UI!!')
      }
    })
  })

//Dentist.getDentists()

client.on("message", (topic, payload) => {
  console.log('Received message here:', topic, payload.toString());
  console.log(payload.toString());
  getDentist(topic, payload);
});

// setup the callbacks
client.on('connect', function () {
    console.log('mqtt Connected successfully old');
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


/* client.on('message', function (topic, message) {
    // called each time a message is received
    console.log('Received message:', topic, message.toString());
}); */


// subscribe to topic 'my/test/topic'
client.subscribe('my/test/topic1');
client.subscribe('my/test/topic4');
client.subscribe('dentistimo/dentists');
;


// publish message 'Hello' to topic 'my/test/topic'
client.publish('my/test/topic5', 'Hello, Hope this is the booking handler reading');
client.publish('my/test/topic6', 'Hello, I am dentist and ironically toothless');


