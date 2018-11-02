var EventStore = function () {

};

EventStore.prototype.SaveEvents = function (aggregateId, events, expectedVersion) {
    throw new Error("EventStore.SaveEvents must be overridden by subclass.");
};

EventStore.prototype.GetEventsForAggregate = function (aggregateId) {
    throw new Error("EventStore.GetEventsForAggregate must be overridden by subclass.");
};

module.exports = EventStore;