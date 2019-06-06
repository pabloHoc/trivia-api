const 
    router = require('express').Router(),
    controller = require('./controller'),
    validator = require('./validator'),
    checkValidationResult = require('./../../middlewares/checkValidationResult');

router.get('/all/:sort?/:page?', controller.getAll);
router.get('/getrandom', controller.getRandom);
router.get('/byuser/:username/:sort?/:page?', validator('getByUsername'), checkValidationResult, controller.getByUsername);
router.get('/search/:query/:page?', controller.search);
router.get('/:id', validator('getChallenge'), checkValidationResult, controller.get);

router.post('/upvote/:id', controller.upvote);
router.post('/downvote/:id', controller.downvote);
router.post('/', validator('addChallenge'), checkValidationResult, controller.add);

module.exports = router;