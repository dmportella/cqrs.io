// COMMANDS
var CheckInItemsToInventory = require("./commands/checkinitemstoinventory"),
    CreateInventoryItem = require("./commands/createinventoryitem"),
    DeactivateInventoryItem = require("./commands/deactivateinventoryitem"),
    RemoveItemsFromInventory = require("./commands/removeitemsfrominventory"),
    RenameInventoryItem = require("./commands/renameinventoryitem");
    
// EVENTS
var InventoryItemCreated = require("./events/inventoryitemcreated"),
    InventoryItemDeactivated = require("./events/inventoryitemdeactivated"),
    InventoryItemRenamed = require("./events/inventoryitemrenamed"),
    ItemsCheckedInToInventory = require("./events/itemscheckedintoinventory"),
    ItemsRemovedFromInventory = require("./events/itemsremovedfrominventory");
    
// VIEWS
var InventoryItemDetailView = require("./readmodel/inventoryitemdetailview"),
    InventoryListView = require("./readmodel/inventoryitemdeactivated");
    
// BUS
var FakeBus = require("./bus/fakebus");

// HANDLERS
var InventoryCommandHandlers = require("./inventorycommandhandlers");

// EVENT STORE
var MemoryEventStore = require("../lib/domain/memoryeventstore");

// REPOSITORY
var Repository = require("../lib/domain/repository");


/*
var bus = new FakeBus();

var storage = new EventStore(bus);
var rep = new Repository<InventoryItem>(storage);
var commands = new InventoryCommandHandlers(rep);
bus.RegisterHandler<CheckInItemsToInventory>(commands.Handle);
bus.RegisterHandler<CreateInventoryItem>(commands.Handle);
bus.RegisterHandler<DeactivateInventoryItem>(commands.Handle);
bus.RegisterHandler<RemoveItemsFromInventory>(commands.Handle);
bus.RegisterHandler<RenameInventoryItem>(commands.Handle);
var detail = new InvenotryItemDetailView();
bus.RegisterHandler<InventoryItemCreated>(detail.Handle);
bus.RegisterHandler<InventoryItemDeactivated>(detail.Handle);
bus.RegisterHandler<InventoryItemRenamed>(detail.Handle);
bus.RegisterHandler<ItemsCheckedInToInventory>(detail.Handle);
bus.RegisterHandler<ItemsRemovedFromInventory>(detail.Handle);
var list = new InventoryListView();
bus.RegisterHandler<InventoryItemCreated>(list.Handle);
bus.RegisterHandler<InventoryItemRenamed>(list.Handle);
bus.RegisterHandler<InventoryItemDeactivated>(list.Handle);
ServiceLocator.Bus = bus;
*/