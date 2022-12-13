var express = require('express');
const router = express.Router();
var fetch  = require('node-fetch');
var Dentist = require('../model/dentist');
// const { publish } = require("../mqtt/brokerConnector");
// const deviceRoot = "dentistimo/";
const mqtt = require("mqtt");
var mongoose = require('mongoose');
let topicResponse1 = "ui/dental-clinic";
let topicResponse2 = "ui/get-dental-clinic";

// initialize the MQTT client
const client = mqtt.connect({
  host: process.env.HOST,
  port: process.env.PORT,
  protocol: 'mqtts',
  username: process.env.USERNAME,
  password: process.env.PASSWORD
})
  
    async function getDentists(){
        try {
        const fetchDentists = await fetch("https://raw.githubusercontent.com/feldob/dit355_2020/master/dentists.json");
        const response = await fetchDentists.json();
        console.log(response.dentists);
        
        for (let i = 0; i < response.dentists.length; i++) {
            const currentDentist = new Dentist({
               id: response.dentists[i]['id'],
                name: response.dentists[i]['name'],
                owner: response.dentists[i]['owner'],
                numberOfDentists: response.dentists[i]['dentists'],
                address: response.dentists[i]['address'],
                city: response.dentists[i]['city'],
                coordinate :{
                    longitude : response.dentists[i].coordinate['longitude'],
                    latitude : response.dentists[i].coordinate['latitude'],
                },
                openinghours : {
                    monday : response.dentists[i].openinghours['monday'],
                    tuesday :response.dentists[i].openinghours['tuesday'],
                    wednesday:response.dentists[i].openinghours['wednesday'],
                    thursday :response.dentists[i].openinghours['thursday'],
                    friday :response.dentists[i].openinghours['friday'],
                },
            });
    
            const result = await findOneDentist({
                id: currentDentist.id,
              });
              if (result === null) {
                currentDentist.save();
                console.log(currentDentist.name + " saved to database.");
              } else {
                console.log(currentDentist.name + " already in database.");
              }
            }
          } catch (err) {
            return console.error(err);
          }
        };
        getDentists();

        const findOneDentist = async (filter) => {
          return Dentist.findOne(filter).exec();
        };


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

          function getDentist(topic, payload) {

            if (topic == "dentist/getdentistbyId") {
                Dentist.findOne({ _id: payload.toString() }).exec(function (err, dentists) {
                    if (err) {
                        return next(err);
                    }
                    console.log("Dental Clinic", dentists);
        
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
                Dentist.find(function (err, dentists) {
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
        module.exports.getDentists = getDentists;
        module.exports.getDentist = getDentist;
module.exports = router;