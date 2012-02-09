var EventPublisher = require("../../lib/domain/eventpublisher"),
    CommandSender = require("../../lib/domain/commandsender"),
    util = require("util");

var FakeBus  = function() {
    EventPublisher.call(this);
    CommandSender.call(this);
    this.handlers = [];
};

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
    if(command in this.handlers)
    {
        for(commandHandler in this.handlers[command])
        {
            commandHandler.handle(command);
        }
    } else {
        throw new Error("InvalidOperationException no handler registered.");
    }
};

FakeBus.prototype.Publish = function(event) {
    if(event in this.handlers)
    {
        for(eventHandler in this.handlers[event])
        {
            eventHandler.handle(event);
        }
    } else {
        throw new Error("InvalidOperationException no handler registered.");
    }
};

util.inherits(FakeBus, EventPublisher);
util.inherits(FakeBus, CommandSender);

module.exports = FakeBus;

/*public class FakeBus : ICommandSender, IEventPublisher
    {
        
        public void Send<T>(T command) where T : Command
        {
            List<Action<Message>> handlers; 
            if (_routes.TryGetValue(typeof(T), out handlers))
            {
                if (handlers.Count != 1) throw new InvalidOperationException("cannot send to more than one handler");
                handlers[0](command);
            }
            else
            {
                throw new InvalidOperationException("no handler registered");
            }
        }

        public void Publish<T>(T @event) where T : Event
        {
            List<Action<Message>> handlers; 
            if (!_routes.TryGetValue(@event.GetType(), out handlers)) return;
            foreach(var handler in handlers)
            {
                //dispatch on thread pool for added awesomeness
                var handler1 = handler;
                ThreadPool.QueueUserWorkItem(x => handler1(@event));
            }
        }
    }*/