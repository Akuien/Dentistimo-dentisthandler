var Dentist = require('../model/dentist');
let topic = "dentist/#";
const mqtt = require("mqtt");
  
const options = {
    host: '45fb8d87df7040eb8434cea2937cfb31.s1.eu.hivemq.cloud',
    port: 8883,
    protocol: 'mqtts',
    username: 'Team5@Broker',
    password: 'Team5@Broker'
  } 
const client = mqtt.connect(options)

function findDentist(topic, payload) {

    if (topic == "dentist/dentistById/request") {
        Dentist.findOne({ _id: payload.toString() }).exec(function (err, dentists) {
           /*  if (err) {
                return next(err);
            } */
            //console.log("Clinic found: ", dentists);

            let responseString = JSON.stringify(dentists);
            client.publish("getDentistById/response",responseString,{ qos: 1, retain: false },
                (error) => {
                    if (error) {
                        console.error(error);
                    }
                    console.log("This dental clinic sent to ui:", responseString);
                }
            );
        });
    } else if (topic == "dentist/getAllDentists/request") {
        Dentist.find(function (err, dentists) {
            if (err) {
                return next(err);
            }

            console.log("Clinics Found: ", dentists);

            let responseString = JSON.stringify(dentists);
            client.publish("getAllDentists/response", responseString, { qos: 1, retain: false },
                (error) => {
                    if (error) {
                        console.error(error);
                    }
                    console.log("All the Dental Clinics have been sent to the UI");
                }
            );
        });
    }
}
module.exports.findDentist = findDentist;