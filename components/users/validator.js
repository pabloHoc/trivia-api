const { check } = require('express-validator/check')
const MSGS = require('utils/validation/validationMsgs');

module.exports = method => {
    switch(method) {
        case 'login':
            return [
                check('username', MSGS.REQUIRED).exists(),
                check('password', MSGS.REQUIRED).exists(),
            
                check('username', MSGS.STRING_REQUIRED).isString(),
                check('password', MSGS.STRING_REQUIRED).isString(),
            ]
        case 'follow':
            return [
                check('follower', MSGS.REQUIRED).exists(),
                check('following', MSGS.REQUIRED).exists(),
            
                check('follower', MSGS.STRING_REQUIRED).isString(),
                check('following', MSGS.STRING_REQUIRED).isString(),
            ]
        default:
            return [];            
    }
}