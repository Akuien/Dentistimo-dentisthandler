const mongoose = require("mongoose");
const Dentists = require('./model/dentist.js');


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

const getDentists = async (filter) => {
    return Dentists.find(filter).exec();
};

const getDentistById = async (filter) => {
    return Dentists.findById(id).exec();
}
const findDentist = async (filter) => {
    return Dentists.findOne(filter).exec();
}

const saveDentist = async (dentist) => {
    const dentistData = new Dentists(dentist);
    return dentistData.save();
  };
  

  module.exports.getDentists = getDentists;
  module.exports.getDentistById = getDentistById;
  module.exports.findDentist = findDentist;