/**
 * Created by harshit on 21/2/16.
 */
var constants = require('./constants');
var publishCallBackContainer = require('./publishCallBack');
var DeliveryReceipt = require('./deliveryreceipt');
var nameSpace = "/o/m";
var publishOptions = {
    qos : 1,
    retain: false
};
function MqttChatMessage(messageId, senderId, message, chatType, deliveryReceipt) {
    this.m = message;
    this.i = messageId;
    this.s = senderId;
    this.c = chatType;
    this.d = deliveryReceipt;
}

function MqttChat(messageId, senderId, message, chatType, deliveryReceipt, uid) {
    this.uid = uid;
    this.mqttChatMessage = new MqttChatMessage(messageId, senderId, message, chatType, deliveryReceipt);
    this.getChannel = function() {
        return uid + nameSpace;
    };
    console.log(JSON.stringify(this.mqttChatMessage));
    this.send = function (client,publishCallBackContainer) {
        client.publish(this.getChannel(), JSON.stringify(this.mqttChatMessage), publishOptions, publishCallBackContainer);
    }
}

function MessageProvider() {

    this.processStanza = function(topic, mqttStanaza, client) {
        var message = JSON.parse(mqttStanaza.toString());
        console.log(message.m);

        if (message.d) {
            var deliveryContainerInstance = new publishCallBackContainer(message.i);
            new DeliveryReceipt.DeliveryReceipt(message.i, message.s)
                .send(client, deliveryContainerInstance.publishCallBack);
        }
        var nextId = client.nextId;
        var publishContainerInstance = new publishCallBackContainer(nextId);
        // echo - TODO - do something meaningful.
        new MqttChat(nextId, topic, message.m, message.c, true, message.s)
            .send(client, publishContainerInstance.publishCallBack);
    };
    this.acknowledgeStanza = function( topic, mqttStanza ) {
        console.log(mqttStanza.toLocaleString());
    };

}

module.exports.MessageProvider = MessageProvider;
module.exports.nameSpace = nameSpace;
module.exports.mqttChat = MqttChat;