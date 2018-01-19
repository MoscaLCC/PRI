var express = require('express');
var router = express.Router();
var cookieParser = require("cookie-parser")

/* GET home page. */
router.get('/', function(req, res, next) {
    res.clearCookie("online")
    res.redirect('/login')
});



module.exports = router;