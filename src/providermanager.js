/**
 * Created by harshit on 21/2/16.
 */
var message = require('./message');
var chatState = require('./chatstate');
var deliveryReceipt = require('./deliveryreceipt');
var providerManager = (function () {

    var providerManagerInstance;
    function create() {
        var providers = {}, length = 0;
        providers[message.nameSpace] = new message.MessageProvider();
        providers[chatState.nameSpace] = new chatState.ChatStateProvider();
        providers[deliveryReceipt.nameSpace] = new deliveryReceipt.DeliveryReceiptProvider();
        length++;
        function processStanza(topic, mqttMessage, client) {
            var providerName = topic.substr(topic.indexOf("/"));
            console.log("ProviderName" + providerName);
            var provider = providers[providerName];
            if (typeof provider === "undefined") {
                return;
            }
            console.log("ProviderFound" + provider.toLocaleString());
            return provider.processStanza(topic.substr(0, topic.indexOf("/")), mqttMessage, client);
        }


        function getProviderLength() {
            return length;
        }

        return {
            processStanza: processStanza
        }
    }

    return {
        getInstance: function () {
            if (!providerManagerInstance) {
                providerManagerInstance = create();
            }
            return providerManagerInstance;
        }
    };
})();

module.exports = providerManager;