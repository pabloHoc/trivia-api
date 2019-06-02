const { check } = require('express-validator/check')
const MSGS = require('utils/validation/validationMsgs');
const validators = require('utils/validation/customValidators');

module.exports = method => {
    switch(method) {
        case 'addChallenge':
            return [
                check('title', MSGS.REQUIRED).exists(),
                check('description', MSGS.REQUIRED).exists(),
                check('questions', MSGS.REQUIRED).exists(),

                check('title', MSGS.STRING_REQUIRED).isString(),
                check('questions', MSGS.ARRAY_REQUIRED).isArray(),
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