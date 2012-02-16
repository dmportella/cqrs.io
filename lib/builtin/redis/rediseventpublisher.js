var EventPublisher = require("../../domain/eventpublisher"),
    util = require("util");

var RedisEventPublisher  = function() {
    EventPublisher.call(this);
};

util.inherits(RedisEventPublisher, EventPublisher);

RedisEventPublisher.prototype.RegisterHandler = function(type, handler) {
    throw new Error("TODO");
};

RedisEventPublisher.prototype.Publish = function(event) {
    throw new Error("TODO");
};

module.exports = RedisEventPublisher;