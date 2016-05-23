'use strict';

const mqtt = require('mqtt');

const client = mqtt.connect('mqtt://127.0.0.1:1883', {clientId: 'pub'});

client.on('connect', function () {
  client.publish('sub', 'message from pub', {qos: 1, retain: true});
}).on('message', function (topic, message) {
  console.log(topic + ': ' + message.toString());
  client.end();
});