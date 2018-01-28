var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser")
var Viagem = require("../models/viagem")
var formidable = require("formidable")
var fs = require('fs')
/* GET home page. */

router.post('/',function(req,res,next) {
    var form= new formidable.IncomingForm();
    var status=""
    var images_dir = './public/images/upload/'
    form.parse(req,function(err,fields,files) {

        if(!err) {
            if (fields.privado === "on")
                fields.privado = true;
            else fields.privado = false;


            if (fs.existsSync(images_dir)) {
                var removidos = Object.keys(fields)
                console.log("removidos => " + removidos)
                var soremovidos = removidos.filter(x => x.startsWith("removido"))
                console.log("soremovidos => " + soremovidos)
                var remocoes = soremovidos.map(x => fields[x])
                console.log("remocoes => " + remocoes)

                for (var rm in remocoes) {
                    try {
                        curPath = images_dir + remocoes[rm]
                        fs.unlinkSync(curPath);
                    }catch(err){console.log("ERRO:" + err)}
                }
            }
            else { console.log("erro ao encontrar a pasta das imagens") }

            Viagem.update(
                {'_id':fields._id},
                {$unset:{'fotografias':1}}
            ).exec(function(err,docs){
                if(!err){
                    console.log("Cultural limpo de fotografias")
                }
                else{
                    console.log("Ocurreu um erro tentar limpar fotografias")
                }
            })

            var lista = Object.keys(fields)
            var opcoes = lista.filter( x => x.startsWith("namefoto"))
            var listaopcoes = opcoes.map(x => fields[x])
            console.log(listaopcoes)

            for(var ft in listaopcoes){
                console.log(listaopcoes[ft])
                if(listaopcoes[ft] != "") {
                    Viagem.update({'_id': fields._id}, {$push: {fotografias: listaopcoes[ft]}}).exec(function(err,docs){
                        if(!err){
                            console.log("Evento Cultural alterado com sucesso")
                        }
                        else{
                            console.log("Ocurreu um erro tentar editar evento cultural")
                        }
                    })
                }
            }

            var i = 0
            for(x in files){
                i++
                if(x.startsWith("foto")){
                    console.log("nome da foto: " + files[x].name)
                    console.log("caminho da foto: " + files[x].path)
                    if(files[x].name != ""){
                        var extension = files[x].name.split(".")
                        extension = extension[extension.length-1]
                        console.log("valor = " + i)
                        var data = new Date()
                        var novadata = data.toISOString().split(':').join('-')
                        novadata = novadata.split('.').join('-')
                        var novoNome = fields._id + "-" + novadata + "-" + i + "." + extension
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
                        Viagem.update({'_id': fields._id}, {$push: {fotografias: novoNome}}).exec(function(err,docs){
                            if(!err){
                                console.log("Evento Cultural alterado com sucesso")
                            }
                            else{
                                console.log("Ocurreu um erro tentar editar evento cultural")
                            }
                        })

                    }
                }
            }

            var lista = Object.keys(fields)
            var opcoess = lista.filter( x => x.startsWith("opcao"))

            Viagem.update(
                {'_id': fields._id},
                {$set: {'titulo': fields.titulo,
                        'descricao': fields.descricao,
                        'datainicio': fields.datainicio,
                        'datafim': fields.datafim,
                        'local': fields.local,
                        'privado': fields.privado,
                        'acompanhantes': opcoess.map(x => fields[x])}
                }).exec(function (err, docs) {
                if(!err){
                    console.log("viagem alterado com sucesso")
                }
                else{
                    console.log("Ocurreu um erro tentar editar viagem")
                }
            })
            res.redirect('/feed')

        }else {
            console.log("Ocurreo um erro ao tentar editar a viagem")
            res.redirect('/feed')
        }
    })
})

module.exports = router;