var Command = require("../../../lib/domain/command"),
    util = require("util");

var RenameInventoryItem  = function(id, newName, originalVersion) {
    Command.call(this);
    this.id = id;
    this.newName = newName;
    this.originalVersion = originalVersion;    
};

util.inherits(RenameInventoryItem, Command);

module.exports = RenameInventoryItem;