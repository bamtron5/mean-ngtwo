var mongoConnect = require('../../../admin/mongoConnect.js');
var mongoose = mongoConnect;
var Schema       = mongoose.Schema;
var bcrypt      = require('bcrypt');
var SALT_WORK_FACTOR = 10;

var UserSchema   = new Schema({
    name: {type: String, required: true, index: {unique: true}},
    password: {type: String, required: true, select: false},
    email: {type: String, required: true},
    role: {type: String, required: true},
    testData: {type: Boolean, default: false},
    active: {type: Boolean, default:false},
    activeDate: {type: String, required: true, default: new Date()}
});

UserSchema.pre('save', function(next){
	var user = this;

	if(!user.isModified('password'))
		return next();

	bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
		if(err)
			return next(err);

		bcrypt.hash(user.password, salt, function(err, hash){
			if(err)
				return next(err);

			user.password = hash;
			user.activeDate = new Date();
			next();
		});
	});

});

UserSchema.methods.comparePassword = function(candidatePassword, cb){
	bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
		if(err)
			return cb(err);
		cb(null, isMatch);
	});
}

//@param: from route req next param
//@param: typeof name === string
//@param: typeof models === <list[models]>
UserSchema.methods.starterKit = (next, name, models) => {
	return new Promise((resolve, reject) => {
		models.map((val) => {
			var curModel = new val();
			curModel.name = name;
			curModel.save((err, profile) => {
				if(err){
					return reject();
				}
			})
		});
		resolve();
	});
	
}

module.exports = mongoose.model('AppUser', UserSchema);