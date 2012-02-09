var Command = require("../../../lib/domain/command"),
    util = require("util");

var DeactivateInventoryItem  = function(inventoryItemId, originalVersion) {
    Command.call(this);
    this.inventoryItemId = inventoryItemId;
    this.originalVersion = originalVersion;    
};

util.inherits(DeactivateInventoryItem, Command);

module.exports = DeactivateInventoryItem;