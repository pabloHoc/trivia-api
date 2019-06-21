const 
    { check } = require('express-validator/check'),
    MSGS = require('./../../utils/validation/validationMsgs');

module.exports = method => {
    switch(method) {
        case 'addCateogry':
            return [
                check('name', MSGS.REQUIRED).exists(),
                check('name', MSGS.STRING_REQUIRED).isString(),
            ]
        default:
            return [];            
    }
}