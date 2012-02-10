var Command = require("../../../lib/domain/command"),
    util = require("util");

var DeactivateInventoryItem  = function(id, originalVersion) {
    Command.call(this);
    this.id = id;
    this.originalVersion = originalVersion;    
};

util.inherits(DeactivateInventoryItem, Command);

module.exports = DeactivateInventoryItem;