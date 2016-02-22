/**
 * Created by harshit on 22/2/16.
 */
function publishCallBackContainer(cbContainer) {
    this.publishCallBack = function(cb) {
        // Add send receipt.
        console.log("Message send" + cbContainer);
    }
}

module.exports = publishCallBackContainer;