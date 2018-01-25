var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser")
var user = require("../models/user")
var formidable = require("formidable")
var User = require("../models/user")

var fs = require('fs')
var cookieParser = require("cookie-parser")

/* GET home page. */
router.get('/', function(req, res, next) {
    var currentUser = req.cookies.online;
    User.find({'username': currentUser}).exec((err1,docs1)=>{
        if(!err1){
          if(docs1.length>0){
            var userDoc = docs1[0]
            //Calculo da Idade//
            var ageDifMs = Date.now() - userDoc.dataNascimento.getTime();
            var ageDate = new Date(ageDifMs); // miliseconds from epoch
            userDoc.idade=Math.abs(ageDate.getUTCFullYear() - 1970);
            var userID = userDoc._id  
            res.render('perfil',{
                user:{
                username: currentUser ,
                foto: userDoc.foto,
                idade: userDoc.idade,
                email:userDoc.email,
                pnome:userDoc.pnome,
                unome:userDoc.unome,
                password:userDoc.password
                }
            })
            }  
        }
        else{
            console.log("Utilizador não existe")
        }   
});
})
module.exports = router;
