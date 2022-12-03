const mqtt = require('mqtt')
const client = mqtt.connect('mqtt://127.0.0.1:1883')

client.on('connect', function () {
    client.subscribe('dentists/data', function () {
    })
  setInterval(function () {
    const rand = Math.random() * 100
    client.publish('dentists/data', String(rand), function () {
      console.log('Pushed: ' + rand)
    // client.end();
    })
  }, 4000)
})
