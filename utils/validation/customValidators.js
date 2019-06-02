const MSGS = require('./validationMsgs');

module.exports = {
    minItems(field, items) {
        if (field.length < items)
            throw new Error(MSGS.MIN_ITEMS(items))
        return true;            
    }
}