var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser")
var Trabalho = require("../models/trabalho_academico")
var formidable = require("formidable")
var fs = require('fs')
/* GET home page. */

router.post('/',function(req,res,next) {
    var images_dir = './public/images/upload/'
    var form= new formidable.IncomingForm();
    var status=""

    form.parse(req,function(err,fields,files) {

        if(fields.privado === "on")
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
                curPath = images_dir + remocoes[rm]
                fs.unlinkSync(curPath);
            }
        }
        else { console.log("erro ao encontrar a pasta das imagens") }

        Trabalho.update(
            {'_id':fields._id},
            {$unset:{'ficheiros':1}}
        ).exec(function(err,docs){
            if(!err){
                console.log("Trabalho limpo de ficheiros")
            }
            else{
                console.log("Ocurreu um erro tentar limpar ficheiros")
            }
        })

        var lista = Object.keys(fields)
        var opcoes = lista.filter( x => x.startsWith("namefile"))
        var listaopcoes = opcoes.map(x => fields[x])
        console.log(listaopcoes)

        for(var ft in listaopcoes){
            console.log(listaopcoes[ft])
            if(listaopcoes[ft] != "") {
                Trabalho.update({'_id': fields._id}, {$push: {ficheiros: listaopcoes[ft]}}).exec(function(err,docs){
                    if(!err){
                        console.log("Evento Trabalho alterado com sucesso")
                    }
                    else{
                        console.log("Ocurreu um erro tentar editar evento Trabalho")
                    }
                })
            }
        }

        var i = 0
        for(x in files){
            i++
            if(x.startsWith("file")){
                console.log("nome da ficheiro: " + files[x].name)
                console.log("caminho da ficheiro: " + files[x].path)
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
                    Trabalho.update({'_id': fields._id}, {$push: {ficheiros: novoNome}}).exec(function(err,docs){
                        if(!err){
                            console.log("Evento Trabalho alterado com sucesso")
                        }
                        else{
                            console.log("Ocurreu um erro tentar editar evento Trabalho")
                        }
                    })

                }
            }
        }


        Trabalho.update(
            {'_id':fields._id},
            {$set:{'titulo':fields.titulo,
                'descricao':fields.descricao,
                'local':fields.local,
                'uc': fields.uc,
                'docente': fields.docente,
                'resultado': fields.resultado,
                'privado':fields.privado}}
        ).exec(function(err,docs){
            if(!err){
                console.log("Evento trabalho alterado com sucesso")
            }
            else{
                console.log("Ocurreu um erro tentar editar evento trabalho")
            }
        })

    })

    res.redirect('/feed')
})


module.exports = router;
