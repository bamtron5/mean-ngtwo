var mongoConnect = require('../../../admin/mongoConnect.js');
var mongoose = mongoConnect;
var Schema = mongoose.Schema;
var Support = require('./support');

var ClaimSchema   = new Schema({
  slug: {type: String, required: true},
  title: {type: String, required: true, index:true},
  tags: {type: [String], index:true},
  banner: {type: String},
  description: {type: String},
  claimSupport: []
});

ClaimSchema.index({title:'text', tags:'text'});

module.exports = mongoose.model('Claim', ClaimSchema);

mongoose.model('Claim').ensureIndexes(function(err) {
  if(err){
    console.log('ensure index', err)
  }
});
