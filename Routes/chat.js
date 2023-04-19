const router = require('express').Router();
const userController = require('../controllers/bot');
const { verifyTokenAndAuthorization } = require('../models/verification')

const {chatBot, getComplains, getAllComplains, removeComplain, updateComplains} = userController

router.post('/chat', verifyTokenAndAuthorization, chatBot);
router.get('/complains', verifyTokenAndAuthorization, getComplains);
router.get('/update-complain', verifyTokenAndAuthorization, updateComplains);
router.delete('/remove-complain/:id', verifyTokenAndAuthorization, removeComplain);
router.get('/all-complains', verifyTokenAndAuthorization, getAllComplains);


module.exports = router;
