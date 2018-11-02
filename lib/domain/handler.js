var Handler = function () {
};

Handler.prototype.Handle = function (message) {
    throw new Error("Handler.Handle must be overridden by subclass.");
};

module.exports = Handler;