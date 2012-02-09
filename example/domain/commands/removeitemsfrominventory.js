var Command = require("../../../lib/domain/command"),
    util = require("util");

var RemoveItemsFromInventory  = function(inventoryItemId, count, originalVersion) {
    Command.call(this);
    this.inventoryItemId = inventoryItemId;
    this.count = count;
    this.originalVersion = originalVersion;    
};

util.inherits(RemoveItemsFromInventory, Command);

module.exports = RemoveItemsFromInventory;