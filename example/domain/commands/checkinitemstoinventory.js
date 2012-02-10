var Command = require("../../../lib/domain/command"),
    util = require("util");

var CheckInItemsToInventory  = function(id, count, originalVersion) {
    Command.call(this);
    this.id = id;
    this.count = count;
    this.originalVersion = originalVersion;
};

util.inherits(CheckInItemsToInventory, Command);

module.exports = CheckInItemsToInventory;