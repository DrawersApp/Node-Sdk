var XMPP = require('stanza.io'); // if using browserify

var client = XMPP.createClient({
    jid: '63d1911e-6de3-49d6-8d09-4f4fa39ab7db@ejabberd.sandwitch.in',
    password: 'irctc',

    // If you have a .well-known/host-meta.json file for your
    // domain, the connection transport config can be skipped.

    transport: 'websocket',
    wsURL: 'ws://ejabberd.sandwitch.in:5280/websocket'
    // (or `boshURL` if using 'bosh' as the transport)
});

client.on('session:started', function () {
    client.getRoster();
    client.sendPresence();
    console.log("Session started");
});

client.on('chat', function (msg) {
    client.sendMessage({
      to: msg.from,
      type: 'chat',
      requestReceipt: true,
      id: client.nextId(),
      body: 'You sent: ' + msg.body,
      json: 
      {
         subType: 'TEXT',
         message: msg.body,
         timestamp: Date.now()
      }
    });
    console.log("Message received" + msg.from);
});

client.connect();
