var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser")
var Trabalho = require("../models/trabalho_academico")
var formidable = require("formidable")
var fs = require('fs')
/* GET home page. */

router.post('/',function(req,res,next) {
    var form= new formidable.IncomingForm();
    var status=""

    form.parse(req,function(err,fields,files) {

        if(fields.privado === "on")
            fields.privado = true;
        else fields.privado = false;

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
