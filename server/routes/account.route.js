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
	res.status(200).send(`
	<form method="post" action="/account/">
	<input type="text" name="username" placeholder='Enter Username'/>
	<input type="text" name="name" placeholder='Enter name'/>
	<select name="role" placeholder="Select role" >
		<option value="0">Administrator</option>
		<option value="1">Director</option>
		<option value="2">Teacher</option>
		<option value="3">Learner</option>
	</select>
	
	<input type="password" name="password" placeholder='Enter password'/>
	<button type="submit">Submit</button>
	</form>
`);
});

router.get('/login',  function (req, res) {
	//res.render('login', { user : req.user });
	res.status(200).send(`
	<form method="post" action="login">
	<input type="text" name="username" placeholder='Enter Username'/>
	<input type="password" name="password" placeholder='Enter password'/>
	<button type="submit">Submit</button>
	</form>
	`);
});

router.get('/', auth.isLoggedIn(), accountCtrl.findAll);
router.get('/:id', auth.isLoggedIn(), accountCtrl.findOne);
router.put('/:id', auth.isLoggedIn(), accountCtrl.update);
router.delete('/:id', auth.isLoggedIn(), accountCtrl.delete);

module.exports = router;