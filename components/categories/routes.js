const 
    router = require('express').Router(),
    controller = require('./controller'),
    validator = require('./validator'),
    checkValidationResult = require('./../../middlewares/checkValidationResult');

router.get('/:sort?', controller.getAll);
router.post('/', validator('addCategory'), checkValidationResult, controller.add);

module.exports = router;