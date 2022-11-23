var mqtt = require('mqtt');


var options = {
    host: '45fb8d87df7040eb8434cea2937cfb31.s1.eu.hivemq.cloud',
    port: 8883,
    protocol: 'mqtts',
    username: 'Team5@Broker',
    password: 'Team5@Broker'
}

// initialize the MQTT client
var client = mqtt.connect(options);



// setup the callbacks
client.on('connect', function () {
    console.log('Connected successfully');
});

client.on('error', function (error) {
    console.log(error);
});


client.on('message', function (topic, message) {
    // called each time a message is received
    console.log('Received message:', topic, message.toString());
});





// subscribe to topic 'my/test/topic'
client.subscribe('my/test/topic3');
client.subscribe('my/test/topic4');

// publish message 'Hello' to topic 'my/test/topic'
client.publish('my/test/topic1', 'Hello, Hope this is the booking handler reading');
client.publish('my/test/topic2', 'Hello, I am dentist and ironically toothless');
client.publish('my/test/topic5', 'This is topic 5');