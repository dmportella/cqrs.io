var Event = require("../../../lib/domain/event"),
    util = require("util");

var InventoryItemCreated  = function(id, name) {
    Event.call(this);
    this.id = 0;
    this.name = name;
};

util.inherits(InventoryItemCreated, Event);

module.exports = InventoryItemCreated;