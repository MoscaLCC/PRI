var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser")
var Pensamento = require("../models/pensamento")
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

            Pensamento.update(
                {'_id': fields._id},
                {
                    $set: {
                        'titulo': fields.titulo,
                        'descricao': fields.descricao,
                        'local': fields.local,
                        'privado': fields.privado
                    }
                }
            ).exec(function (err, docs) {
                if (err) {
                    console.log("Pensamento alterado com sucesso")
                }
            })
            res.redirect('/feed')

        }else {
            console.log("Ocurreo um erro ao tentar editar o Pensamento")
            res.redirect('/feed')
        }
    })
})

module.exports = router;
