/* 
 * Model for items
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
	title: { type:String},
	desc: {type: String}
}, { collection:"items" });

const Item = mongoose.model('Item', ItemSchema);
module.exports = Item;
