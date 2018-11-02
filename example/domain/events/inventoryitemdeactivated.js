var Event = require("../../../lib/domain/event"),
    util = require("util");

var InventoryItemDeactivated = function (id) {
    Event.call(this);
    this.id = id;
};

util.inherits(InventoryItemDeactivated, Event);

module.exports = InventoryItemDeactivated;