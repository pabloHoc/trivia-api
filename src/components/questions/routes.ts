const 
    router = require('express').Router(),
    controller = require('./controller'),
    validator = require('./validator'),
    checkValidationResult = require('./../../middlewares/checkValidationResult');

router.get('/all/:sort?/:page?', controller.getAll);

router.get('/random', controller.getRandom);
router.get('/random/:category', controller.getRandomByCategory);
router.get('/bycategory/:category/:sort?/:page?', validator('getByCategory'), checkValidationResult, controller.getAllByCategory);
router.get('/byuser/:username/:sort?/:page?', validator('getByUsername'), checkValidationResult, controller.getByUsername);

router.get('/search/:query/:page?', controller.search);
router.get('/:id', validator('getQuestion'), checkValidationResult, controller.get);

router.post('/answer/:id', validator('answer'), checkValidationResult, controller.answerMany);
router.post('/upvote/:id', controller.upvote);
router.post('/downvote/:id', controller.downvote);
router.post('/', validator('addQuestion'), checkValidationResult, controller.add);

export default router;