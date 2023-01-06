# Dentist Handler

## Description
The dentist handler is responsible for fetching dentist data from the dentistry Json file and delivering it to the MQTT broker so that the user interface upon request. In addition, it saves the dentists’ data to the database so that other components can be able to access them.

## Component Responsibilities
* Read dentist data from URL (https://raw.githubusercontent.com/feldob/dit355_2020/master/dentists.json)

* Save and update the dentist data in the database

* Listen to MQTT for dentist data requests from the front end component (subscribed to topic: dentists/getAllDentists and dentists/getDentistByID)

* Publish dentistry data via MQTT 

## Architectural style
- **Publish and subscribe:**

The Dentist handler acts as a subscriber when receiving the dental clinic requests from the user interface component. It then searches the database for either all clinics or the requested clinic and publishes the results to the MQTT Broker.

## Technologies:
This component uses the following dependencies:

- Node JS
- HiveMQ Cloud
- Mongoose

Get started:
1. Clone the repository
2. Run `cd server`
3. To Install the component dependencies run `npm install` in the terminal 
4. And finally to start  the application prompt  `node index.js`in the terminal.

Authors and acknowledgment(Team Members)
* Akuen Akoi Deng
* MArwa Selwaye
* Kanokwan Haesatith
* Cynthia Tarwireyi
* Nazli Moghaddam
* Jonna Johansson

##
**More details about this system can be found in:** [Documentation](https://git.chalmers.se/courses/dit355/dit356-2022/t-5/t-5-documentation)

