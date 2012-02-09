var Handler = function() {
};

Handler.prototype.Handle = function(event) {
    throw new Error("Handler.Handle must be overridden by subclass.");
};

module.exports = Handler;