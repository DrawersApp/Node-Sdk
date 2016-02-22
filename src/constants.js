var chatType = (function () {
    var text = 'TEXT';
    var image = 'IMAGE';

    return {
        TEXT: text,
        IMAGE: image
    }
})();

var botStringType = (function () {
    var date = 'D';
    var location = 'L';
    var time = 'T';
    var string = 'S';
    var uneditableText = 'U';

    return {
        DATE: date,
        LOCATION: location,
        TIME: time,
        STRING: string,
        UNEDITABLE: uneditableText
    }
})();

var chatStateValues = (function () {
    var active = 'ACTIVE';
    var composing = 'COMPOSING';
    var paused = 'PAUSED';
    var inactive = 'INACTVE';

    return {
        active: active,
        composing: composing,
        paused: paused,
        inactive: inactive
    }
})();
module.exports.chatType = chatType;
module.exports.botStringType = botStringType;
module.exports.chatStateValues = chatStateValues;