const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DentistsSchema = new Schema({
  id: { type: Number,
    unique: true },
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

module.exports = mongoose.model("dentists", DentistsSchema);