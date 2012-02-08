var AggregateRoot = function() {
    // check if we are instance of BaseController if not return a new instance of BaseController.
	if(false === (this instanceof AggregateRoot)) 
	{
        return new AggregateRoot();
    }
    
    this._changes = [];
    this.id = 0;
    this.version = 0;
}

AggregateRoot.prototype.GetUncommittedChanges = function() {
    return null;
};

AggregateRoot.prototype.MarkChangesAsCommitted = function() {
    this._changes.clear();
};

AggregateRoot.prototype.LoadsFromHistory =  function(history) {
    // foreach (var e in history) ApplyChange(e, false);
};

AggregateRoot.prototype.ApplyChange = function(event, isNew) {
    /*
    this.AsDynamic().Apply(@event);
    if(isNew) _changes.Add(@event);
    */
};

AggregateRoot.prototype.Apply = function(event) {
    throw new Error("AggregateRoot.Apply must be overridden by subclass.");
};

module.exports = AggregateRoot;