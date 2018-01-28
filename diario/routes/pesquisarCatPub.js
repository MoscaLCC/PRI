var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser")
var cookieParser = require("cookie-parser")
var formidable = require("formidable")
var fs = require('fs')
var User = require("../models/user")
var AtividadeDesportiva = require("../models/atividade_desportiva")
var Pensamento = require("../models/pensamento")
var Cultural = require("../models/cultural")
var User = require("../models/user")
var Viagem=require("../models/viagem")
var TiposEventos=require("../models/tiposEventos")
var ReceitaCulinaria = require("../models/receita_culinaria")
var TransacaoMonetaria = require("../models/transacao_monetaria")
var AlbumFotografico = require("../models/album_fotografico")
var Evento= require("../models/evento")
var Ideia= require("../models/ideia")
var Cronica = require("../models/cronica")
var TrabalhoAcademico = require("../models/trabalho_academico")
var sync = require("synchronize")
/* GET home page. */
router.get('/', function(req, res, next) {
    res.redirect('feed')
});

router.post('/',function(req,res,next) {

    var form= new formidable.IncomingForm();
    var OpTipos=[]
    form.parse(req,function(err,fields,files){
        if(!err){
            console.log(JSON.stringify(fields))
            var currentUser = req.cookies.online;
            var categoria = fields.pesquisa;
            var key = fields.key;
            sync.fiber(function(){
                try{
                    docs2 = sync.await(TiposEventos.find().exec(sync.defer()))
                    for(var i=0;i<docs2.length;i++){
                        OpTipos.push(docs2[i].nome)
                    }
                }catch(err){
                    console.log("Occoreu um erro ao obter Tipos eventos da base de dados: \r\n"+err+"\r\n\r\n");
                    res.render('error', { error:err , message:'Ocorreu um erro ao carregar a página de feed, por favor tente novamente'});
                    return
                }

                var userDoc
                var userID
                var status=""
                var usersList = []
                try{
                    docs1 = sync.await(User.find().exec(sync.defer()))
                    if(docs1.length > 0){
                        for(var user in docs1){
                            if(docs1[user].username === currentUser){
                                userDoc = docs1[0]
                            //Calculo da Idade//
                            ageDifMs = Date.now() - userDoc.dataNascimento.getTime();
                            ageDate = new Date(ageDifMs); // miliseconds from epoch
                            userDoc.idade=Math.abs(ageDate.getUTCFullYear() - 1970);
                            userID = userDoc._id
                            }
                            usersList.push(docs1[user])
                        }
                        if(userDoc === undefined){
                            console.log("Utilizador não existe")
                            res.clearCookie("online")
                            res.redirect("/login")
                            return
                        } 
                    }
                }catch(err){
                    console.log("Occoreu um erro ao obter informações do utilizador da base de dados: \r\n"+err+"\r\n\r\n");
                    res.render('error', { error:err , message:'Ocorreu um erro ao carregar a página de feed, por favor tente novamente'});
                    return
                }

                var eventos=[]

                if(categoria === "Cultural"|| key!=""){
                    try{
                        docs2 = sync.await(Cultural.find().exec(sync.defer()))
                        if(docs2.length> 0){
                            for(var i=0;i<docs2.length;i++){
                                var x=JSON.parse(JSON.stringify(docs2[i]));
                                x.tipoEvento="Cultural"
                                for(var doc in usersList){
                                    if(usersList[doc].id == x.userId){
                                        x.user = usersList[doc].username
                                        break
                                    }
                                }
                                if(categoria === "Cultural" && key === ""){
                                    eventos.push(x)
                                }
                                else if(key === ""){
                                    eventos.push(x)
                                }
                                else{
                                    opcoes = x.keys.filter( y => y === key)
                                    if(opcoes.length>0 ) {
                                        eventos.push(x)
                                    }
                                }
                            }
                        }
                        else{
                            status="Não foram encontrados resultados"
                        }
                        if(key === ""){
                            eventos = eventos.sort(function(a,b) {return (a.data > b.data) ? -1 : ((b.data > a.data) ? 1 : 0);} )
                            res.render('feed',{
                                user: {
                                    username: currentUser ,
                                    foto: userDoc.foto,
                                    idade: userDoc.idade,
                                    email:userDoc.email,
                                    pnome:userDoc.pnome,
                                    unome:userDoc.unome
                                },
                                status:status,
                                eventos:eventos,
                                OpTipos:OpTipos
                            })
                            return 
                        }
                    }
                    catch(err){
                        console.log("Occoreu um erro ao obter Pensamentos da base de dados: \r\n"+err+"\r\n\r\n");
                        res.render('error', { error:err , message:'Ocorreu um erro ao carregar a página de feed, por favor tente novamente'});
                        return
                    }
                }

                if(categoria === "Pensamento"|| key!=""){
                    try{
                        docs2 = sync.await(Pensamento.find().exec(sync.defer()))
                        if(docs2.length> 0){
                            for(var i=0;i<docs2.length;i++){
                                var x=JSON.parse(JSON.stringify(docs2[i]));
                                x.tipoEvento="Pensamento"
                                for(var doc in usersList){
                                    if(usersList[doc].id == x.userId){
                                        x.user = usersList[doc].username
                                        break
                                    }
                                }
                                if(categoria === "Pensamento" && key === ""){
                                    eventos.push(x)
                                }
                                else if(key === ""){
                                    eventos.push(x)
                                }
                                else{
                                    opcoes = x.keys.filter( y => y === key)
                                    if(opcoes.length>0 ) {
                                        eventos.push(x)
                                    }
                                }
                            }
                        }
                        if(key === ""){
                            eventos = eventos.sort(function(a,b) {return (a.data > b.data) ? -1 : ((b.data > a.data) ? 1 : 0);} )
                            if(eventos.length === 0){
                                status = "Não foram encontrados resultados"
                            }
                            res.render('feed',{
                                user: {
                                    username: currentUser ,
                                    foto: userDoc.foto,
                                    idade: userDoc.idade,
                                    email:userDoc.email,
                                    pnome:userDoc.pnome,
                                    unome:userDoc.unome
                                },
                                status:status,
                                eventos:eventos,
                                OpTipos:OpTipos
                            })
                            return 
                        }
                    }
                    catch(err){
                        console.log("Occoreu um erro ao obter Pensamentos da base de dados: \r\n"+err+"\r\n\r\n");
                        res.render('error', { error:err , message:'Ocorreu um erro ao carregar a página de feed, por favor tente novamente'});
                        return
                    }
                }

                if(categoria === "Atividade Desportiva"|| key!=""){
                    try{
                        docs2 = sync.await(AtividadeDesportiva.find().exec(sync.defer()))
                        if(docs2.length> 0){
                            for(var i=0;i<docs2.length;i++){
                                var x=JSON.parse(JSON.stringify(docs2[i]));
                                x.tipoEvento="Atividade Desportiva"
                                for(var doc in usersList){
                                    if(usersList[doc].id == x.userId){
                                        x.user = usersList[doc].username
                                        break
                                    }
                                }
                                if(categoria === "Atividade Desportiva" && key === ""){
                                    eventos.push(x)
                                }
                                else if(key === ""){
                                    eventos.push(x)
                                }
                                else{
                                    opcoes = x.keys.filter( y => y === key)
                                    if(opcoes.length>0 ) {
                                        eventos.push(x)
                                    }
                                }
                            }
                        }
                        if(key === ""){
                            eventos = eventos.sort(function(a,b) {return (a.data > b.data) ? -1 : ((b.data > a.data) ? 1 : 0);} )
                            if(eventos.length == 0){
                                status = "Não foram encontrados resultados"
                            }
                            res.render('feed',{
                                user: {
                                    username: currentUser ,
                                    foto: userDoc.foto,
                                    idade: userDoc.idade,
                                    email:userDoc.email,
                                    pnome:userDoc.pnome,
                                    unome:userDoc.unome
                                },
                                status:status,
                                eventos:eventos,
                                OpTipos:OpTipos
                            })
                            return 
                        }
                    }
                    catch(err){
                        console.log("Occoreu um erro ao obter Atividade Desportiva  da base de dados: \r\n"+err+"\r\n\r\n");
                        res.render('error', { error:err , message:'Ocorreu um erro ao carregar a página de feed, por favor tente novamente'});
                        return
                    }
                }

                if(categoria === "Receita Culinária"|| key!=""){
                    try{
                        docs2 = sync.await(ReceitaCulinaria.find().exec(sync.defer()))
                        if(docs2.length> 0){
                            for(var i=0;i<docs2.length;i++){
                                var x=JSON.parse(JSON.stringify(docs2[i]));
                                x.tipoEvento="Receita Culinária"
                                for(var doc in usersList){
                                    if(usersList[doc].id == x.userId){
                                        x.user = usersList[doc].username
                                        break
                                    }
                                }
                                if(categoria === "Receita Culinária" && key === ""){
                                    eventos.push(x)
                                }
                                else if(key === ""){
                                    eventos.push(x)
                                }
                                else{
                                    opcoes = x.keys.filter( y => y === key)
                                    if(opcoes.length>0 ) {
                                        eventos.push(x)
                                    }
                                }
                            }
                        }
                        if(key === ""){
                            eventos = eventos.sort(function(a,b) {return (a.data > b.data) ? -1 : ((b.data > a.data) ? 1 : 0);} )
                            if(eventos.length === 0){
                                status = "Não foram encontrados resultados"
                            }
                            res.render('feed',{
                                user: {
                                    username: currentUser ,
                                    foto: userDoc.foto,
                                    idade: userDoc.idade,
                                    email:userDoc.email,
                                    pnome:userDoc.pnome,
                                    unome:userDoc.unome
                                },
                                status:status,
                                eventos:eventos,
                                OpTipos:OpTipos
                            })
                            return 
                        }
                    }
                    catch(err){
                        console.log("Occoreu um erro ao obter Receita Culinária da base de dados: \r\n"+err+"\r\n\r\n");
                        res.render('error', { error:err , message:'Ocorreu um erro ao carregar a página de feed, por favor tente novamente'});
                        return
                    }
                }

                if(categoria === "Transação Monetária"|| key!=""){
                    try{
                        docs2 = sync.await(TransacaoMonetaria.find().exec(sync.defer()))
                        if(docs2.length> 0){
                            for(var i=0;i<docs2.length;i++){
                                var x=JSON.parse(JSON.stringify(docs2[i]));
                                x.tipoEvento="Transação Monetária"
                                for(var doc in usersList){
                                    if(usersList[doc].id == x.userId){
                                        x.user = usersList[doc].username
                                        break
                                    }
                                }
                                if(categoria === "Transação Monetária" && key === ""){
                                    eventos.push(x)
                                }
                                else if(key === ""){
                                    eventos.push(x)
                                }
                                else{
                                    opcoes = x.keys.filter( y => y === key)
                                    if(opcoes.length>0 ) {
                                        eventos.push(x)
                                    }
                                }
                            }
                        }
                        if(key === ""){
                            eventos = eventos.sort(function(a,b) {return (a.data > b.data) ? -1 : ((b.data > a.data) ? 1 : 0);} )
                            if(eventos.length === 0){
                                status = "Não foram encontrados resultados"
                            }
                            res.render('feed',{
                                user: {
                                    username: currentUser ,
                                    foto: userDoc.foto,
                                    idade: userDoc.idade,
                                    email:userDoc.email,
                                    pnome:userDoc.pnome,
                                    unome:userDoc.unome
                                },
                                status:status,
                                eventos:eventos,
                                OpTipos:OpTipos
                            })
                            return 
                        }
                    }
                    catch(err){
                        console.log("Occoreu um erro ao obter Transação Monetária da base de dados: \r\n"+err+"\r\n\r\n");
                        res.render('error', { error:err , message:'Ocorreu um erro ao carregar a página de feed, por favor tente novamente'});
                        return
                    }
                }

                if(categoria === "Viagem"|| key!=""){
                    try{
                        docs2 = sync.await(Viagem.find().exec(sync.defer()))
                        if(docs2.length> 0){
                            for(var i=0;i<docs2.length;i++){
                                var x=JSON.parse(JSON.stringify(docs2[i]));
                                x.tipoEvento="Viagem"
                                for(var doc in usersList){
                                    if(usersList[doc].id == x.userId){
                                        x.user = usersList[doc].username
                                        break
                                    }
                                }
                                if(categoria === "Viagem" && key === ""){
                                    eventos.push(x)
                                }
                                else if(key === ""){
                                    eventos.push(x)
                                }
                                else{
                                    opcoes = x.keys.filter( y => y === key)
                                    if(opcoes.length>0 ) {
                                        eventos.push(x)
                                    }
                                }
                            }
                        }
                        if(key === ""){
                            eventos = eventos.sort(function(a,b) {return (a.data > b.data) ? -1 : ((b.data > a.data) ? 1 : 0);} )
                            if(eventos.length === 0){
                                status = "Não foram encontrados resultados"
                            }
                            res.render('feed',{
                                user: {
                                    username: currentUser ,
                                    foto: userDoc.foto,
                                    idade: userDoc.idade,
                                    email:userDoc.email,
                                    pnome:userDoc.pnome,
                                    unome:userDoc.unome
                                },
                                status:status,
                                eventos:eventos,
                                OpTipos:OpTipos
                            })
                            return 
                        }
                    }
                    catch(err){
                        console.log("Occoreu um erro ao obter Viagem da base de dados: \r\n"+err+"\r\n\r\n");
                        res.render('error', { error:err , message:'Ocorreu um erro ao carregar a página de feed, por favor tente novamente'});
                        return
                    }
                }

                if(categoria === "Pensamento"|| key!=""){
                    try{
                        docs2 = sync.await(AlbumFotografico.find().exec(sync.defer()))
                        if(docs2.length> 0){
                            for(var i=0;i<docs2.length;i++){
                                var x=JSON.parse(JSON.stringify(docs2[i]));
                                x.tipoEvento="Álbum Fotográfico"
                                for(var doc in usersList){
                                    if(usersList[doc].id == x.userId){
                                        x.user = usersList[doc].username
                                        break
                                    }
                                }
                                if(categoria === "Álbum Fotográfico" && key === ""){
                                    eventos.push(x)
                                }
                                else if(key === ""){
                                    eventos.push(x)
                                }
                                else{
                                    opcoes = x.keys.filter( y => y === key)
                                    if(opcoes.length>0 ) {
                                        eventos.push(x)
                                    }
                                }
                            }
                        }
                        if(key === ""){
                            eventos = eventos.sort(function(a,b) {return (a.data > b.data) ? -1 : ((b.data > a.data) ? 1 : 0);} )
                            if(eventos.length === 0){
                                status = "Não foram encontrados resultados"
                            }
                            res.render('feed',{
                                user: {
                                    username: currentUser ,
                                    foto: userDoc.foto,
                                    idade: userDoc.idade,
                                    email:userDoc.email,
                                    pnome:userDoc.pnome,
                                    unome:userDoc.unome
                                },
                                status:status,
                                eventos:eventos,
                                OpTipos:OpTipos
                            })
                            return 
                        }
                    }
                    catch(err){
                        console.log("Occoreu um erro ao obter Álbum Fotográfico da base de dados: \r\n"+err+"\r\n\r\n");
                        res.render('error', { error:err , message:'Ocorreu um erro ao carregar a página de feed, por favor tente novamente'});
                        return
                    }
                }

                if(categoria === "Evento"|| key!=""){
                    try{
                        docs2 = sync.await(Evento.find().exec(sync.defer()))
                        if(docs2.length> 0){
                            for(var i=0;i<docs2.length;i++){
                                var x=JSON.parse(JSON.stringify(docs2[i]));
                                x.tipoEvento="Evento"
                                for(var doc in usersList){
                                    if(usersList[doc].id == x.userId){
                                        x.user = usersList[doc].username
                                        break
                                    }
                                }
                                if(categoria === "Evento" && key === ""){
                                    eventos.push(x)
                                }
                                else if(key === ""){
                                    eventos.push(x)
                                }
                                else{
                                    opcoes = x.keys.filter( y => y === key)
                                    if(opcoes.length>0 ) {
                                        eventos.push(x)
                                    }
                                }
                            }
                        }
                        if(key === ""){
                            eventos = eventos.sort(function(a,b) {return (a.data > b.data) ? -1 : ((b.data > a.data) ? 1 : 0);} )
                            if(eventos.length === 0){
                                status = "Não foram encontrados resultados"
                            }
                            res.render('feed',{
                                user: {
                                    username: currentUser ,
                                    foto: userDoc.foto,
                                    idade: userDoc.idade,
                                    email:userDoc.email,
                                    pnome:userDoc.pnome,
                                    unome:userDoc.unome
                                },
                                status:status,
                                eventos:eventos,
                                OpTipos:OpTipos
                            })
                            return 
                        }
                    }
                    catch(err){
                        console.log("Occoreu um erro ao obter Evento da base de dados: \r\n"+err+"\r\n\r\n");
                        res.render('error', { error:err , message:'Ocorreu um erro ao carregar a página de feed, por favor tente novamente'});
                        return
                    }
                }

                if(categoria === "Ideia"|| key!=""){
                    try{
                        docs2 = sync.await(Ideia.find().exec(sync.defer()))
                        if(docs2.length> 0){
                            for(var i=0;i<docs2.length;i++){
                                var x=JSON.parse(JSON.stringify(docs2[i]));
                                x.tipoEvento="Ideia"
                                for(var doc in usersList){
                                    if(usersList[doc].id == x.userId){
                                        x.user = usersList[doc].username
                                        break
                                    }
                                }
                                if(categoria === "Ideia" && key === ""){
                                    eventos.push(x)
                                }
                                else if(key === ""){
                                    eventos.push(x)
                                }
                                else{
                                    opcoes = x.keys.filter( y => y === key)
                                    if(opcoes.length>0 ) {
                                        eventos.push(x)
                                    }
                                }
                            }
                        }
                        if(key === ""){
                            eventos = eventos.sort(function(a,b) {return (a.data > b.data) ? -1 : ((b.data > a.data) ? 1 : 0);} )
                            if(eventos.length === 0){
                                status = "Não foram encontrados resultados"
                            }
                            res.render('feed',{
                                user: {
                                    username: currentUser ,
                                    foto: userDoc.foto,
                                    idade: userDoc.idade,
                                    email:userDoc.email,
                                    pnome:userDoc.pnome,
                                    unome:userDoc.unome
                                },
                                status:status,
                                eventos:eventos,
                                OpTipos:OpTipos
                            })
                            return 
                        }
                    }
                    catch(err){
                        console.log("Occoreu um erro ao obter Ideia da base de dados: \r\n"+err+"\r\n\r\n");
                        res.render('error', { error:err , message:'Ocorreu um erro ao carregar a página de feed, por favor tente novamente'});
                        return
                    }
                }

                if(categoria === "Trabalho Académico"|| key!=""){
                    try{
                        docs2 = sync.await(TrabalhoAcademico.find().exec(sync.defer()))
                        if(docs2.length> 0){
                            for(var i=0;i<docs2.length;i++){
                                var x=JSON.parse(JSON.stringify(docs2[i]));
                                x.tipoEvento="Trabalho Académico"
                                for(var doc in usersList){
                                    if(usersList[doc].id == x.userId){
                                        x.user = usersList[doc].username
                                        break
                                    }
                                }
                                if(categoria === "Trabalho Académico" && key === ""){
                                    eventos.push(x)
                                }
                                else if(key === ""){
                                    eventos.push(x)
                                }
                                else{
                                    opcoes = x.keys.filter( y => y === key)
                                    if(opcoes.length>0 ) {
                                        eventos.push(x)
                                    }
                                }
                            }
                        }
                        if(key === ""){
                            eventos = eventos.sort(function(a,b) {return (a.data > b.data) ? -1 : ((b.data > a.data) ? 1 : 0);} )
                            if(eventos.length === 0){
                                status = "Não foram encontrados resultados"
                            }
                            res.render('feed',{
                                user: {
                                    username: currentUser ,
                                    foto: userDoc.foto,
                                    idade: userDoc.idade,
                                    email:userDoc.email,
                                    pnome:userDoc.pnome,
                                    unome:userDoc.unome
                                },
                                status:status,
                                eventos:eventos,
                                OpTipos:OpTipos
                            })
                            return 
                        }
                    }
                    catch(err){
                        console.log("Occoreu um erro ao obter Trabalho Académico da base de dados: \r\n"+err+"\r\n\r\n");
                        res.render('error', { error:err , message:'Ocorreu um erro ao carregar a página de feed, por favor tente novamente'});
                        return
                    }
                }
                if(eventos.length === 0){
                    status = "Não foram encontrados resultados"
                }
                eventos = eventos.sort(function(a,b) {return (a.data > b.data) ? -1 : ((b.data > a.data) ? 1 : 0);} )
                res.render('feed',{
                    user: {
                        username: currentUser ,
                        foto: userDoc.foto,
                        idade: userDoc.idade,
                        email:userDoc.email,
                        pnome:userDoc.pnome,
                        unome:userDoc.unome
                    },
                    status:status,
                    eventos:eventos,
                    OpTipos:OpTipos
                })
            })
        }
        else{
            //console.log("Erro ao fazer parse do formulário da Pesquisa \r\n" + err +"\r\n\r\n");
            res.redirect('/feed')
        }
    })
})
module.exports = router;


