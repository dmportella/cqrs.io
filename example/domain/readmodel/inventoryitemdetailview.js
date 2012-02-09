var Handler = require("../../../lib/domain/handler"),
    util = require("util"),
    FakeDatabase = require("./fakedatabase");
    
var InventoryItemDetailView = function() {
    Handler.call(this);
};

util.inherits(InventoryItemDetailView, Handler);

InventoryItemDetailView.prototype.Handle = function(event) {
    if(event instanceof InventoryItemCreated)
    {
        var fakeDatabase = FakeDatabase.getInstance();
        fakeDatabase.details[event.id] = new InventoryItemDetailsDto(event.id, event.name, 0,0);
    } else if (event instanceof InventoryItemDeactivated) {
        var fakeDatabase = FakeDatabase.getInstance();
        if(fakeDatabase.list.length != 0) {
            if(event.id in fakeDatabase.details)
            {
                var inventoryItemDetailsDto = fakeDatabase.details[event.id];
                fakeDatabase.details.splice(fakeDatabase.details.indexOf(inventoryItemDetailsDto), 1);
            }
        }
    } else if (event instanceof InventoryItemRenamed) {
        var inventoryItemDetailsDto = this.GetDetailsItem(event.id);
        inventoryItemDetailsDto.name = event.name;
        inventoryItemDetailsDto.version = event.version;
    } else if (event instanceof ItemsCheckedInToInventory) {
        var inventoryItemDetailsDto = this.GetDetailsItem(event.id);
        inventoryItemDetailsDto.currentCount += event.Count;
        inventoryItemDetailsDto.version = event.version;
    } else if (event instanceof ItemsRemovedFromInventory) {
        var inventoryItemDetailsDto = this.GetDetailsItem(event.id);
        inventoryItemDetailsDto.currentCount -= event.Count;
        inventoryItemDetailsDto.version = event.version;
    }
};

InventoryItemDetailView.prototype.GetDetailsItem = function(id) {
    var fakeDatabase = FakeDatabase.getInstance();
    if(fakeDatabase.list.length != 0) {
        if(id in fakeDatabase.list)
        {
            return fakeDatabase.list[id];
        }
    }
    throw new Error("InventoryItemDetails not found.");
};

module.exports = InventoryItemDetailView;