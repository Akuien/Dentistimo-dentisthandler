# Dentist Handler

## Description
The dentist handler is responsible for fetching dentist data from the dentistry Json file and delivering it to the MQTT broker so that the user interface upon request. In addition, it saves the dentists’ data to the database so that other components can be able to access them.

## Component Responsibilities
* Read dentist data from URL (https://raw.githubusercontent.com/feldob/dit355_2020/master/dentists.json)
* Save and update the dentist data in the database
* Listen to MQTT for dentist data requests from the front end component (subscribed to topic: dentists/getAllDentists and dentists/getDentistByID)
* Publish dentistry data via MQTT 
