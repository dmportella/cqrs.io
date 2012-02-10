// COMMANDS
var CheckInItemsToInventory = require("./domain/commands/checkinitemstoinventory"),
    CreateInventoryItem = require("./domain/commands/createinventoryitem"),
    DeactivateInventoryItem = require("./domain/commands/deactivateinventoryitem"),
    RemoveItemsFromInventory = require("./domain/commands/removeitemsfrominventory"),
    RenameInventoryItem = require("./domain/commands/renameinventoryitem");
    
// EVENTS
var InventoryItemCreated = require("./domain/events/inventoryitemcreated"),
    InventoryItemDeactivated = require("./domain/events/inventoryitemdeactivated"),
    InventoryItemRenamed = require("./domain/events/inventoryitemrenamed"),
    ItemsCheckedInToInventory = require("./domain/events/itemscheckedintoinventory"),
    ItemsRemovedFromInventory = require("./domain/events/itemsremovedfrominventory");

// READMODEL
var ReadModelFacade = require("./domain/readmodel/readmodelfacade");

// VIEWS
var InventoryItemDetailView = require("./domain/readmodel/inventoryitemdetailview"),
    InventoryListView = require("./domain/readmodel/inventorylistview");
    
// BUS
var FakeBus = require("./domain/bus/fakebus");

// HANDLERS
var InventoryCommandHandlers = require("./domain/inventorycommandhandlers");

// EVENT STORE
var MemoryEventStore = require("../lib/builtin/memoryeventstore");

// REPOSITORY
var Repository = require("../lib/domain/repository");

// DTOS
var InventoryItemDetailsDto = require("./domain/readmodel/inventoryitemdetailsdto"),
    InventoryItemListDto = require("./domain/readmodel/inventoryitemlistdto");
    
// SERVICELOCATOR
var ServiceLocator = require("./servicelocator");

var readModelFacade = new ReadModelFacade();
    
var bus = new FakeBus();

var storage = new MemoryEventStore(bus);

var rep = new Repository(storage);

var commands = new InventoryCommandHandlers(rep);

bus.RegisterHandler(CheckInItemsToInventory, commands);
bus.RegisterHandler(CreateInventoryItem, commands);
bus.RegisterHandler(DeactivateInventoryItem, commands);
bus.RegisterHandler(RemoveItemsFromInventory, commands);
bus.RegisterHandler(RenameInventoryItem, commands);

var detail = new InventoryItemDetailView();

bus.RegisterHandler(InventoryItemCreated, detail);
bus.RegisterHandler(InventoryItemDeactivated, detail);
bus.RegisterHandler(InventoryItemRenamed, detail);
bus.RegisterHandler(ItemsCheckedInToInventory, detail);
bus.RegisterHandler(ItemsRemovedFromInventory, detail);

var list = new InventoryListView();

bus.RegisterHandler(InventoryItemCreated, list);
bus.RegisterHandler(InventoryItemRenamed, list);
bus.RegisterHandler(InventoryItemDeactivated, list);

var createInventoryItem = new CreateInventoryItem("1q2we3r4r4r", "lego set");

bus.Send(createInventoryItem);

var inventoryItemDetailsDto = readModelFacade.GetInventoryItemDetails("1q2we3r4r4r");

var checkInItemsToInventory = new CheckInItemsToInventory(inventoryItemDetailsDto.id, 1, inventoryItemDetailsDto.version);

bus.Send(checkInItemsToInventory);

var removeItemsFromInventory = new RemoveItemsFromInventory(inventoryItemDetailsDto.id, 1, inventoryItemDetailsDto.version);

bus.Send(removeItemsFromInventory);

var renameInventoryItem = new RenameInventoryItem();

bus.Send(renameInventoryItem);

var deactivateInventoryItem = new DeactivateInventoryItem();

bus.Send(deactivateInventoryItem);

ServiceLocator.registerService("bus", bus);