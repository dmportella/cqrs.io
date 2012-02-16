var CommandSender = require("../../domain/commandsender"),
    util = require("util");

var RedisCommandSender  = function() {
    CommandSender.call(this);
};

util.inherits(RedisCommandSender, CommandSender);

RedisCommandSender.prototype.RegisterHandler = function(type, handler) {
    throw new Error("TODO");
};

RedisCommandSender.prototype.Send = function(command) {
    throw new Error("TODO");
};

module.exports = RedisCommandSender;