var mongoose     = require('../../admin/mongoConnect.js');
var Schema       = mongoose.Schema;

var TodoSchema   = new Schema({
    name: {type: String}
});

module.exports = mongoose.model('Todo', TodoSchema);