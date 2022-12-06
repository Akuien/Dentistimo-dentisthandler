
var fetch  = require('node-fetch');
var Dentist = require('../model/dentist');
var db = require ('../index')

var mqtt = require('../mqtt/brokerConnector');

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


//publish
function getClinic(payload) {
    try {
      let requestedClinic = JSON.parse(payload);
      getClinicFromDatabase(requestedClinic);
    } catch (error) {
      mqtt.client.publish(
        mqtt.publishedTopics.publishError,
        "Parsing error: " + error.toString()
      );
      console.log(error);
    }
  }


  const  publishAlldentists = async () => {
    const dentists = await findDentists();
    dentists.forEach((dentist) => {
      mqtt.client.publish(
        mqtt.publishedTopics.storedClinics,
        JSON.stringify(dentist),
        { qos: 2 }
      );
      console.log("Dentists:" + dentist.name + dentist.address);
    });
  };
  
  
          const getClinicFromDatabase = async (requestedClinic) => {
            let clinicID = requestedClinic._id;
            try {
              const clinic = await findDentistById(clinicID);
              if (clinic !== null) {
                mqtt.client.publish(
                  mqtt.publishedTopics.successfullClinicPublish,
                  JSON.stringify(JSON.stringify(clinic)),
                  { qos: 1 }
                );
              } else {
                mqtt.client.publish(
                  mqtt.publishedTopics.failedClinicPublish,
                  JSON.stringify({ error: "Clinic not found in the database." }),
                  { qos: 1 }
                );
              }
            } catch (err) {
              mqtt.client.publish(
                mqtt.publishedTopics.failedClinicPublish,
                JSON.stringify({ error: err.message }),
                { qos: 1 }
              );
            }
          };

       const onSubscription = () =>
          mqtt.client.on("message", async(topic, payload) => {
              console.log("message sent", topic, payload.toString());
              switch (topic) {
                  case mqtt.subscribedTopics.getAll:
                    publishAlldentists();
                    break;
                  case mqtt.subscribedTopics.getOne:
                    getClinic(payload);
                    break;
                  default:
                    break;
                }
              });
              
        const findOneDentist = async (filter) => {
          return Dentist.findOne(filter).exec();
        };

        const findDentistById = async (id) => {
            return Dentist.findById(id).exec();
          };
          
          const saveDentist = async (dentist) => {
            const data = new Dentist(dentist);
            return data.save();
          };

          const findDentists = async (filter) => {
            return Dentist.find(filter).exec();
          };
     

          module.exports.findDentists = findDentists;
          module.exports.findDentistById = findDentistById;
          module.exports.findOneDentist = findOneDentist;  
          module.exports.saveDentist = saveDentist;