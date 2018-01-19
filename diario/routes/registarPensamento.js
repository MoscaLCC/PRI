var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser")
var Pen = require("../models/pensamento")
var User = require("../models/user")
var formidable = require("formidable")
var fs = require('fs')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('feed')
});

router.post('/',function(req,res,next) {
  
  var form= new formidable.IncomingForm();
  var status=""
  form.parse(req,function(err,fields,files){
    if(!err){      
      if(fields.privado === "on")
        fields.privado = true;
      else fields.privado = false;
      
      var currentUser = req.cookies.online;
      User.find({'username':req.cookies.online }).exec((err1,docs)=>{
        if(!err1){
          userID = docs[0]._id
          var pensamento = new Pen({
            userId : userID,
            titulo:fields.titulo,
            descricao: fields.descricao,
            data: new Date(),
            local: fields.local,
            privado: fields.privado
          })
          pensamento.save(function(err1, doc){
                if(!err1){
                  res.redirect('/feed')
                }
                else{
                  console.log("Erro ao adicionar pensamento à base de dados:\r\n" + err1 +"\r\n\r\n");
                 //status="Ocorreu um erro ao adicionar o Pensamento"
                  res.redirect('/feed')
                }
            })
        }
        else{
          //console.log("Alguém anda a brincar com os cookies!!!");
          //status="Ocorreu um erro, por favor tente novamente."
          res.redirect('/feed')
        }
      })
    }
    else{
      //console.log("Erro ao fazer parse do formulário de pensamento\r\n" + err +"\r\n\r\n");
      res.redirect('/feed')
    }
  })
})

module.exports = router;
