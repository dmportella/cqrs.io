var EventPublisher = require("../../../lib/domain/eventpublisher"),
    CommandSender = require("../../../lib/domain/commandsender"),
    util = require("util");

var FakeBus  = function() {
    EventPublisher.call(this);
    CommandSender.call(this);
    this.types = [];
    this.handlers = [];
};

util.inherits(FakeBus, EventPublisher);
util.inherits(FakeBus, CommandSender);

FakeBus.prototype.RegisterHandler = function(type, handler) {
    if(this.types.indexOf(type) == -1) {
        this.types.push(type);
        this.handlers.push([]);
    }
    if(this.handlers[this.types.indexOf(type)].indexOf(handler) == -1) {
        this.handlers[this.types.indexOf(type)].push(handler);
    }
};

FakeBus.prototype.Send = function(command) {
    if(this.types.indexOf(command.constructor) != -1) {
        if(this.handlers[this.types.indexOf(command.constructor)].length != 0) {
            for(var i = 0; i < this.handlers[this.types.indexOf(command.constructor)].length; i++)
            {
                this.handlers[this.types.indexOf(command.constructor)][i].Handle(command);
            }
        }
    }
};

FakeBus.prototype.Publish = function(event) {
    if(this.types.indexOf(event.constructor) != -1) {
        if(this.handlers[this.types.indexOf(event.constructor)].length != 0) {
            for(var i = 0; i < this.handlers[this.types.indexOf(event.constructor)].length; i++)
            {
                this.handlers[this.types.indexOf(event.constructor)][i].Handle(event);
            }
        }
    }
};

module.exports = FakeBus;