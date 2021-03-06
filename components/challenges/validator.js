const 
    { check } = require('express-validator/check'),
    MSGS = require('./../../utils/validation/validationMsgs'),
    validators = require('./../../utils/validation/customValidators');

module.exports = method => {
    switch(method) {
        case 'addChallenge':
            return [
                check('title', MSGS.REQUIRED).exists(),
                check('description', MSGS.REQUIRED).exists(),
                check('questions', MSGS.REQUIRED).exists(),

                check('title', MSGS.STRING_REQUIRED).isString(),
                check('questions', MSGS.ARRAY_REQUIRED).isArray(),
                check('questions').custom(questions => validators.eqItems(questions, 10)),
            ]
        case 'getChallenge':
            return [
                check('id', MSGS.REQUIRED).exists(),
            ]
        case 'getByUsername':
            return [
                check('username', MSGS.REQUIRED).exists(),
            ]                
        default:
            return [];            
    }
}