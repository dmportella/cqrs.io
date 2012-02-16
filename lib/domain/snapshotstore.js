var ShapshotStore = function() {

};
// not sure yet what properties to use
ShapshotStore.prototype.SaveShapshot = function(aggregateId, events, version){
    throw new Error("ShapshotStore.SaveShapshot must be overridden by subclass.");
};

ShapshotStore.prototype.GetShapshotForAggregate = function(aggregateId) {
    throw new Error("ShapshotStore.GetShapshotForAggregate must be overridden by subclass.");
};

module.exports = ShapshotStore