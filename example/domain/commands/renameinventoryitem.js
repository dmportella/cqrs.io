var Command = require("../../../lib/domain/command"),
    util = require("util");

var RenameInventoryItem  = function(inventoryItemId, newName, originalVersion) {
    Command.call(this);
    this.inventoryItemId = inventoryItemId;
    this.newName = newName;
    this.originalVersion = originalVersion;    
};

util.inherits(RenameInventoryItem, Command);

module.exports = RenameInventoryItem;