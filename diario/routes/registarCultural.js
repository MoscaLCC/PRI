var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser")
var Cul = require("../models/cultural")
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
  form.parse(req,function(err,fields,files){
    if(!err){

        var hashtags = fields.keys.split(" ").filter(x => x!="")
      if(fields.privado === "on")
        fields.privado = true;
      else fields.privado = false;
      // ir buscar object id do utilizador logado
      User.find({'username':req.cookies.online }).exec((err1,docs)=>{
        if(!err1){
          var userID = docs[0]._id

          // fazer teste se existe imagem(ns) para upload
          // asdasd

          var evento_cultural = new Cul({
            userId : userID,
            titulo:fields.titulo,
              keys: hashtags,
            descricao: fields.descricao,
            data: new Date(),
            local: fields.local,
            privado: fields.privado,
            tipo: fields.tipo
            // fotos: fields.fotografia
          })
          evento_cultural.save(function(err2, doc){
            if(!err2){
              // iterar sobre imagens e renomear os ficheiros
              var i=0
              evento_cultural.fotografias = []
              for(x in files){
                i++
                if(x.startsWith("ficheiro")){

                  if(files[x].name != ""){
                    var extension = files[x].name.split(".")
                    extension = extension[extension.length-1]
                      var data = new Date()
                      var novadata = data.toISOString().split(':').join('-')
                      novadata = novadata.split('.').join('-')
                    var novoNome = doc._id + "-" + novadata + "-" + i +"." + extension
                      evento_cultural.fotografias.push(novoNome)
                    var fenviado=files[x].path
                    var fnovo=images_dir+novoNome

                    fs.rename(files[x].path, fnovo, function(err3){
                      if(!err3){
                        console.log("Ficheiro recebido e guardado com sucesso")
                      }
                      else{
                        console.log("Ocorreram erros na gravação do ficheiro enviado")
                      }
                    })
                  }
                }
              }
              evento_cultural.save(function(err4,doc4){
                if(!err4){
                  // IMAGEM GUARDADA COM SUCESSO
                }
                else{
                  console.log("Erro ao adicionar fotografia do evento cultural à base de dados:\r\n" + err4 +"\r\n\r\n");
                  status="Ocorreu um erro, por favor tente novamente mais tarde."
                  
                  // adicionar status como parametro para o feed
                  res.redirect('/feed')
                }
              })

              // adicionar status como parametro para o feed
              res.redirect('/feed')
            }
            else{
              console.log("Erro ao adicionar evento cultural à base de dados:\r\n" + err2 +"\r\n\r\n");
              status="Ocorreu um erro, por favor tente novamente mais tarde."
              // adicionar status como parametro para o feed
              res.redirect('/feed')
            }

          })
        }
        else{
          console.log("Alguém anda a brincar com os cookies!!!");
          status="Ocorreu um erro, por favor tente novamente."
          
          // adicionar status como parametro para o feed
          res.redirect('/feed')
          
        }
      })
    }
    else{
      console.log("Erro ao fazer parse do formulário de evento cultural\r\n" + err +"\r\n\r\n");
      // adicionar status como parametro para o feed
      res.redirect('/feed')
    }
  })
})

module.exports = router;
