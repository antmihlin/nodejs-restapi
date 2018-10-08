/* 
 * Items routes
 */

const express = require('express');

const router = express.Router();

const passport = require('passport');

const itemCtrl = require('../controllers/item.controller');

const auth = require('../middlewares/auth.middleware');

// Create
router.post('/', auth.isLoggedIn(), itemCtrl.create);

// Retrieve all
router.get('/', /* auth.isLoggedIn(), */ itemCtrl.findAll);

// Retrieve a single
router.get('/:id', auth.isLoggedIn(), itemCtrl.findOne);

// Update by id
router.put('/:id', auth.isLoggedIn(), itemCtrl.update);

// Delete by id
router.delete('/:id', auth.isLoggedIn(), itemCtrl.delete);

module.exports = router;