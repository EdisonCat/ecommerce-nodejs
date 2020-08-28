const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');

router.post('/signup', UserController.user_post_signup);

router.post('/login', UserController.user_post_login);

router.delete('/:userId', UserController.user_delete_user);

module.exports = router;