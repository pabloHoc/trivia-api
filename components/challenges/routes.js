const router = require('express').Router();
const controller = require('./controller');
const validator = require('./validator');
const checkValidationResult = require('./../../middlewares/checkValidationResult');

router.get('/all/:sort?/:page?', controller.getAll);
router.get('/find/:id', validator('getChallenge'), checkValidationResult, controller.get);
router.get('/getrandom', controller.getRandom);
router.get('/byuser/:username/:sort?/:page?', validator('getByUsername'), checkValidationResult, controller.getByUsername);
router.get('/search/:query/:page?', controller.search);

router.post('/', validator('addChallenge'), checkValidationResult, controller.add);

module.exports = router;