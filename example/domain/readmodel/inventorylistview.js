var Handler = require("../../../lib/domain/handler"),
    util = require("util"),
    FakeDatabase = require("./fakedatabase");
    
var InventoryListView = function() {
    Handler.call(this);
};

util.inherits(InventoryListView, Handler);

InventoryListView.prototype.Handle = function(event) {
    if(event instanceof InventoryItemCreated)
    {
        var fakeDatabase = FakeDatabase.getInstance();
        fakeDatabase.list.push(new InventoryItemListDto(event.id, event.name));
    } else if (event instanceof InventoryItemDeactivated) {
        var fakeDatabase = FakeDatabase.getInstance();
        for(inventoryItemListDto in fakeDatabase.list) {
            if(inventoryItemListDto.id == event.id) {                
                fakeDatabase.list.splice(fakeDatabase.list.indexOf(inventoryItemListDto), 1)
                break;
            }
        }
    } else if (event instanceof InventoryItemRenamed) {
        var fakeDatabase = FakeDatabase.getInstance();
        for(inventoryItemListDto in fakeDatabase.list) {
            if(inventoryItemListDto.id == event.id) {
                inventoryItemListDto.name = event.newName;
                break;
            }
        }
    }/* else if (event instanceof ItemsCheckedInToInventory) {
    } else if (event instanceof ItemsRemovedFromInventory) {
    }*/
};

module.exports = InventoryListView;