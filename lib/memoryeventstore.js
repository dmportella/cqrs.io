var util = require('util'),
    EventStore = require('./domain/eventstore');
    
var EventDescriptor = function(id, eventData, version) {
    this.id = id;
    this.eventData = eventData;
    this.version = version;
};

var MemoryEventStore = function(eventPublisher) {
    EventStore.call(this);
    
    this.eventPublisher = eventPublisher;
    
    this._current = [];
};

util.inherits(MemoryEventStore, EventStore);

MemoryEventStore.prototype.SaveEvents = function(aggregateId, events, expectedVersion){
    var eventDescriptors = [];
    if(this._current && this._current.length != 0) {
        if(!(aggregateId in this._current)) {
            this._current[aggregateId] = eventDescriptions;
        } else {
            eventDescriptions = this._current[aggregateId];
        } 
        if(eventDescriptors.length !== 0 && (eventDescriptors[eventDescriptors.count - 1].version != expectedVersion) && expectedVersion != -1) {
            throw new Error("Concurrency Exception");
        }
        var i = expectedVersion;
        for(event in events) {
            i++;
            event.version = i;
            eventDescriptors.push(new EventDescriptor(aggregateId, event, i));
            this._eventPublisher.Publish(event);
        }
    }
};

MemoryEventStore.prototype.GetEventsForAggregate = function(aggregateId) {
    var eventData = [];
    if(this._current && this._current.length != 0) {
        if(aggregateId in this._current)
        {
            var eventDescriptors = this._current[aggregateId];
            for(eventDescriptor in eventDescriptors)
            {
                eventData.push(eventDescriptor.eventData);
            }
        } else {
            throw new Error("Aggregate not found.");
        }
    }
    return eventData;
};

module.exports = EventStore;