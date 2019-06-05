const 
    controller = require('./controller'),
    express = require('express'),
    router = express.Router(),
    validator = require('./validator'),
    checkValidationResult = require('./../../middlewares/checkValidationResult');

router.get('/all/:sort/:page?', controller.getAll);
router.get('/:username', controller.getByUsername);

router.post('/signin', validator('login'), checkValidationResult, controller.signIn);
router.post('/login', validator('login'), checkValidationResult, controller.login);
router.post('/follow/:following', validator('follow'), controller.follow);
router.post('/unfollow/:following', validator('follow'), controller.unfollow);

module.exports = router;