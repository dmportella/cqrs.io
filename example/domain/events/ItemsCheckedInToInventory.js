var Event = require("../../../lib/domain/event"),
    util = require("util");

var ItemsCheckedInToInventory  = function(id, count) {
    Event.call(this);
    this.id = id;
    this.count = count;
};

util.inherits(ItemsCheckedInToInventory, Event);

module.exports = ItemsCheckedInToInventory;