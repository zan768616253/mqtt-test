'use strict';

const mqtt = require('mqtt');

const client = mqtt.connect('mqtt://127.0.0.1:1883', {clientId: 'sub', clean: false});

client.on('connect', function () {
  client.subscribe('sub');
}).on('message', function (topic, message) {
  console.log(topic + ': ' + message.toString());
  client.end();
});