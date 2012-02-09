var CommandSender = function() {
};

CommandSender.prototype.Send = function(command) {
    throw new Error("CommandSender.Send must be overridden by subclass.");
};

module.exports = CommandSender;