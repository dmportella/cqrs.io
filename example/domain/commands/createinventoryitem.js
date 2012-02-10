var Command = require("../../../lib/domain/command"),
    util = require("util");

var CreateInventoryItem  = function(id, name) {
    Command.call(this);
    this.id = id;
    this.name = name;    
};

util.inherits(CreateInventoryItem, Command);

module.exports = CreateInventoryItem;