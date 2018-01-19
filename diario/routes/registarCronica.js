var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser")
var Cro = require("../models/cronica")
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

            if(fields.privado === "on")
                fields.privado = true;
            else fields.privado = false;
            // ir buscar object id do utilizador logado
            User.find({'username':req.cookies.online }).exec((err1,docs)=>{
                if(!err1){
                    var userID = docs[0]._id

                    // fazer teste se existe imagem(ns) para upload
                    // asdasd

                    var cronica = new Cro({
                        userId : userID,
                        titulo:fields.titulo,
                        descricao: fields.descricao,
                        data: new Date(),
                        local: fields.local,
                        privado: fields.privado
                        // ficheiro: fields.ficheiro
                    })
                    cronica.save(function(err2, doc){
                        if(!err2){
                            // iterar sobre imagens e renomear os ficheiros
                            var i=0;
                            cronica.ficheiros = []
                            for(x in files){
                                i++
                                if(x.startsWith("ficheiro")){
                                    console.log("nome da foto: " + files[x].name)
                                    console.log("caminho da foto: " + files[x].path)
                                    if(files[x].name != ""){
                                        var extension = files[x].name.split(".")
                                        extension = extension[extension.length-1]
                                        var novoNome = doc._id + "-" + i + "." + extension
                                        cronica.ficheiros.push(novoNome)
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
                            cronica.save(function(err4,doc4){
                                if(!err4){
                                    // IMAGEM GUARDADA COM SUCESSO
                                }
                                else{
                                    console.log("Erro ao adicionar ficheiro do cronica à base de dados:\r\n" + err4 +"\r\n\r\n");
                                    status="Ocorreu um erro, por favor tente novamente mais tarde."

                                    // adicionar status como parametro para o feed
                                    res.redirect('/feed')
                                }
                            })

                            // adicionar status como parametro para o feed
                            res.redirect('/feed')
                        }
                        else{
                            console.log("Erro ao adicionar a cronica à base de dados:\r\n" + err2 +"\r\n\r\n");
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
            console.log("Erro ao fazer parse do formulário da cronica\r\n" + err +"\r\n\r\n");
            // adicionar status como parametro para o feed
            res.redirect('/feed')
        }
    })
})

module.exports = router;