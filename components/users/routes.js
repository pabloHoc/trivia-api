const controller = require('./controller');
const express = require('express');
const router = express.Router();
const validator = require('./validator');
const checkValidationResult = require('./../../middlewares/checkValidationResult');

router.get('/:username', controller.getByUsername);

router.post('/signin', validator('login'), checkValidationResult, controller.signIn);
router.post('/login', validator('login'), checkValidationResult, controller.login);
router.post('/follow/:following', validator('follow'), controller.follow);
router.post('/unfollow/:following', validator('follow'), controller.unfollow);

module.exports = router;