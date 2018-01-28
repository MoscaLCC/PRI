var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser")
var Cultural = require("../models/cultural")
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
                    try {
                        curPath = images_dir + remocoes[rm]
                        fs.unlinkSync(curPath);
                    }catch(err){console.log("ERRO:" + err)}
                }
        }
        else { console.log("erro ao encontrar a pasta das imagens") }

        Cultural.update(
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
                Cultural.update({'_id': fields._id}, {$push: {fotografias: listaopcoes[ft]}}).exec(function(err,docs){
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
                    Cultural.update({'_id': fields._id}, {$push: {fotografias: novoNome}}).exec(function(err,docs){
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

        Cultural.update(
            {'_id':fields._id},
            {$set:{'titulo':fields.titulo,
                'descricao':fields.descricao,
                'local':fields.local,
                'tipo': fields.tipo,
                'privado':fields.privado}}
        ).exec(function(err,docs){
            if(!err){
                console.log("Evento Cultural alterado com sucesso")
            }
            else{
                console.log("Ocurreu um erro tentar editar evento cultural")
            }
        })

    })

    res.redirect('/feed')
})


module.exports = router;
