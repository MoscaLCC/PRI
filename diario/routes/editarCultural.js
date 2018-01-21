var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser")
var Cultural = require("../models/cultural")
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
