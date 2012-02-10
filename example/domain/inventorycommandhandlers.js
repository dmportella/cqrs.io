// COMMANDS
var CheckInItemsToInventory = require("./commands/checkinitemstoinventory"),
    CreateInventoryItem = require("./commands/createinventoryitem"),
    DeactivateInventoryItem = require("./commands/deactivateinventoryitem"),
    RemoveItemsFromInventory = require("./commands/removeitemsfrominventory"),
    RenameInventoryItem = require("./commands/renameinventoryitem");

var InventoryItem = require("./inventoryitem"),
    Handler = require("../../lib/domain/handler"),
    util = require("util");

var InventoryCommandHandlers  = function(repository) {
    Handler.call(this);
    this.repository = repository;
};

util.inherits(InventoryCommandHandlers, Handler);

InventoryCommandHandlers.prototype.Handle = function(message) {
    if(message instanceof CheckInItemsToInventory)
    {
        var inventoryItem = this.repository.GetById(message.InventoryItemId);
        inventoryItem.CheckIn(message.count);
        this.repository.Save(inventoryItem, message.originalVersion);
    } else if (message instanceof CreateInventoryItem) {
        var inventoryItem = new InventoryItem(message.inventoryItemId, message.name);
        this.repository.Save(inventoryItem, -1);        
    } else if (message instanceof DeactivateInventoryItem) {
        var inventoryItem = this.repository.GetById(message.inventoryItemId);
        inventoryItem.Deactivate();
        this.repository.Save(inventoryItem, message.originalVersion);
    } else if (message instanceof RemoveItemsFromInventory) {
        var inventoryItem = this.repository.GetById(message.inventoryItemId);
        inventoryItem.Remove(message.Count);
        this.repository.Save(inventoryItem, message.originalVersion);
    } else if (message instanceof RenameInventoryItem) {
        var inventoryItem = this.repository.GetById(message.inventoryItemId);
        inventoryItem.ChangeName(message.NewName);
        this.repository.Save(inventoryItem, message.originalVersion);
    }
};

module.exports = InventoryCommandHandlers;