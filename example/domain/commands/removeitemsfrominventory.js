var Command = require("../../../lib/domain/command"),
    util = require("util");

var RemoveItemsFromInventory  = function(id, count, originalVersion) {
    Command.call(this);
    this.id = id;
    this.count = count;
    this.originalVersion = originalVersion;    
};

util.inherits(RemoveItemsFromInventory, Command);

module.exports = RemoveItemsFromInventory;