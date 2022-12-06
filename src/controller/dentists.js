// var Dentist = require('../model/dentist');
const mqtt = require('../mqtt/brokerConnector');
const db = require('../DB');


const onSubscription = () =>
mqtt.client.on("message", async(topic, payload) => {
    console.log("message recieved", topic, payload.toString());
    switch (topic) {
        case mqtt.subscribedTopics.getAll:
          console.log("Publish all clinics");
          publishAlldentists();
          break;
        case mqtt.subscribedTopics.getOne:
          getDentists(payload);
          break;
        default:
          break;
      }
    });
    const  publishAlldentists = async () => {
      const dentists = await database.findDentists();
      dentists.forEach((dentist) => {
        mqtt.client.publish(
          mqtt.publishedTopics.storedClinicTopic,
          JSON.stringify(dentist),
          { qos: 2 }
        );
        console.log("Dentists:" + dentist.name);
      });
    };
    
 
    function getDentists(payload) {
      try {
        let requestedDentist = JSON.parse(payload);
        getDentistFromDB(requestedDentist);
      } catch (error) {
        mqtt.client.publish(
          mqtt.publishedTopics.publishError,
          "Parsing error: " + error.toString()
        );
        console.log(error);
      }
    }
    
module.exports = router;