const router = require('express').Router();
const controller = require('./controller');
const validator = require('./validator');
const checkValidationResult = require('middlewares/checkValidationResult');

router.get('/byuser/:username/:status?/:page?', validator('getByUser'), checkValidationResult, controller.getByUser);
router.post('/play/:id/:username/:points', validator('play'), checkValidationResult, controller.play);
router.post('/invite/:challenged/:category?', validator('add'), checkValidationResult, controller.add);

module.exports = router;