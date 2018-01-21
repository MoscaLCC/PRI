var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser")
var transacao = require("../models/transacao_monetaria")
var formidable = require("formidable")
var fs = require('fs')
/* GET home page. */

router.post('/',function(req,res,next) {
    var form= new formidable.IncomingForm();
    var status=""

    form.parse(req,function(err,fields,files) {
        if(!err){
            if(fields.privado === "on")
                fields.privado = true;
            else fields.privado = false;

            transacao.update(
                {'_id':fields._id},
                {$set:{'titulo':fields.titulo,
                    'descricao':fields.descricao,
                    'montante':fields.montante,
                    'tipo':fields.tipo,
                    'interveniente': fields.interveniente,
                    'privado':fields.privado}}
            ).exec(function(err,docs){
                if(!err){
                    console.log("Actividade monetaria alterado com sucesso")
                }
                else{
                    console.log("Ocurreu um erro tentar editar Ideia")
                }
            })



            res.redirect('/feed')
        }else {
            console.log("Ocurreo um erro ao tentar editar a transacao monetaria")
            res.redirect('/feed')
        }
    })
})


module.exports = router;
