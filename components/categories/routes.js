const 
    router = require('express').Router(),
    controller = require('./controller'),
    validator = require('./validator'),
    checkValidationResult = require('./../../middlewares/checkValidationResult');

router.get('/', controller.getAll);
router.get('/ranking/:sort?', controller.getRanking);
router.post('/', validator('addCategory'), checkValidationResult, controller.add);

module.exports = router;