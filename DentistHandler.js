const MongoDB = require("./Database");
const fetch = require("node-fetch");

// use node-fetch to get the dentist data
const fetchDentistData = async () => {
    console.log("Fetching dentists data");
    const response = await fetch(
      "https://raw.githubusercontent.com/feldob/dit355_2020/master/dentists.json"
    );
    return response.json();
  };
  
  // Save json file with dentists to mongoDB
  const saveDentists = async () => {
    try {
      const response = await fetchDentistData();
      for (let i = 0; i < response.dentists.length; i++) {
        let dentist = response.dentists[i];
        const result = await database.findOneDentist({
          id: dentist.id,
        });
        if (result === null) {
          await database.save(currentDentist);
          console.log(dentist.name + " has been saved to the database.");
        } else {
          console.log(dentist.name + " already exists in the database.");
        }
      }
    } catch (err) {
      return console.error(err);
    }
  };