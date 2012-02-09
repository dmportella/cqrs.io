var Event = require("../../../lib/domain/event"),
    util = require("util");

var ItemsRemovedFromInventory  = function(id, count) {
    Event.call(this);
    this.id = id;
    this.count = count;
};

util.inherits(ItemsRemovedFromInventory, Event);

module.exports = ItemsRemovedFromInventory;