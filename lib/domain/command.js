var Message = require("./message"),
    util = require("util");
    
var Command = function() {
    Message.call(this);
};

util.inherits(Command, Message);

module.exports = Command;