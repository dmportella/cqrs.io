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

ServiceLocator.registerService("bus", bus);

var port = process.env.PORT || 8080;

const path = require('path'),
    express = require('express'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    createError = require('http-errors'),
    favicon = require('serve-favicon');

var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());
//app.use(favicon(path.join(__dirname, '/public/favicon.ico')))
app.use(express.static(__dirname + '/public', { maxAge: 604800000 }));

app.get('/', function (req, res, next) {
    res.render('index', { items: readModelFacade.GetInventoryDetails() });
});

app.post("/products/add", function (req, res, next) {
    var details = readModelFacade.GetInventoryDetails();
    var createInventoryItem = new CreateInventoryItem(details.length + 1, req.body.name);
    bus.Send(createInventoryItem);
    res.redirect("/");
});

app.post("/products/:id/:action", function (req, res, next) {
    var inventoryItemDetailsDto = readModelFacade.GetInventoryItemDetails(req.params.id);

    if (req.params.action == "checkin") {
        var checkInItemsToInventory = new CheckInItemsToInventory(inventoryItemDetailsDto.id, 1, inventoryItemDetailsDto.version);

        bus.Send(checkInItemsToInventory);
    }
    if (req.params.action == "remove") {
        var removeItemsFromInventory = new RemoveItemsFromInventory(inventoryItemDetailsDto.id, 1, inventoryItemDetailsDto.version);

        bus.Send(removeItemsFromInventory);
    }
    if (req.params.action == "deactivate") {
        var deactivateInventoryItem = new DeactivateInventoryItem(inventoryItemDetailsDto.id, inventoryItemDetailsDto.version);

        bus.Send(deactivateInventoryItem);
    }
    if (req.params.action == "rename") {
        var renameInventoryItem = new RenameInventoryItem(inventoryItemDetailsDto.id, req.body.name, inventoryItemDetailsDto.version);

        bus.Send(renameInventoryItem);
    }
    res.send({ id: req.params.id, action: req.params.action });
});

app.use((req, res, next) => {
    next(createError(404));
});

app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

app.listen(port);
/*
var inventoryItemDetailsDto = readModelFacade.GetInventoryItemDetails("1q2we3r4r4r");

var checkInItemsToInventory = new CheckInItemsToInventory(inventoryItemDetailsDto.id, 1, inventoryItemDetailsDto.version);

bus.Send(checkInItemsToInventory);

var removeItemsFromInventory = new RemoveItemsFromInventory(inventoryItemDetailsDto.id, 1, inventoryItemDetailsDto.version);

bus.Send(removeItemsFromInventory);

var renameInventoryItem = new RenameInventoryItem(inventoryItemDetailsDto.id, "castle lego set", inventoryItemDetailsDto.version);

bus.Send(renameInventoryItem);

var deactivateInventoryItem = new DeactivateInventoryItem(inventoryItemDetailsDto.id, inventoryItemDetailsDto.version);

bus.Send(deactivateInventoryItem);*/

