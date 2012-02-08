var Event = require("../../../lib/domain/event"),
    util = require("util");

var InventoryItemRenamed  = function(id, newName) {
    Event.call(this);
    this.id = id;
    this.newName = newName;
};

util.inherits(InventoryItemRenamed, Event);

module.exports = InventoryItemRenamed;