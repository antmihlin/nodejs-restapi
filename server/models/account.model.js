/* 
 * Model for accounts
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const AccountSchema = new Schema({
	username: { type:String, unique:true },
	name: {type: String},
	surname: {type: String},
	email: {type: String, unique:true },
	activated: { tyle: Boolean, 'default': false }
}, { collection:"accounts" });

AccountSchema.plugin(passportLocalMongoose);

const Account = mongoose.model('Account', AccountSchema);
module.exports = Account;
