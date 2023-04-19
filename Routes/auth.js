const router = require('express').Router();
const userController = require('../controllers/userController');

const {AccountLogin, createAccount} = userController

router.post('/create-account', createAccount);
router.post('/login', AccountLogin);

module.exports = router;
