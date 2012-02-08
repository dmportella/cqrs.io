var Repository = function(eventStore) {
    this._eventStore = eventStore;
};

Repository.prototype.Save = function(aggregateRoot, expectedVersion){
    this._eventStore.SaveEvents(aggregateRoot.id, aggregateRoot.GetUncommittedChanges(), expectedVersion);
};

// No other way i can think of mimicing the generic creation of the aggregate roots
Repository.prototype.GetById = function(aggregateRoot) {
    var events = this._eventStore.GetEventsForAggregate(aggregateRoot.id);
    aggregateRoot.LoadsFromHistory(events);
    return aggregateRoot;
};

module.exports = Repository;