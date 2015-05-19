var EventPublisher = require("../../domain/eventpublisher"),
    util = require("util");

var RedisEventPublisher  = function(channel) {
    EventPublisher.call(this);
    this.types = [];
    this.handlers = [];
};

util.inherits(RedisEventPublisher, EventPublisher);

RedisEventPublisher.prototype.RegisterHandler = function(type, handler) {
    if(this.types.indexOf(type) == -1) {
        this.types.push(type);
        this.handlers.push([]);
    }
    if(this.handlers[this.types.indexOf(type)].indexOf(handler) == -1) {
        this.handlers[this.types.indexOf(type)].push(handler);
    }
};

RedisEventPublisher.prototype.Publish = function(event) {
    if(this.types.indexOf(event.constructor) != -1) {
        if(this.handlers[this.types.indexOf(event.constructor)].length != 0) {
            for(var i = 0; i < this.handlers[this.types.indexOf(event.constructor)].length; i++)
            {
                this.handlers[this.types.indexOf(event.constructor)][i].Handle(event);
            }
        }
    }
};

module.exports = RedisEventPublisher;