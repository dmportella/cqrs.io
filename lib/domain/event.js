var Message = require("./message"),
    util = require("util");
    
var Event = function() {
    Message.call(this);
    this.version = 0;
};

util.inherits(Event, Message);

module.exports = Event;