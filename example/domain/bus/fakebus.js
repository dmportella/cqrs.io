var EventPublisher = require("../../../lib/domain/eventpublisher"),
    CommandSender = require("../../../lib/domain/commandsender"),
    util = require("util");

var FakeBus  = function() {
    EventPublisher.call(this);
    CommandSender.call(this);
    this.handlers = [];
};

util.inherits(FakeBus, EventPublisher);
util.inherits(FakeBus, CommandSender);

FakeBus.prototype.RegisterHandler = function(type, handler) {
    if(type in this.handlers)
    {
        if(handler in this.handlers[type]) {
            throw new Error("Handler is already registered.");
        }
        else
        {
            this.handlers[type].push(handler);
        }
    } else {
        this.handlers[type] = [];
        this.handlers[type].push(handler);
    }
};

FakeBus.prototype.Send = function(command) {
    if(command.constructor in this.handlers)
    {
        for(commandHandler in this.handlers[command.constructor])
        {
            this.handlers[command.constructor][commandHandler].Handle(command);
        }
    } else {
        throw new Error("InvalidOperationException no handler registered.");
    }
};

FakeBus.prototype.Publish = function(event) {
    if(event.constructor in this.handlers)
    {
        for(eventHandler in this.handlers[event.constructor])
        {
            this.handlers[event.constructor][eventHandler].Handle(event);
        }
    } else {
        throw new Error("InvalidOperationException no handler registered.");
    }
};

module.exports = FakeBus;