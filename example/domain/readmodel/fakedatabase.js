var FakeDatabase = function () {
    if (arguments.callee.instance) {
        return arguments.callee.instance;
    }
    arguments.callee.instance = this;
    this.details = [];
    this.list = [];
};

FakeDatabase.getInstance = function () {
    var fakeDatabase = new FakeDatabase();
    return fakeDatabase;
};

module.exports = FakeDatabase;