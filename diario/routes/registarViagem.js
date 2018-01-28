var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser")
var Via = require("../models/viagem")
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


                var lista = Object.keys(fields)
                var opcoes = lista.filter( x => x.startsWith("opcao"))

                var hashtags = fields.keys.split(" ").filter(x => x!="")

                var viagem = new Via({
                    userId : userID,
                    titulo:fields.titulo,
                    descricao: fields.descricao,
                    data: new Date(),
                    datainicio: fields.datainicio,
                    datafim: fields.datafim,
                    local: fields.local,
                    keys: hashtags,
                    privado: fields.privado,
                    acompanhantes:opcoes.map(x => fields[x])
                    // fotos: fields.fotografia
                })
                viagem.save(function(err2, doc){
                    if(!err2){
                        // iterar sobre imagens e renomear os ficheiros
                        var i=0;
                        viagem.fotografias = []
                        for(x in files){
                            i++
                            if(x.startsWith("ficheiro")){
                                console.log("nome da foto: " + files[x].name)
                                console.log("caminho da foto: " + files[x].path)
                                if(files[x].name != ""){
                                    var extension = files[x].name.split(".")
                                    extension = extension[extension.length-1]
                                    var data = new Date()
                                    var novadata = data.toISOString().split(':').join('-')
                                    novadata = novadata.split('.').join('-')
                                    var novoNome = doc._id + "-"+novadata +"-" + i + "." + extension
                                    viagem.fotografias.push(novoNome)
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
                        viagem.save(function(err4,doc4){
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