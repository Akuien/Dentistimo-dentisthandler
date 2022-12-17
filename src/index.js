
var dentistsController = require("./controller/dentists");
var mqtt = require("mqtt");
var fetch = require("node-fetch");
var mongoose = require("mongoose");
var Dentist = require('./model/dentist');
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '.env') })


// initialize the MQTT client
const client = mqtt.connect({
    host: process.env.HOST,
    port: process.env.PORT,
    protocol: 'mqtts',
    username: process.env.USERNAME,
    password: process.env.PASSWORD
  })


async function getDentists() {
    try {
      const fetchDentists = await fetch(
        "https://raw.githubusercontent.com/feldob/dit355_2020/master/dentists.json"
      );
      const response = await fetchDentists.json();
      console.log(response.dentists);
      return response.dentists;
    } catch (err) {
      return console.error(err);
    }
  }
  
  var mongoURI =
    process.env.MONGODB_URI ||
    "mongodb+srv://Dentistimo:QsyJymgvpYZZeJPc@cluster0.hnkdpp5.mongodb.net/?retryWrites=true&w=majority"; 
    // Connect to MongoDB
  mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }, function(err) {
      if (err) {
          console.error(`Failed to connect to MongoDB with URI: ${mongoURI}`);
          console.error(err.stack);
          process.exit(1);
      }
      console.log(`Connected to MongoDB with URI: ${mongoURI}`);
  }); 
  
  let topic = "dentist/getAllDentists";
  
  // prints a received message
  client.on("message", function (topic, message) {
    console.log(String.fromCharCode.apply(null, message)); // need to convert the byte array to string
  });
  
  // reassurance that the connection worked
  client.on("connect", () => {
    console.log("Connected!");
  });
  
  // prints an error message
  client.on("error", (error) => {
    console.log("Error:", error);
  });
  
  
  
  // subscribe and publish to the same topic
  client.subscribe("dentists");
  // client.subscribe([topic], () => {
  //     console.log(`Subscribe to topic '${topic}'`);
  //   });
  client.publish("message1", 'yup this message one');
  
  if (topic == "dentist/getAllDentists") {
    Dentist.find(function (err, dentists) {
      if (err) {
        return next(err);
      }
  
      // console.log("Dental Clinic", dentists);
  
      let dentistsJson = JSON.stringify(dentists);
      client.publish(
        "dentist/getAllDentists",
        dentistsJson,
        { qos: 1, retain: true },
        (error) => {
          if (error) {
            console.error(error);
          }
        }
      );
    });
  }
  




