var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser")
var Ad = require("../models/atividade_desportiva")
var User = require("../models/user")
var formidable = require("formidable")
var fs = require('fs')

var listaDesportos = ['futebol','natação']

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('registarAct', { desportos: listaDesportos})
});

router.post('/',function(req,res,next) {
  
  var form= new formidable.IncomingForm();
  var status=""
  form.parse(req,function(err,fields,files){
    if(!err){
      console.log(JSON.stringify(fields))
      
      if(fields.privado === "on")
        fields.privado = true;
      else fields.privado = false;

            var currentUser = req.cookies.online;
            User.find({'username':req.cookies.online }).exec((err1,docs)=>{
                if(!err1){
                userID = docs[0]._id
                var ativDesp = new Ad({
                    userId : userID,
                    titulo:fields.titulo,
                    descricao: fields.descricao,
                    data: new Date(),
                    local: fields.local,
                    privado: fields.privado,
                    duracao: fields.duracao,
                    desporto: fields.desporto,
                })
          ativDesp.save(function(err1, doc){
            if(!err1){
              if(files.fotografia.name != ""){
                var extension = files.fotografia.name.split(".")
                extension = extension[extension.length-1]
                  var data = new Date()
                  var novadata = data.toISOString().split(':').join('-')
                  novadata = novadata.split('.').join('-')
                ativDesp.fotografia = doc._id + "-"+ novadata +"." + extension
                fs.rename(files.fotografia.path, './public/images/upload/' + ativDesp.fotografia, function(err1){
                  if(!err1){
                    ativDesp.save(function(err2,doc2){
                      if(!err2){
                        res.redirect('/feed')
                      }
                      else{
                        console.log("Erro ao adicionar fotografia da atividade desportiva à base de dados:\r\n" + err2 +"\r\n\r\n");
                        status="Ocorreu um erro, por favor tente novamente mais tarde."
                        res.render('registarAct' , {'status' : status , 'desportos' : listaDesportos })
                      }
                    })

                    console.log("Ficheiro recebido e guardado com sucesso")
                  }
                  else{
                    console.log("Ocorreram erros na gravação do ficheiro enviado")
                  }
                })
              }

            }
            else{
              console.log("Erro ao adicionar atividade desportiva à base de dados:\r\n" + err1 +"\r\n\r\n");
              status="Ocorreu um erro, por favor tente novamente mais tarde."
              res.render('registarAct' , {'status' : status , 'desportos' : listaDesportos })
            }

          })
        }
        else{
          console.log("Alguém anda a brincar com os cookies!!!");
          status="Ocorreu um erro, por favor tente novamente."
          res.render('registarAct' , {'status' : status , 'desportos' : listaDesportos})
        }
      })
    }
    else{
      console.log("Erro ao fazer parse do formulário atividade desportiva:\r\n" + err +"\r\n\r\n");
      status="Ocorreu um erro, por favor tente novamente."
      res.render('registarAct' , {'status' : status , 'desportos' : listaDesportos})
    }
  })
})

module.exports = router;