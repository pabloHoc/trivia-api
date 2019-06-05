const 
    router = require('express').Router(),
    controller = require('./controller'),
    validator = require('./validator'),
    checkValidationResult = require('./../../middlewares/checkValidationResult');

router.get('/:status?/:page?', validator('getByUser'), checkValidationResult, controller.getByUser);
router.post('/play/:id/:points', validator('play'), checkValidationResult, controller.play);
router.post('/invite/:challenged/:category?', validator('add'), checkValidationResult, controller.add);

module.exports = router;