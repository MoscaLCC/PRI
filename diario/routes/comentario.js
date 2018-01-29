var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser")
var Cultural = require("../models/cultural")
var Ideia = require("../models/ideia")
var TrabalhoAcademico = require("../models/trabalho_academico")
var AtividadeDesportiva = require("../models/atividade_desportiva")
var Pensamento = require("../models/pensamento")
var Cronica = require("../models/cronica")
var ReceitaCulinaria = require("../models/receita_culinaria")
var Evento = require("../models/evento")
var TransacaoMonetaria = require("../models/transacao_monetaria")
var AlbumFotografico = require("../models/album_fotografico")
var Viagem = require("../models/viagem")
var formidable = require("formidable")

/* GET home page. */
router.post('/', function(req, res, next) {

    var form= new formidable.IncomingForm();

    form.parse(req,function(err,fields,files){
        if(!err){

            var tipo = fields.tipo
            var id = fields._id
            fields.comentario =req.cookies.online + " : " + fields.comentario

            if(tipo === "Cultural"){
                Cultural.update({'_id': id},
                    {$push:{'comentarios':fields.comentario}}).exec(function(err,docs){
                    if(!err){
                        var status = "Comentario adicionado com sucesso!"
                        res.redirect('/feed')
                    }
                    else{
                        var status = "Ocorreu um erro ao tentar comentar!"
                        res.redirect('/feed')
                    }
                })
            }else if(tipo === "Ideia"){
                Ideia.update({'_id': id},
                    {$push:{'comentarios':fields.comentario}}).exec(function(err,docs){
                    if(!err){
                        var status = "Comentario adicionado com sucesso!"
                        res.redirect('/feed')
                    }
                    else{
                        var status = "Ocorreu um erro ao tentar comentar!"
                        res.redirect('/feed')
                    }
                })
            }else if(tipo === "Trabalho Académico") {
                TrabalhoAcademico.update({'_id': id},
                    {$push:{'comentarios':fields.comentario}}).exec(function(err,docs){
                    if(!err){
                        var status = "Comentario adicionado com sucesso!"
                        res.redirect('/feed')
                    }
                    else{
                        var status = "Ocorreu um erro ao tentar comentar!"
                        res.redirect('/feed')
                    }
                })
            }else if(tipo === "Atividade Desportiva"){
                AtividadeDesportiva.update({'_id': id},
                    {$push:{'comentarios':fields.comentario}}).exec(function(err,docs){
                    if(!err){
                        var status = "Comentario adicionado com sucesso!"
                        res.redirect('/feed')
                    }
                    else{
                        var status = "Ocorreu um erro ao tentar comentar!"
                        res.redirect('/feed')
                    }
                })
            }else if(tipo === "Pensamento"){
                Pensamento.update({'_id': id},
                    {$push:{'comentarios':fields.comentario}}).exec(function(err,docs){
                    if(!err){
                        var status = "Comentario adicionado com sucesso!"
                        res.redirect('/feed')
                    }
                    else{
                        var status = "Ocorreu um erro ao tentar comentar!"
                        res.redirect('/feed')
                    }
                })
            }else if(tipo === "Cronica") {
                Cronica.update({'_id': id},
                    {$push:{'comentarios':fields.comentario}}).exec(function(err,docs){
                    if(!err){
                        var status = "Comentario adicionado com sucesso!"
                        res.redirect('/feed')
                    }
                    else{
                        var status = "Ocorreu um erro ao tentar comentar!"
                        res.redirect('/feed')
                    }
                })
            }else if(tipo === "Receita Culinária") {
                ReceitaCulinaria.update({'_id': id},
                    {$push:{'comentarios':fields.comentario}}).exec(function(err,docs){
                    if(!err){
                        var status = "Comentario adicionado com sucesso!"
                        res.redirect('/feed')
                    }
                    else{
                        var status = "Ocorreu um erro ao tentar comentar!"
                        res.redirect('/feed')
                    }
                })
            }else if(tipo === "Evento") {
                Evento.update({'_id': id},
                    {$push:{'comentarios':fields.comentario}}).exec(function(err,docs){
                    if(!err){
                        var status = "Comentario adicionado com sucesso!"
                        res.redirect('/feed')
                    }
                    else{
                        var status = "Ocorreu um erro ao tentar comentar!"
                        res.redirect('/feed')
                    }
                })
            }else if(tipo === "Transação Monetária") {
                TransacaoMonetaria.update({'_id': id},
                    {$push:{'comentarios':fields.comentario}}).exec(function(err,docs){
                    if(!err){
                        var status = "Comentario adicionado com sucesso!"
                        res.redirect('/feed')
                    }
                    else{
                        var status = "Ocorreu um erro ao tentar comentar!"
                        res.redirect('/feed')
                    }
                })
            }else if(tipo === "Álbum Fotográfico") {
                AlbumFotografico.update({'_id': id},
                    {$push:{'comentarios':fields.comentario}}).exec(function(err,docs){
                    if(!err){
                        var status = "Comentario adicionado com sucesso!"
                        res.redirect('/feed')
                    }
                    else{
                        var status = "Ocorreu um erro ao tentar comentar!"
                        res.redirect('/feed')
                    }
                })
            }else if(tipo === "Viagem") {
                Viagem.update({'_id': id},
                    {$push:{'comentarios':fields.comentario}}).exec(function(err,docs){
                    if(!err){
                        var status = "Comentario adicionado com sucesso!"
                        res.redirect('/feed')
                    }
                    else{
                        var status = "Ocorreu um erro ao tentar comentar!"
                        res.redirect('/feed')
                    }
                })
            }
            else{
                var status = "Ocorreu um erro ao tentar comentar!"
                res.redirect('/feed')
            }
        }
    else{console.log("Erro ao fazer o parser")}
    })
})

module.exports = router;
