var Event = require("../../../lib/domain/event"),
    util = require("util");

var InventoryItemDeactivated  = function(id) {
    Event.call(this);
    this.id = 0;
};

util.inherits(InventoryItemDeactivated, Event);

module.exports = InventoryItemDeactivated;