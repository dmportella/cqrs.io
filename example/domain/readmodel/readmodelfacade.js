var FakeDatabase = require("./fakedatabase");

var ReadModelFacade = function() {
};

ReadModelFacade.prototype.GetInventoryItems = function(){
    return FakeDatabase.getInstance().list;    
};

ReadModelFacade.prototype.GetInventoryDetails = function(id){
    return FakeDatabase.getInstance().details;
};

ReadModelFacade.prototype.GetInventoryItemDetails = function(id){
    var fakeDatabase = FakeDatabase.getInstance();
    for (var i = 0; i < fakeDatabase.details.length; i++) {
            if(fakeDatabase.details[i].id == id) {
                return fakeDatabase.details[i];
            }
    }
    throw new Error("InventoryItemDetails not found.");
};

module.exports = ReadModelFacade;