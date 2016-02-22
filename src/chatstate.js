/**
 * Created by harshit on 21/2/16.
 */
var constants = require('./constants');
var publishCallBackContainer = require('./publishCallBack');
var nameSpace = "/o/c";
var publishOptions = {
    qos : 0,
    retain: false
};
function ChatStateContainer(senderId, chatStateValues) {
    this.id = senderId;
    this.chatStateValues = chatStateValues;
}

function ChatState(senderId, uid, chatStateValues) {
    this.uid = uid;
    this.chatStateContainer = new ChatStateContainer(senderId, chatStateValues);
    this.getChannel = function() {
        return uid + nameSpace;
    };
    this.send = function (client,publishCallBackContainer) {
        client.publish(this.getChannel(), JSON.stringify(this.chatStateContainer), publishOptions, publishCallBackContainer);
    }
}

function ChatStateProvider() {
    this.processStanza = function(topic, mqttStanaza, client) {
        // Typing receipt.
        var chatState = JSON.parse(mqttStanaza);
        console.log(chatState.i);
        console.log(chatState.c);
    };
    this.acknowledgeStanza = function( topic, mqttStanza ) {
        console.log(mqttStanza.toLocaleString());
    };
}

module.exports.ChatStateProvider = ChatStateProvider;
module.exports.nameSpace = nameSpace;
module.exports.ChatState = ChatState;