var FakeDatabase = require("./fakedatabase");

var ReadModelFacade = function() {
};

ReadModelFacade.prototype.GetInventoryItems = function(){
    return FakeDatabase.getInstance().list;    
};

ReadModelFacade.prototype.GetInventoryItemDetails = function(id){
    var fakeDatabase = FakeDatabase.getInstance();
    if(id in fakeDatabase.details)
    {
        return fakeDatabase.details[id];
    }
    throw new Error("InventoryItemDetails not found.");
};

module.exports = ReadModelFacade;