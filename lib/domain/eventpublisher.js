var EventPublisher = function () {
};

EventPublisher.prototype.Publish = function (event) {
    throw new Error("EventPublisher.Publish must be overridden by subclass.");
};

module.exports = EventPublisher;