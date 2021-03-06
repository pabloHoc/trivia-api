const 
    { check } = require('express-validator/check')
    MSGS = require('./../../utils/validation/validationMsgs'),
    validators = require('./../../utils/validation/customValidators');

module.exports = method => {
    switch(method) {
        case 'addQuestion':
            return [
                check('title', MSGS.REQUIRED).exists(),
                check('answer', MSGS.REQUIRED).exists(),
                check('answers', MSGS.REQUIRED).exists(),
                check('category', MSGS.REQUIRED).exists(),

                check('title', MSGS.STRING_REQUIRED).isString(),
                check('answer', MSGS.STRING_REQUIRED).isString(),
                check('answers', MSGS.ARRAY_REQUIRED).isArray(),
                check('answers').custom(answers => validators.minItems(answers, 3)),
                check('category', MSGS.STRING_REQUIRED).isString(),
            ]
        case 'getQuestion':
            return [
                check('id', MSGS.REQUIRED).exists(),
            ]
        case 'getByCategory':
            return [
                check('category', MSGS.REQUIRED).exists(),
            ]
        case 'getByUsername':
            return [
                check('username', MSGS.REQUIRED).exists(),
            ]       
        case 'answer':
            return [
                check('questions', MSGS.REQUIRED).exists(),
                check('questions', MSGS.ARRAY_REQUIRED).isArray(),
            ]                  
        default:
            return [];            
    }
}