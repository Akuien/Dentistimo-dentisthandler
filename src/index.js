var express = require('express');
var mongoose = require('mongoose');
const mqtt = require('mqtt');
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '.env') })
var Dentist = require('./model/dentist');

var dentistsController = require("./controller/dentists");

// Variables
var mongoURI = process.env.MONGODB_URI || 'mongodb+srv://Dentistimo:QsyJymgvpYZZeJPc@cluster0.hnkdpp5.mongodb.net/?retryWrites=true&w=majority'; 
var port = process.env.PORT || 3000;
// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }, function(err) {
    if (err) {
        console.error(`Failed to connect to MongoDB with URI: ${mongoURI}`);
        console.error(err.stack);
        process.exit(1);
    }
    console.log(`Connected to MongoDB with URI: ${mongoURI}`);
}); 

// initialize the MQTT client
const client = mqtt.connect({
    host: process.env.HOST,
    port: process.env.PORT,
    protocol: 'mqtts',
    username: process.env.USERNAME,
    password: process.env.PASSWORD
  })



  let topic = "dentist/getAllDentists";
  

  client.on("message", function (topic, message) {
    console.log(String.fromCharCode.apply(null, message)); 
  });
  

  client.on("connect", () => {
    console.log("Connected!");
  });
  

  client.on("error", (error) => {
    console.log("Error:", error);
  });
  
  
  client.subscribe("dentists");
  client.publish("message1", 'yup this message one');
  
  if (topic == "dentist/getAllDentists") {
    Dentist.find(function (err, dentists) {
      if (err) {
        return next(err);
      }
  

      let dentistsJson = JSON.stringify(dentists);
      client.publish("dentist/getAllDentists", dentistsJson, { qos: 1, retain: true },
        (error) => {
          if (error) {
            console.error(error);
          }
        }
      );
    });
  }
  



