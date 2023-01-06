const mqtt = require("mqtt");
const mongoose = require("mongoose");
const  fetchDentists  = require("./controller/fetchDentists")
const  DentistByID  = require("./controller/getDentist")

// Variables
var mongoURI = process.env.MONGODB_URI || 'mongodb+srv://Dentistimo:QsyJymgvpYZZeJPc@cluster0.hnkdpp5.mongodb.net/?retryWrites=true&w=majority'; 

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }, function(err) {
    if (err) {
        console.error(`Failed to connect to MongoDB with URI: ${mongoURI}`);
        console.error(err.stack);
        process.exit(1);
    }
    console.log(`Connected to MongoDB with URI: ${mongoURI}`);
}); 

const options = {
  host: '45fb8d87df7040eb8434cea2937cfb31.s1.eu.hivemq.cloud',
  port: 8883,
  protocol: 'mqtts',
  username: 'Team5@Broker',
  password: 'Team5@Broker'
} 

const client = mqtt.connect(options)

let topic = "dentist/#";

client.on("connect", () => {
  console.log("Connected");
  client.subscribe([topic], () => {
    // console.log(`Subscribed to ${topic}`);
  });
});

fetchDentists.fetchDentists()

client.on("message", (topic, payload) => {
  console.log('Received message here: ', topic, ':==>:', payload.toString());
  DentistByID.getDentist(topic, payload);
});

client.on("error", (error) => {
  console.log("Error:", error);
});

