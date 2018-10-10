/* 
 * Accounts route
 */

const express = require('express');
const passport = require('passport');
const accountCtrl = require('../controllers/account.controller');
const router = express.Router();
const auth = require('../middlewares/auth.middleware');

router.post('/', auth.isLoggedIn(), accountCtrl.create);
router.post('/login', passport.authenticate('local'), accountCtrl.login);
router.get('/logout', auth.isLoggedIn(), accountCtrl.logout);


router.get('/register', function (req, res) {
	res.status(200).sendFile(global.appRoot+'/server/views/register.html');
});

router.get('/login',  function (req, res) {
	//res.render('login', { user : req.user });
	res.status(200).sendFile(global.appRoot+'/server/views/login.html');
});

router.get('/', auth.isLoggedIn(), accountCtrl.findAll);
router.get('/:id', auth.isLoggedIn(), accountCtrl.findOne);
router.put('/:id', auth.isLoggedIn(), accountCtrl.update);
router.delete('/:id', auth.isLoggedIn(), accountCtrl.delete);

module.exports = router;