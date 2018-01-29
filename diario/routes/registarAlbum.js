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
  form.parse(req,function(err,fields,files){
    if(!err){
      console.log(JSON.stringify(fields))
      console.log("Ficheiros" + JSON.stringify(files))
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

          var album = new Album({
            userId : userID,
            titulo:fields.titulo,
            descricao: fields.descricao,
              keys: hashtags,
            data: new Date(),
            local: fields.local,
            privado: fields.privado,
            // fotos: fields.fotografia
          })
          album.save(function(err2, doc){
            if(!err2){
              // iterar sobre imagens e renomear os ficheiros
              var i=0;
              album.fotografias = []
              Object.keys(files).forEach(fotografia=>{
                i++
                if(files[fotografia].name != ""){
                    var extension = files[fotografia].name.split(".")
                    extension = extension[extension.length-1]
                    var data = new Date()
                    var novadata = data.toISOString().split(':').join('-')
                    novadata = novadata.split('.').join('-')
                    var novoNome = doc._id + "-" + nova +"-"+ i + "." + extension

                    var fenviado=files[fotografia].path
                    var fnovo=images_dir+novoNome
                    
                    var fotoObj = {}
                    
                    fotoObj.nome = novoNome
                    fotoObj.descricao = fields["descricao"+fotografia]
                    fotoObj.pessoas = []
                    Object.keys(fields).forEach(opcao => {
                        if(opcao.startsWith(fotografia+"opcao")){
                          if(fields[opcao]!='')
                            fotoObj.pessoas.push(fields[opcao])
                        }
                    })
                    album.fotografias.push(fotoObj)
                    fs.rename(files[fotografia].path, fnovo, function(err3){
                      if(!err3){
                        console.log("Ficheiro recebido e guardado com sucesso")
                        
                      }
                      else{
                        console.log("Ocorreram erros na gravação do ficheiro enviado")
                      }
                    })
                }
              })


              album.save(function(err4,docs2){
                if(err4){
                  status = "Ocorreram erros na gravação das fotografias na base de dados!"
                }
              })
              // adicionar status como parametro para o feed
              res.redirect('/feed')
            }
            else{
              console.log("Erro ao adicionar album fotográfico à base de dados:\r\n" + err2 +"\r\n\r\n");
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
