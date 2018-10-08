/*
 * Items controller
 */

const CRUD = require('../middlewares/CRUD.middleware');
/*------------------Models------------------------------------*/
const ItemModel = require('../models/item.model');

/*------------------------------------------------------*/

exports.create = function(req, res) {
    // Create and Save
	CRUD.create(req,res,ItemModel);
};

exports.findAll = function(req, res) {
    // Retrieve and return all  from the database.
	CRUD.findAll(req,res,ItemModel);
};

exports.findOne = function(req, res) {
    // Find a single
	CRUD.findOne(req,res,ItemModel);
};

exports.update = function(req, res) {
	// Update
	CRUD.update(req,res,ItemModel);
};

exports.delete = function(req, res) {
    // Delete an item with the specified ID in the request
	CRUD.delete(req,res,ItemModel);
};