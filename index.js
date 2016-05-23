const mosca = require('mosca');

const ascoltatore = {
  type: 'redis',
  redis: require('redis'),
  db: 12,
  port: 6379,
  return_buffers: true, // to handle binary payloads
  host: "localhost"
};

const moscaSettings = {
  port: 1883,
  backend: ascoltatore,
  persistence: {
    factory: mosca.persistence.Redis
  }
};

const server = new mosca.Server(moscaSettings);
server.on('ready', setup);

function setup() {
  console.log('Mosca server is up and running')
}

server.on('ready', function () {
  console.log('mosca server running');
}).on('clientConnected', function (client) {
  console.log('client(' + client.id + ') connected');
}).on('published', function (packet, client) {
  console.log('client(' + (client ? client.id : 'internal') + ') published topic(' + packet.topic + '): ' + packet.payload);
}).on('subscribed', function (topic, client) {
  console.log('client(' + client.id + ') subscribed topic(' + topic + ')');
}).on('unsubscribed', function (topic, client) {
  console.log('client(' + client.id + ') unsubscribed topic(' + topic + ')');
}).on('clientDisconnecting', function (client) {
  console.log('client(' + client.id + ') disconnecting');
}).on('clientDisconnected', function (client) {
  console.log('client(' + client.id + ') disconnected');
});