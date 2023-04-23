const router = require('express').Router();
const userController = require('../controllers/userController');
const adminController = require('../controllers/adminController');

const { createAdmin, AdminLogin } = adminController;
const {AccountLogin, createAccount} = userController

router.post('/create-account', createAccount);
router.post('/login', AccountLogin);
router.post('/admin-login', AdminLogin);

module.exports = router;
