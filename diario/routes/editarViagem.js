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

    form.parse(req,function(err,fields,files) {
        if(!err) {
            if (fields.privado === "on")
                fields.privado = true;
            else fields.privado = false;

            var lista = Object.keys(fields)
            var opcoes = lista.filter( x => x.startsWith("opcao"))



            Viagem.update(
                {'_id': fields._id},
                {
                    $set: {
                        'titulo': fields.titulo,
                        'descricao': fields.descricao,
                        'datainicio': fields.datainicio,
                        'datafim': fields.datafim,
                        'local': fields.local,
                        'privado': fields.privado,
                        'acompanhantes': opcoes.map(x => fields[x])
        }
        }
        ).exec(function (err, docs) {
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