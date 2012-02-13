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
    if(this.handlers[type])
    {
        if(this.handlers[type].indexOf(handler) != -1) {
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
    if(this.handlers[command.constructor])
    {
        for(var i = 0; i < this.handlers[command.constructor].length; i++)
        {
            this.handlers[command.constructor][i].Handle(command);
        }
    } else {
        throw new Error("InvalidOperationException no handler registered.");
    }
};

FakeBus.prototype.Publish = function(event) {
    if(this.handlers[event.constructor])
    {
        for(var i = 0; i < this.handlers[event.constructor].length; i++)
        {
            this.handlers[event.constructor][i].Handle(event);
        }
    } else {
        throw new Error("InvalidOperationException no handler registered.");
    }
};

module.exports = FakeBus;