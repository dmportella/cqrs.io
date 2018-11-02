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

var InventoryListView = function () {
    Handler.call(this);
};

util.inherits(InventoryListView, Handler);

InventoryListView.prototype.Handle = function (message) {
    if (message instanceof InventoryItemCreated) {
        var fakeDatabase = FakeDatabase.getInstance();
        fakeDatabase.list.push(new InventoryItemListDto(message.id, message.name));
    } else if (message instanceof InventoryItemDeactivated) {
        var fakeDatabase = FakeDatabase.getInstance();
        for (inventoryItemListDto in fakeDatabase.list) {
            if (fakeDatabase.list[inventoryItemListDto].id == message.id) {
                fakeDatabase.list.splice(inventoryItemListDto, 1);
                break;
            }
        }
    } else if (message instanceof InventoryItemRenamed) {
        var fakeDatabase = FakeDatabase.getInstance();
        for (inventoryItemListDto in fakeDatabase.list) {
            if (fakeDatabase.list[inventoryItemListDto].id == message.id) {
                fakeDatabase.list[inventoryItemListDto].name = message.newName;
                break;
            }
        }
    }/* else if (message instanceof ItemsCheckedInToInventory) {
    } else if (message instanceof ItemsRemovedFromInventory) {
    }*/
};

module.exports = InventoryListView;