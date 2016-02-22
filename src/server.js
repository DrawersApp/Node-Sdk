//var XMPP = require('stanza.io');
var mqtt = require('mqtt');
var providerManager = require('./providermanager');
//var client = XMPP.createClient({
//    // Email - deploymentbotdrawers@gmail.com to get you username and password.
//    jid: '3f537dec-4b4c-44b3-8af8-7c9b613b6a7e@ejabberd.sandwitch.in',
//    password: '31e90675-e0fd-453d-9bda-05d5bbce9dd2',
//    transport: 'websocket',
//    wsURL: 'ws://ejabberd.sandwitch.in:5280/websocket'
//});
//
//// Bot logged in.
//client.on('session:started', function () {
//    client.getRoster();
//    client.sendPresence();
//    console.log("Session started");
//});
//
//// TODO - Main method to override..
//client.on('chat', function (msg) {
//    var input = msg.body;
//    var output = input; // This is the input from chat. Generate the output based on it - make rest, jdbc, or anything else :).
//    client.sendMessage({
//      to: msg.from,
//      type: 'chat',
//      requestReceipt: true,
//      id: client.nextId(),
//      body: 'You sent: ' + output,
//      json:
//      {
//         subType: 'TEXT', // subtype can be 'TEXT', 'IMAGE', 'VIDEO', 'CONTACT', 'LOCATION', 'FILE'.
//         message: output,
//         timestamp: Date.now()
//      }
//    });
//    console.log("Message received" + msg.from);
//});
//
//client.connect();

// Simulate pure virtual inheritance/"implement" keyword for JS


var clientId = '62727ffb-9072-4e3e-b7c5-4f9235a426db';
var messageChannel = "/o/m";
var presenceChannel = "/s/l";
var options = {
    keepalive : 210,
    clientId : clientId,
    clean : false,
    connectTimeout: 30 * 1000,
    will : {
        topic : clientId + presenceChannel,
        payload : "Offline",
        qos : 0,
        retain : true
    }
};
var client  = mqtt.connect('mqtt://ec2-54-169-241-61.ap-southeast-1.compute.amazonaws.com:1883', options);

client.on('connect', function () {
    client.subscribe(clientId + messageChannel);
    //client.publish('presence', 'Hello mqtt', publishOptions, publishContainerInstance.publishCallBack);
});

client.on('message', function (topic, message) {
    // message is Buffer
    console.log(message.toString());
    providerManager.getInstance().processStanza(topic, message, client);
});

