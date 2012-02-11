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
        fakeDatabase.details.push(new InventoryItemDetailsDto(message.id, message.name, 0,0));
    } else if (message instanceof InventoryItemDeactivated) {
        var fakeDatabase = FakeDatabase.getInstance();
        for (var i = 0; i < fakeDatabase.details.length; i++) {
            if(fakeDatabase.details[i].id == message.id) {
                fakeDatabase.details.splice(i, 1);
                break;
            }
        }
    } else if (message instanceof InventoryItemRenamed) {
        var inventoryItemDetailsDto = this.GetDetailsItem(message.id);
        inventoryItemDetailsDto.name = message.newName;
        inventoryItemDetailsDto.version = message.version;
    } else if (message instanceof ItemsCheckedInToInventory) {
        var inventoryItemDetailsDto = this.GetDetailsItem(message.id);
        inventoryItemDetailsDto.currentCount += message.count;
        inventoryItemDetailsDto.version = message.version;
    } else if (message instanceof ItemsRemovedFromInventory) {
        var inventoryItemDetailsDto = this.GetDetailsItem(message.id);
        inventoryItemDetailsDto.currentCount -= message.count;
        inventoryItemDetailsDto.version = message.version;
    }
};

InventoryItemDetailView.prototype.GetDetailsItem = function(id) {
    var fakeDatabase = FakeDatabase.getInstance();
    for (var i = 0; i < fakeDatabase.details.length; i++) {
            if(fakeDatabase.details[i].id == id) {
                return fakeDatabase.details[i];
            }
    }
    throw new Error("InventoryItemDetails not found.");
};

module.exports = InventoryItemDetailView;