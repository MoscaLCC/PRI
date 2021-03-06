var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser")
var Atividade = require("../models/atividade_desportiva")
var formidable = require("formidable")
var fs = require('fs')
/* GET home page. */

router.post('/',function(req,res,next) {
    var images_dir = './public/images/upload/'
    var form= new formidable.IncomingForm();
    var status=""

    form.parse(req,function(err,fields,files) {
        if(!err){
        if(fields.privado === "on")
            fields.privado = true;
        else fields.privado = false;


            if(files.foto1.name != "" && fields.namefoto != "" ){
                var extension = files.foto1.name.split(".")
                extension = extension[extension.length-1]
                var data = new Date()
                var novadata = data.toISOString().split(':').join('-')
                novadata = novadata.split('.').join('-')
                fields.fotografia = fields._id + "-" + novadata + "." + extension
                fs.rename(files.foto1.path, './public/images/upload/' + fields.fotografia, function(err1){
                    if(!err1){
                        console.log("Ficheiro recebido e guardado com sucesso")
                    }
                    else{
                        console.log("Ocorreram erros na gravação do ficheiro enviado")
                    }
                })
                Atividade.update(
                    {'_id':fields._id},
                    {$set:{'fotografia':fields.fotografia}}
                ).exec(function(err,docs){
                    if(!err){
                        console.log("Actividade desportiva alterado com sucesso")
                    }
                    else{
                        console.log("Ocurreu um erro tentar editar Ideia")
                    }
                })

            }
            else{
                if(fields.namefoto == ""){
                    Atividade.update(
                        {'_id':fields._id},
                        {$unset:{'fotografia':1}}
                    ).exec(function(err,docs){
                        if(!err){
                            console.log("Actividade desportiva alterado com sucesso")
                        }
                        else{
                            console.log("Ocurreu um erro tentar editar Ideia")
                        }
                    })
                }
            }

            if(fields.removido!=""){
                try {
                    curPath = images_dir + removido
                    fs.unlinkSync(curPath);
                }catch(err){console.log("ERRO:" + err)}
            }

        Atividade.update(
            {'_id':fields._id},
            {$set:{'titulo':fields.titulo,
                'descricao':fields.descricao,
                'local':fields.local,
                'duracao':fields.duracao,
                'desporto': fields.desporto,
                'privado':fields.privado
                }}
        ).exec(function(err,docs){
            if(!err){
                console.log("Actividade desportiva alterado com sucesso")
            }
            else{
                console.log("Ocurreu um erro tentar editar Ideia")
            }
        })



            res.redirect('/feed')
        }else {
        console.log("Ocurreo um erro ao tentar editar a atividade Desportiva")
        res.redirect('/feed')
    }
    })
})


module.exports = router;
