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

function getDentist(topic, payload) {

    if (topic == "dentist/getdentistbyId") {
        Dentist.findOne({ _id: payload.toString() }).exec(function (err, dentists) {
           /*  if (err) {
                return next(err);
            } */
            console.log("Clinic found: ", dentists);

            let dentistsJson = JSON.stringify(dentists);
            client.publish("ui/get-dental-clinic",dentistsJson,{ qos: 1, retain: false },
                (error) => {
                    if (error) {
                        console.error(error);
                    }
                    console.log("The dental clinic sent to ui:", dentistsJson);
                }
            );
        });
    } else if (topic == "dentist/getAllDentists") {
        Dentist.find(function (err, dentists) {
            if (err) {
                return next(err);
            }

            console.log("Clinic Found: ", dentists);

            let dentistsJson = JSON.stringify(dentists);
            client.publish("ui/dental-clinic", dentistsJson,{ qos: 1, retain: false },
                (error) => {
                    if (error) {
                        console.error(error);
                    }
                    console.log("All the Dental Clinics have been sent to the UI:", dentistsJson);
                }
            );
        });
    }
}
module.exports.getDentist = getDentist;