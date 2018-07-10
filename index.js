var util    = require('util');
    mosca   = require('mosca'),
    express = require('express');

/* WEB INTERFACE */

var app = express();
var serverHTTP = require('http').Server(app);
app.use(express.static('www/static'));

/*****/

var moscaSettings = {
    interfaces: [
        { type: "mqtt", port: 1883 }
    ]
};

var server = new mosca.Server(moscaSettings);
server.attachHttpServer(serverHTTP);

server.on('clientConnected', (client) => {
    //console.log('client connected', client.id);
});

// fired when a message is received
server.on('published', (packet, client) => {
    //console.log('Published', packet.payload);
    if(!client)
        return;
    console.log(util.format('Published %s by %s in %s', packet.payload, 
                            client.id, packet.topic));
});

serverHTTP.listen(8000, () => {
    console.log(util.format('WEB interface start on %i port', 8000));
});
console.log('FIRE STARTER');