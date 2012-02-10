var AggregateRoot = function() {
    this._changes = [];
    this.id = null;
    this.version = 0;
}

AggregateRoot.prototype.GetUncommittedChanges = function() {
    return this._changes;
};

AggregateRoot.prototype.MarkChangesAsCommitted = function() {
    this._changes.clear();
};

AggregateRoot.prototype.LoadsFromHistory =  function(history) {
    for(event in history) {
        this.ApplyChange(history[event], false);
    }
};

AggregateRoot.prototype.ApplyChange = function(event, isNew) {
    this.Apply(event);
    if(isNew == undefined || isNew) {
        this._changes.push(event);
    }
};

AggregateRoot.prototype.Apply = function(event) {
    throw new Error("AggregateRoot.Apply must be overridden by subclass.");
};

module.exports = AggregateRoot;