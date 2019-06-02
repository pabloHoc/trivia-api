const router = require('express').Router();
const controller = require('./controller');
const validator = require('./validator');
const checkValidationResult = require('./../../middlewares/checkValidationResult');

router.get('/all/:sort?/:page?', controller.getAll);
router.get('/random', controller.getRandom);
router.get('/random/:category', controller.getRandomByCategory);
router.get('/bycategory/:category/:sort?/:page?', validator('getByCategory'), checkValidationResult, controller.getAllByCategory);
router.get('/byuser/:username/:sort?/:page?', validator('getByUsername'), checkValidationResult, controller.getByUsername);
router.get('/find/:id', validator('getQuestion'), checkValidationResult, controller.get);

router.post('/', validator('addQuestion'), checkValidationResult, controller.add);

module.exports = router;