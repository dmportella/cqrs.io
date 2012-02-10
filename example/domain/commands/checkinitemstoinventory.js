var Command = require("../../../lib/domain/command"),
    util = require("util");

var CheckInItemsToInventory  = function(inventoryItemId, count, originalVersion) {
    Command.call(this);
    this.inventoryItemId = inventoryItemId;
    this.count = count;
    this.originalVersion = originalVersion;
};

util.inherits(CheckInItemsToInventory, Command);

module.exports = CheckInItemsToInventory;