// COMMANDS
var CheckInItemsToInventory = require("./commands/checkinitemstoinventory"),
    CreateInventoryItem = require("./commands/createinventoryitem"),
    DeactivateInventoryItem = require("./commands/deactivateinventoryitem"),
    RemoveItemsFromInventory = require("./commands/removeitemsfrominventory"),
    RenameInventoryItem = require("./commands/renameinventoryitem");

var InventoryItem = require("./inventoryitem"),
    Handler = require("../../lib/domain/handler"),
    util = require("util");

var InventoryCommandHandlers = function (repository) {
    Handler.call(this);
    this.repository = repository;
};

util.inherits(InventoryCommandHandlers, Handler);

InventoryCommandHandlers.prototype.Handle = function (message) {
    var self = this;
    if (message instanceof CheckInItemsToInventory) {
        this.repository.GetById(message.id, function (events) {
            var inventoryItem = new InventoryItem();
            inventoryItem.LoadsFromHistory(events);
            inventoryItem.CheckIn(message.count);
            self.repository.Save(inventoryItem, message.originalVersion);
        });

    } else if (message instanceof CreateInventoryItem) {
        var inventoryItem = new InventoryItem(message.id, message.name);
        this.repository.Save(inventoryItem, -1);
    } else if (message instanceof DeactivateInventoryItem) {
        this.repository.GetById(message.id, function (events) {
            var inventoryItem = new InventoryItem();
            inventoryItem.LoadsFromHistory(events);
            inventoryItem.Deactivate();
            self.repository.Save(inventoryItem, message.originalVersion);
        });
    } else if (message instanceof RemoveItemsFromInventory) {
        this.repository.GetById(message.id, function (events) {
            var inventoryItem = new InventoryItem();
            inventoryItem.LoadsFromHistory(events);
            inventoryItem.Remove(message.count);
            self.repository.Save(inventoryItem, message.originalVersion);
        });
    } else if (message instanceof RenameInventoryItem) {
        this.repository.GetById(message.id, function (events) {
            var inventoryItem = new InventoryItem();
            inventoryItem.LoadsFromHistory(events);
            inventoryItem.ChangeName(message.newName);
            self.repository.Save(inventoryItem, message.originalVersion);
        });
    }
};

module.exports = InventoryCommandHandlers;