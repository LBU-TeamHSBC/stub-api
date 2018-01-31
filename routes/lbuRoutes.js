var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.send('Leeds Beckett University');
});

module.exports = router;