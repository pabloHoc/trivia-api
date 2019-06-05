const 
    controller = require('./controller'),
    express = require('express'),
    router = express.Router();

router.get('/:limit?/:page?', controller.get);

module.exports = router;