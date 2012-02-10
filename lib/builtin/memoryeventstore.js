var util = require('util'),
    EventStore = require('../domain/eventstore');
    
var EventDescriptor = function(id, eventData, version) {
    this.id = id;
    this.eventData = eventData;
    this.version = version;
};

var MemoryEventStore = function(eventPublisher) {
    EventStore.call(this);
    
    this.eventPublisher = eventPublisher;
    
    this.current = [];
};

util.inherits(MemoryEventStore, EventStore);

MemoryEventStore.prototype.SaveEvents = function(aggregateId, events, expectedVersion){
    var eventDescriptors = [];
    if(this.current) {
        if(!(aggregateId in this.current)) {
            this.current[aggregateId] = eventDescriptors;
        } else {
            eventDescriptors = this.current[aggregateId];
        } 
        if(eventDescriptors.length !== 0 && (eventDescriptors[eventDescriptors.length - 1].version != expectedVersion) && expectedVersion != -1) {
            throw new Error("Concurrency Exception");
        }
        var i = expectedVersion;
        for(event in events) {
            i++;
            var eventObj = events[event];
            eventObj.version = i;
            eventDescriptors.push(new EventDescriptor(aggregateId, eventObj, i));
            this.eventPublisher.Publish(eventObj);
        }
    }
};

MemoryEventStore.prototype.GetEventsForAggregate = function(aggregateId) {
    var eventData = [];
    if(aggregateId in this.current)
    {
        var eventDescriptors = this.current[aggregateId];
        for(eventDescriptor in eventDescriptors)
        {
            eventData.push(eventDescriptor.eventData);
        }
    } else {
        throw new Error("Aggregate not found.");
    }
    return eventData;
};

module.exports = MemoryEventStore;