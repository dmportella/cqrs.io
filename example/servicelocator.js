var ServiceLocator = function () {
    if (arguments.callee.instance) {
        return arguments.callee.instance;
    }
    arguments.callee.instance = this;
    this.services = [];
};

ServiceLocator.prototype.getService = function (name) {
    if (!(name in this.services)) {
        throw new Error("There are not services registered with this name.");
    }
    return this.services[name];
};

ServiceLocator.prototype.registerService = function (name, service) {
    if (name in this.services) {
        throw new Error("A service with the same name is already registered.");
    }
    this.services[name] = service;
};

ServiceLocator.prototype.unregisterService = function (name) {
    if (name in this.services) {
        var service = this.services[name];
        this.services.splice(this.services.indexOf(service), 1);
    }
};

module.exports = new ServiceLocator();