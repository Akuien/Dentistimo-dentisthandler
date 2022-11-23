import fetch from 'node-fetch';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const DentistsSchema = new Schema({
  id: Number,
  name: String,
  owner: String,
  numberOfDentists: Number,
  address: String,
  city: String,
  coordinate: {
    longitude: String,
    latitude: String,
  },
  openinghours: {
    monday: String,
    tuesday: String,
    wednesday: String,
    thursday: String,
    friday: String,
  },
});

const Dentist = mongoose.model("dentists", DentistsSchema);

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


async function getDentists(){
const fetchDentists = await fetch("https://raw.githubusercontent.com/feldob/dit355_2020/master/dentists.json");
const response = await fetchDentists.json();
console.log(response.dentists);

for (let i = 0; i < response.dentists.length; i++) {
    const dentist = new Dentist({
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
    dentist.save()
}

}

getDentists();