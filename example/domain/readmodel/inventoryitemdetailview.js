// EVENTS
var InventoryItemCreated = require("../events/inventoryitemcreated"),
    InventoryItemDeactivated = require("../events/inventoryitemdeactivated"),
    InventoryItemRenamed = require("../events/inventoryitemrenamed"),
    ItemsCheckedInToInventory = require("../events/itemscheckedintoinventory"),
    ItemsRemovedFromInventory = require("../events/itemsremovedfrominventory");
    
// DTOS
var InventoryItemDetailsDto = require("./inventoryitemdetailsdto"),
    InventoryItemListDto = require("./inventoryitemlistdto");

var Handler = require("../../../lib/domain/handler"),
    util = require("util"),
    FakeDatabase = require("./fakedatabase");
    
var InventoryItemDetailView = function() {
    Handler.call(this);
};

util.inherits(InventoryItemDetailView, Handler);

InventoryItemDetailView.prototype.Handle = function(message) {
    if(message instanceof InventoryItemCreated)
    {
        var fakeDatabase = FakeDatabase.getInstance();
        fakeDatabase.details[message.id] = new InventoryItemDetailsDto(message.id, message.name, 0,0);
    } else if (message instanceof InventoryItemDeactivated) {
        var fakeDatabase = FakeDatabase.getInstance();
        if(fakeDatabase.list.length != 0) {
            if(message.id in fakeDatabase.details)
            {
                var inventoryItemDetailsDto = fakeDatabase.details[message.id];
                fakeDatabase.details.splice(fakeDatabase.details.indexOf(inventoryItemDetailsDto), 1);
            }
        }
    } else if (message instanceof InventoryItemRenamed) {
        var inventoryItemDetailsDto = this.GetDetailsItem(message.id);
        inventoryItemDetailsDto.name = message.name;
        inventoryItemDetailsDto.version = message.version;
    } else if (message instanceof ItemsCheckedInToInventory) {
        var inventoryItemDetailsDto = this.GetDetailsItem(message.id);
        inventoryItemDetailsDto.currentCount += message.Count;
        inventoryItemDetailsDto.version = message.version;
    } else if (message instanceof ItemsRemovedFromInventory) {
        var inventoryItemDetailsDto = this.GetDetailsItem(message.id);
        inventoryItemDetailsDto.currentCount -= message.Count;
        inventoryItemDetailsDto.version = message.version;
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