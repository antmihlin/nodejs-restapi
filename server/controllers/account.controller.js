'use strict'
const database = require('../config/database');
const ObjectID = require('mongodb').ObjectID;
const mongoose = require('mongoose');

//Get the default connection
const db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const passport = require('passport');
const jwt = require('jsonwebtoken');
require('../config/passport');

const CRUD = require('../middlewares/CRUD.middleware');
/*------------------Models------------------------------------*/
const AccountModel = require('../models/account.model');

/*------------------------------------------------------*/

exports.create =  function (req, res) {
	AccountModel.register(new AccountModel(req.body), req.body.password, function (err, account) {
		if (err) {
			return res.status(500).json("Error" + err);
		} else {
			res.status(200).json('Registered');
		}
	});
};
exports.login = function (req, res) {
	req.login(req.user, {session: false}, function (err, data) {
		if (err) {
			return next(err);
		}
		const token = jwt.sign(req.user.toJSON(), 'your_jwt_secret' ,{ expiresIn: '15m' } );
		return res.status(200).json({ id: req.user.id, username: req.user.username, token });
	});
};
exports.logout = function (req, res) {
	req.logout();
	res.status(200).json('Logged out');
};
exports.isAuthorized = function (req, res) {
	if (req.isAuthenticated() === false) {
		return res.status(401).send(req.isAuthenticated());
	}
	//console.log( req.user );
	return res.status(200).json({ id: req.user.id, username: req.user.username});
};

exports.findAll = function(req, res) {
    // Retrieve and return all  from the database.
	CRUD.findAll(req,res,AccountModel);
};

exports.findOne = function(req, res) {
    // Find a single
	CRUD.findOne(req,res,AccountModel);
};

exports.update = function(req, res) {
	// Update
	CRUD.update(req,res,AccountModel);
};

exports.delete = function(req, res) {
    // Delete a note with the specified noteId in the request
	CRUD.delete(req,res,AccountModel);
};