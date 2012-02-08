var AggregateRoot = require("../../lib/domain/aggregateroot"),
    util = require("util");

var InventoryItem  = function(id, name) {
    AggregateRoot.call(this);
    this.ApplyChange(new InventoryItemCreated(id, name));
};

util.inherits(InventoryItem, AggregateRoot);

InventoryItem.prototype.Apply = function(event) {
    if(event instanceof InventoryItemCreated)
    {
        this.id = event.id;
        this.activated = true;
    } else if (event instanceof InventoryItemDeactivated) {
        this.activated = false;
    } 
    /* no need to do anything with this events
    else if (event instanceof InventoryItemRenamed) {
    } else if (event instanceof ItemsCheckedInToInventory) {
    } else if (event instanceof ItemsRemovedFromInventory) {
    }*/
};

InventoryItem.prototype.ChangeName = function(newName) {
    if(!event.newName || 0 === event.newName.length)
    {
        throw new Error("Argument Exception newName.");
    }
    this.ApplyChange(new InventoryItemRenamed(this.id, newName));
};

InventoryItem.prototype.Remove = function(count) {
    if (count <= 0) {
        throw new Error("InvalidOperationException cant remove negative count from inventory.");
    }
    this.ApplyChange(new ItemsRemovedFromInventory(id, count));
};

InventoryItem.prototype.CheckIn = function(count) {
    if (count <= 0) {
        throw new Error("must have a count greater than 0 to add to inventory.");
    }
    this.ApplyChange(new ItemsCheckedInToInventory(id, count));
};

InventoryItem.prototype.Deactivate = function() {
    if(!activated) {
        throw new Error("InvalidOperationException already deactivated.");
    }
    this.ApplyChange(new InventoryItemDeactivated(id));
};

module.exports = InventoryItem;
  