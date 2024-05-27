const express = require('express');
const router = express.Router();
const {login,verifyCode,join,postCode} = require('../controllers/auth')


router.post('/user/code', postCode);
router.post('/user/verify', verifyCode);
router.post('/join', join);
router.post('/login', login);


module.exports = router;