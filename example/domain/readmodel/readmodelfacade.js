var ReadModelFacade = function() {
};

ReadModelFacade.prototype.GetInventoryItems = function(){
    return FakeDatabase.getInstance().list;    
};

ReadModelFacade.prototype.GetInventoryItemDetails = function(id){
    var fakeDatabase = FakeDatabase.getInstance();
    if(fakeDatabase.list.length != 0) {
        if(id in fakeDatabase.list)
        {
            return fakeDatabase.list[id];
        } else {
            throw new Error("InventoryItemDetails not found.");
        }
    }
};

module.exports = ReadModelFacade;