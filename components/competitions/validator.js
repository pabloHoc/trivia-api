const 
    { check } = require('express-validator/check'),
    MSGS = require('./../../utils/validation/validationMsgs'),
    validators = require('./../../utils/validation/customValidators');

module.exports = method => {
    switch(method) {
        case 'add':
            return [
                check('challenged', MSGS.REQUIRED).exists(),
                check('challenged', MSGS.STRING_REQUIRED).isString(),
            ]
        case 'getByUser':
            return [
                check('username', MSGS.REQUIRED).exists(),
                check('username', MSGS.STRING_REQUIRED).isString(),
            ]
        case 'play':
                return [
                    check('id', MSGS.REQUIRED).exists(),
                    check('username', MSGS.REQUIRED).exists(),
                    check('points', MSGS.REQUIRED).exists(),
                    
                    check('id', MSGS.STRING_REQUIRED).isString(),
                    check('username', MSGS.STRING_REQUIRED).isString(),
                    check('points', MSGS.NUMBER_REQUIRED).isNumeric(),
                ]            
        default:
            return [];            
    }
}