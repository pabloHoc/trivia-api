const router = require('express').Router();
const controller = require('./controller');
const validator = require('./validator');
const checkValidationResult = require('./../../middlewares/checkValidationResult');

router.get('/:sort?', controller.getAll);
router.post('/', validator('addCategory'), checkValidationResult, controller.add);

module.exports = router;