/**
 * Created by harshit on 22/2/16.
 */
var constants = require('./constants');
var publishCallBackContainer = require('./publishCallBack');
var nameSpace = "/o/d";
var publishOptions = {
    qos : 1,
    retain: false
};

function DeliveryReceipt(messageId, uid) {
    this.getChannel = function() {
        return uid + nameSpace;
    };
    this.send = function (client,publishCallBackContainer) {
        client.publish(this.getChannel(), messageId, publishOptions, publishCallBackContainer);
    }
}

function DeliveryReceiptProvider() {
    if( typeof this.processStanza === "function" ){
        this.processStanza = function(topic, mqttStanaza, client) {
            // Delivery/Read receipt.
            var id = JSON.parse(mqttStanaza);
            console.log("Message Delivered" + id);
        };
    }

    if( typeof this.acknowledgeStanza === "function" ){
        this.acknowledgeStanza = function( topic, mqttStanza ) {
            console.log(mqttStanza.toLocaleString());
        };
    }
}

module.exports.DeliveryReceiptProvider = DeliveryReceiptProvider;
module.exports.nameSpace = nameSpace;
module.exports.DeliveryReceipt = DeliveryReceipt;