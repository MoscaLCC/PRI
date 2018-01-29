var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser")
var Album = require("../models/album_fotografico")
var User = require("../models/user")
var formidable = require("formidable")
var fs = require('fs')


/* GET home page. */
router.get('/', function(req, res, next) {
    res.redirect('feed')
});

router.post('/',function(req,res,next) {
    var images_dir = './public/images/upload/'
    var form= new formidable.IncomingForm();
    var status=""
    form.parse(req,function(err,fields,files) {
    })
    res.redirect('feed')
})

module.exports = router;
