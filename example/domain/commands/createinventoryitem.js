var Command = require("../../../lib/domain/command"),
    util = require("util");

var CreateInventoryItem  = function(inventoryItemId, name) {
    Command.call(this);
    this.inventoryItemId = inventoryItemId;
    this.name = name;    
};

util.inherits(CreateInventoryItem, Command);

module.exports = CreateInventoryItem;