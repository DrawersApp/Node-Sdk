var XMPP = require('stanza.io');

var client = XMPP.createClient({
    // Email - deploymentbotdrawers@gmail.com to get you username and password.
    jid: 'jid@ejabberd.sandwitch.in',
    password: 'jid',
    transport: 'websocket',
    wsURL: 'ws://ejabberd.sandwitch.in:5280/websocket'
});

// Bot logged in.
client.on('session:started', function () {
    client.getRoster();
    client.sendPresence();
    console.log("Session started");
});

// TODO - Main method to override..
client.on('chat', function (msg) {
    var input = msg.body;
    var output = input; // This is the input from chat. Generate the output based on it - make rest, jdbc, or anything else :).
    client.sendMessage({
      to: msg.from,
      type: 'chat',
      requestReceipt: true,
      id: client.nextId(),
      body: 'You sent: ' + output,
      json: 
      {
         subType: 'TEXT', // subtype can be 'TEXT', 'IMAGE', 'VIDEO', 'CONTACT', 'LOCATION', 'FILE'.
         message: output,
         timestamp: Date.now()
      }
    });
    console.log("Message received" + msg.from);
});

client.connect();
