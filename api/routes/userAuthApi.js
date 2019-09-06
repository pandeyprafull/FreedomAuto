const router  = require('express').Router();
const authController = require('../../models/authController')

router.post('/signup', authController.postSignUp)

router.get('/login', authController.getLogin)

router.post('/login', authController.postLogin)

module.exports = router;