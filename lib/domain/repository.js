var Repository = function (eventStore) {
    this._eventStore = eventStore;
};

Repository.prototype.Save = function (aggregateRoot, expectedVersion) {
    this._eventStore.SaveEvents(aggregateRoot.id, aggregateRoot.GetUncommittedChanges(), expectedVersion);
};

// No other way i can think of mimicing the generic creation of the aggregate roots
Repository.prototype.GetById = function (aggregateRootId, callback) {
    var events = this._eventStore.GetEventsForAggregate(aggregateRootId);
    callback(events);
};

module.exports = Repository;