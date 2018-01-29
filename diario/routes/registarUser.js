var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser")
var user = require("../models/user")
var formidable = require("formidable")
var fs = require('fs')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('registarUser', { title: 'Registar utilizador'});
  
});

router.post('/',function(req,res,next) {
  var form= new formidable.IncomingForm();
  var status=""
  
  form.parse(req,function(err,fields,files){
    // verificar se todos os campos obrigatorios foram preenchidos
    var requiredFields = Object.keys(user.schema.tree).filter(x => user.schema.tree[x].required ===true)
    var emptyField = false

    var data_partida=fields.dataNascimento.split('-');
    var dataAux=new Date(data_partida[0], data_partida[1]-1, data_partida[2]); 
    fields.dataNascimento=dataAux
 
    for(f in requiredFields){
      if(fields[requiredFields[f]] === undefined)
        emptyField=true
    }
    if(emptyField){
      status="Por favor preencha todos os campos obrigatórios"
      res.render('registarUser',{ title: 'Registar utilizador' , status: status  }); 
    }
    else{
      //verificar se já existe algum utilizador com o username inserido no formulário
      user.find({'username': fields.username},function(err2,docs){
        if(!err2){
          if(docs.length === 0){
            
        
            if(fields.password!=fields.password2){
              status="Erro na confirmação de password"
              res.render('registarUser',{ title: 'Registar utilizador' , status: status}); 
            }
            else{
              var newUser = new user()
              
              newUser.username = fields.username
              newUser.password = fields.password
              newUser.dataNascimento = fields.dataNascimento
              newUser.email = fields.email
              newUser.pnome = fields.pnome
              newUser.unome = fields.unome
              newUser.sexo = fields.sexo
              if(files.fotografia.name!=""){
                var fenviado=files.fotografia.path
                var extension = files.fotografia.name.split(".")
                extension = extension[extension.length-1]
                var novoNome = 'fp-'+fields.username + "." + extension
                newUser.foto = novoNome
                var fnovo='./public/images/upload/'+novoNome
                fs.rename(fenviado,fnovo,function(err3){
                  if(!err3){
                      status="Ficheiro Recebido e guardado com sucesso"

                    }
                  else{
                      status="Ocorreram erros na gravação do ficheiro enviado";
                  }
                })
              }  
              newUser.save(function(err3, doc){
                if(!err3){
                 status="Registo Efetuado com sucesso."
                  // MANDAR STATUS COMO PARAMETRO
                  res.redirect("/login")
                }
                else{
                  console.log("Erro ao efetuar o registo:\r\n" + err +"\r\n\r\n");
                  status+="Ocorreu um erro: "+err3
                  res.render('registarUser',{ title: 'Registar utilizador' , status: status  }); 
                }
              });
            }
          }
          else{
            res.render('registarUser',{title: 'Registar utilizador',
                                      status: 'Já existe um utilizador com esse username'})
          }
        }
        else{
          console.log("Erro a adicionar utilizador: "+err2)
          res.render('registarUser',{title: 'Registar utilizador',
                                    status: 'Ocorreu um erro, por favor tente novamente'})
        }
      })
    } 
  })
  
})

module.exports = router;
