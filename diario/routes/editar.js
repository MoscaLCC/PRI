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
var fs = require('fs')

/* GET home page. */
router.get('/:tipo/:id', function(req, res, next) {
    var tipo = req.params.tipo
    console.log("tipo: "+tipo + "; id: " + req.params.id)
    if(tipo === "Cultural"){
        var valores = Cultural.find({'_id':req.params.id}).exec(function(err,docs){
            if(!err){
                var status = "Evento removido com sucesso!"
                res.redirect('/editarAtividade', {tipo:tipo, valores:valores})
            }
            else{
                var status = "Ocorreu um erro ao remover o evento!"
                res.redirect('/feed')
            }
        })
    }else if(tipo === "Ideia"){
        Ideia.find({'_id':req.params.id}).remove().exec(function(err,docs){
            if(!err){
                var status = "Evento removido com sucesso!"
                res.redirect('/feed')
            }
            else{
                var status = "Ocorreu um erro ao remover o evento!"
                res.redirect('/feed')
            }
        })
    }else if(tipo === "Trabalho Académico") {
        TrabalhoAcademico.find({'_id':req.params.id}).remove().exec(function(err,docs){
            if(!err){
                var status = "Evento removido com sucesso!"
                res.redirect('/feed')
            }
            else{
                var status = "Ocorreu um erro ao remover o evento!"
                res.redirect('/feed')
            }
        })
    }else if(tipo === "Atividade Desportiva"){
        AtividadeDesportiva.find({'_id':req.params.id}).toArray(function(err,docs){
            if(!err){
                console.log(docs)
                res.render('editarAtividade', {tipo:tipo, valores:docs})
            }
            else{
                var status = "Ocorreu um erro ao remover o evento!"
                res.redirect('/feed')
            }
        })
    }else if(tipo === "Pensamento"){
        Pensamento.find({'_id':req.params.id}).remove().exec(function(err,docs){
            if(!err){
                var status = "Evento removido com sucesso!"
                res.redirect('/feed')
            }
            else{
                var status = "Ocorreu um erro ao remover o evento!"
                res.redirect('/feed')
            }
        })
    }else if(tipo === "Cronica") {
        Cronica.find({'_id':req.params.id}).remove().exec(function(err,docs){
            if(!err){
                var status = "Evento removido com sucesso!"
                res.redirect('/feed')
            }
            else{
                var status = "Ocorreu um erro ao remover o evento!"
                res.redirect('/feed')
            }
        })
    }else if(tipo === "Receita Culinária") {
        ReceitaCulinaria.find({'_id':req.params.id}).remove().exec(function(err,docs){
            if(!err){
                var status = "Evento removido com sucesso!"
                res.redirect('/feed')
            }
            else{
                var status = "Ocorreu um erro ao remover o evento!"
                res.redirect('/feed')
            }
        })
    }else if(tipo === "Evento") {
        Evento.find({'_id':req.params.id}).remove().exec(function(err,docs){
            if(!err){
                var status = "Evento removido com sucesso!"
                res.redirect('/feed')
            }
            else{
                var status = "Ocorreu um erro ao remover o evento!"
                res.redirect('/feed')
            }
        })
    }else if(tipo === "Transação Monetária") {
        TransacaoMonetaria.find({'_id':req.params.id}).remove().exec(function(err,docs){
            if(!err){
                var status = "Evento removido com sucesso!"
                res.redirect('/feed')
            }
            else{
                var status = "Ocorreu um erro ao remover o evento!"
                res.redirect('/feed')
            }
        })
    }else if(tipo === "Álbum Fotográfico") {
        AlbumFotografico.find({'_id':req.params.id}).remove().exec(function(err,docs){
            if(!err){
                var status = "Evento removido com sucesso!"
                res.redirect('/feed')
            }
            else{
                var status = "Ocorreu um erro ao remover o evento!"
                res.redirect('/feed')
            }
        })
    }else if(tipo === "Viagem") {
        Viagem.find({'_id':req.params.id}).remove().exec(function(err,docs){
            if(!err){
                var status = "Evento removido com sucesso!"
                res.redirect('/feed')
            }
            else{
                var status = "Ocorreu um erro ao remover o evento!"
                res.redirect('/feed')
            }
        })
    }
    else{
        var status = "Ocorreu um erro ao remover o evento!"
        res.redirect('/feed')
    }
});

module.exports = router;
