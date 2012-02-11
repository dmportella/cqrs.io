// dont like this i want nice worded properties and not just pickup any crap off the folder

var fs = require('fs');

fs.readdirSync(__dirname + '/domain').forEach(function(filename){
  if (/\.js$/.test(filename)) {
    var name = filename.substr(0, filename.lastIndexOf('.'));
    module.exports.__defineGetter__(name, function(){
      return require('./domain/' + name);
    });
  }
});

module.exports.builtin = {};

fs.readdirSync(__dirname + '/builtin').forEach(function(filename){
  if (/\.js$/.test(filename)) {
    var name = filename.substr(0, filename.lastIndexOf('.'));
    module.exports.builtin.__defineGetter__(name, function(){
      return require('./builtin/' + name);
    });
  }
});