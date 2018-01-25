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
            TiposEventos.find().sort({data:-1}).exec((err2 , docs2)=>{
                if(!err2 ){
                for(var i=0;i<docs2.length;i++){
                    OpTipos.push(docs2[i].nome)
                }
    
                }
                else{
                console.log("Occoreu um erro ao obter Tipos eventos da base de dados: \r\n"+err2+"\r\n\r\n");
                res.render('error', { error:err2 , message:'Ocorreu um erro ao carregar a página de feed, por favor tente novamente'});
                
                }
            })
            var userDoc
            User.find({'username':currentUser}).exec((err2,docsUsers)=>{
                if(docsUsers.length>0){
                    userDoc = docsUsers[0]
                    userID = userDoc._id
                  }
            })

            User.find().exec((err1,docs1)=>{
            if(!err1){
                if(docs1.length>0){
                    var usersList = []
                    for(var doc in docs1){
                        usersList.push({id: docs1[doc]._id ,
                                        username: docs1[doc].username})
                        console.log("DOC--->"+docs1[doc])
                    }

                    if(categoria == "Cultural"){
                        var tipos=[];
                        var eventos=[];
                        var status="";
                        tipos.push("Cultural");
                        Cultural.find().sort({data:-1}).exec((err2 , docs2)=>{
                            if(!err2 ){
                                if(docs2.length==0){status="Não foram encontrados resultados"}
                                for(var i=0;i<docs2.length;i++){
                                    var x=JSON.parse(JSON.stringify(docs2[i]));
                                    x.tipoEvento="Cultural"
                                    for(var doc in usersList){
                                        if(usersList[doc].id == x.userId){
                                            x.user = usersList[doc].username
                                            console.log(x.user)
                                            break
                                        }
                                    }
                                    eventos.push(x)
                                }
            
                            }
                            else{
                            console.log("Occoreu um erro ao obter Pensamentos da base de dados: \r\n"+err2+"\r\n\r\n");
                            res.render('error', { error:err2 , message:'Ocorreu um erro ao carregar a página de feed, por favor tente novamente'});
                            
                            }
                            console.log(eventos)
                            eventos = eventos.sort(function(a,b) {return (a.data > b.data) ? -1 : ((b.data > a.data) ? 1 : 0);} )
                            res.render('feedPublico',{
                                user: {
                                    username: currentUser ,
                                    foto: userDoc.foto,
                                    idade: userDoc.idade,
                                    email:userDoc.email,
                                    pnome:userDoc.pnome,
                                    unome:userDoc.unome
                                },
                                status:status,
                                tipos:tipos,
                                eventos:eventos,
                                OpTipos:OpTipos
                            })    
                        })
                    }
                    if(categoria == "Pensamento"){
                        console.log("entrou 2")
                        var tipos=[];
                        var eventos=[];
                        var status="";
                        tipos.push("Pensamento");
                        Pensamento.find().sort({data:-1}).exec((err2 , docs2)=>{
                            if(!err2 ){
                                if(docs2.length==0){status="Não foram encontrados resultados"}
                                for(var i=0;i<docs2.length;i++){
                                    var x=JSON.parse(JSON.stringify(docs2[i]));
                                    x.tipoEvento="Pensamento"
                                    for(var doc in usersList){
                                        if(usersList[doc].id == x.userId){
                                            x.user = usersList[doc].username
                                            console.log(x.user)
                                            break
                                        }
                                    }
                                    eventos.push(x)
                                }
            
                            }
                            else{
                            console.log("Occoreu um erro ao obter Pensamentos da base de dados: \r\n"+err2+"\r\n\r\n");
                            res.render('error', { error:err2 , message:'Ocorreu um erro ao carregar a página de feed, por favor tente novamente'});
                            
                            }
                            eventos = eventos.sort(function(a,b) {return (a.data > b.data) ? -1 : ((b.data > a.data) ? 1 : 0);} )
                            res.render('feedPublico',{
                                user: {
                                    username: currentUser ,
                                    foto: userDoc.foto,
                                    idade: userDoc.idade,
                                    email:userDoc.email,
                                    pnome:userDoc.pnome,
                                    unome:userDoc.unome
                                },
                                status:status,
                                tipos:tipos,
                                eventos:eventos,
                                OpTipos:OpTipos
                            })   
                        })
                    }
                    
                    if(categoria == "Atividade Desportiva"){
                        console.log("entrou 3")
                        var tipos=[];
                        var eventos=[];
                        var status="";
                        tipos.push("Atividade Desportiva");
                        AtividadeDesportiva.find().sort({data:-1}).exec((err2 , docs2)=>{
                            if(!err2 ){
                                if(docs2.length==0){status="Não foram encontrados resultados"}
                                for(var i=0;i<docs2.length;i++){
                                    var x=JSON.parse(JSON.stringify(docs2[i]));
                                    x.tipoEvento="Atividade Desportiva"
                                    for(var doc in usersList){
                                        if(usersList[doc].id == x.userId){
                                            x.user = usersList[doc].username
                                            console.log(x.user)
                                            break
                                        }
                                    }
                                    eventos.push(x)
                                }
            
                            }
                            else{
                            console.log("Occoreu um erro ao obter Pensamentos da base de dados: \r\n"+err2+"\r\n\r\n");
                            res.render('error', { error:err2 , message:'Ocorreu um erro ao carregar a página de feed, por favor tente novamente'});
                            
                            }
                            eventos = eventos.sort(function(a,b) {return (a.data > b.data) ? -1 : ((b.data > a.data) ? 1 : 0);} )
                            res.render('feedPublico',{
                                user: {
                                    username: currentUser ,
                                    foto: userDoc.foto,
                                    idade: userDoc.idade,
                                    email:userDoc.email,
                                    pnome:userDoc.pnome,
                                    unome:userDoc.unome
                                },
                                status:status,
                                tipos:tipos,
                                eventos:eventos,
                                OpTipos:OpTipos
                            })   
                        })
                    }
                    if(categoria == "Receita Culinaria"){
                        console.log("entrou 4")
                        var tipos=[];
                        var eventos=[];
                        var status="";
                        tipos.push("Receita Culinária");
                        ReceitaCulinaria.find().sort({data:-1}).exec((err2 , docs2)=>{
                            if(!err2 ){
                                if(docs2.length==0){status="Não foram encontrados resultados"}
                                for(var i=0;i<docs2.length;i++){
                                    var x=JSON.parse(JSON.stringify(docs2[i]));
                                    x.tipoEvento="Receita Culinaria"
                                    for(var doc in usersList){
                                        if(usersList[doc].id == x.userId){
                                            x.user = usersList[doc].username
                                            console.log(x.user)
                                            break
                                        }
                                    }
                                    eventos.push(x)
                                }
            
                            }
                            else{
                            console.log("Occoreu um erro ao obter Receita Culinaria da base de dados: \r\n"+err2+"\r\n\r\n");
                            res.render('error', { error:err2 , message:'Ocorreu um erro ao carregar a página de feed, por favor tente novamente'});
                            
                            }
                            eventos = eventos.sort(function(a,b) {return (a.data > b.data) ? -1 : ((b.data > a.data) ? 1 : 0);} )
                            res.render('feedPublico',{
                                user: {
                                    username: currentUser ,
                                    foto: userDoc.foto,
                                    idade: userDoc.idade,
                                    email:userDoc.email,
                                    pnome:userDoc.pnome,
                                    unome:userDoc.unome
                                },
                                status:status,
                                tipos:tipos,
                                eventos:eventos,
                                OpTipos:OpTipos
                            })     
                        })
                    }
                    if(categoria == "Transação Monetária"){
                        console.log("Entrou 5")
                        var tipos=[];
                        var eventos=[];
                        var status="";
                        tipos.push("Transação Monetária");
                        TransacaoMonetaria.find().sort({data:-1}).exec((err2 , docs2)=>{
                            if(!err2 ){
                                if(docs2.length==0){status="Não foram encontrados resultados"}
                                for(var i=0;i<docs2.length;i++){
                                    var x=JSON.parse(JSON.stringify(docs2[i]));
                                    x.tipoEvento="Transação Monetária"
                                    for(var doc in usersList){
                                        if(usersList[doc].id == x.userId){
                                            x.user = usersList[doc].username
                                            console.log(x.user)
                                            break
                                        }
                                    }
                                    eventos.push(x)
                                }
            
                            }
                            else{
                            console.log("Occoreu um erro ao obter Pensamentos da base de dados: \r\n"+err2+"\r\n\r\n");
                            res.render('error', { error:err2 , message:'Ocorreu um erro ao carregar a página de feed, por favor tente novamente'});
                            
                            }
                           
                            eventos = eventos.sort(function(a,b) {return (a.data > b.data) ? -1 : ((b.data > a.data) ? 1 : 0);} )
                            res.render('feedPublico',{
                                user: {
                                    username: currentUser ,
                                    foto: userDoc.foto,
                                    idade: userDoc.idade,
                                    email:userDoc.email,
                                    pnome:userDoc.pnome,
                                    unome:userDoc.unome
                                },   
                                status:status,                             
                                tipos:tipos,
                                eventos:eventos,
                                OpTipos:OpTipos
                            })
                        
                           
                        })
                    }
                    if(categoria == "Viagem"){

                        Viagem.find().sort({data:-1}).exec((err2 , docs2)=>{
                            var tipos=[];
                            var eventos=[];
                            var status="";
                            if(!err2 ){
                                if(docs2.length==0){status="Não foram encontrados resultados"}
                                for(var i=0;i<docs2.length;i++){
                                    var x=JSON.parse(JSON.stringify(docs2[i]));
                                    x.tipoEvento="Viagem"
                                    for(var doc in usersList){
                                        if(usersList[doc].id == x.userId){
                                            x.user = usersList[doc].username
                                            console.log(x.user)
                                            break
                                        }
                                    }
                                    eventos.push(x)
                                }
            
                            }
                            else{
                            console.log("Occoreu um erro ao obter Viagem da base de dados: \r\n"+err2+"\r\n\r\n");
                            res.render('error', { error:err2 , message:'Ocorreu um erro ao carregar a página de feed, por favor tente novamente'});
                            
                            }
                            eventos = eventos.sort(function(a,b) {return (a.data > b.data) ? -1 : ((b.data > a.data) ? 1 : 0);} )
                            res.render('feedPublico',{
                                user: {
                                    username: currentUser ,
                                    foto: userDoc.foto,
                                    idade: userDoc.idade,
                                    email:userDoc.email,
                                    pnome:userDoc.pnome,
                                    unome:userDoc.unome
                                },
                                status:status,
                                tipos:tipos,
                                eventos:eventos,
                                OpTipos:OpTipos
                            })   
                        })
                    }

                    if(categoria == "Álbum Fotográfico"){
   
                        var tipos=[];
                        var eventos=[];
                        var status="";
                        tipos.push("Álbum Fotográfico");
                        AlbumFotografico.find().sort({data:-1}).exec((err2 , docs2)=>{
                            if(!err2 ){
                                if(docs2.length==0){status="Não foram encontrados resultados"}
                                for(var i=0;i<docs2.length;i++){
                                    var x=JSON.parse(JSON.stringify(docs2[i]));
                                    x.tipoEvento="Álbum Fotográfico"
                                    for(var doc in usersList){
                                        if(usersList[doc].id == x.userId){
                                            x.user = usersList[doc].username
                                            console.log(x.user)
                                            break
                                        }
                                    }
                                    eventos.push(x)
                                }
            
                            }
                            else{
                            console.log("Occoreu um erro ao obter Album Fotográfico da base de dados: \r\n"+err2+"\r\n\r\n");
                            res.render('error', { error:err2 , message:'Ocorreu um erro ao carregar a página de feed, por favor tente novamente'});
                            
                            }
                            eventos = eventos.sort(function(a,b) {return (a.data > b.data) ? -1 : ((b.data > a.data) ? 1 : 0);} )
                            res.render('feedPublico',{
                                user: {
                                    username: currentUser ,
                                    foto: userDoc.foto,
                                    idade: userDoc.idade,
                                    email:userDoc.email,
                                    pnome:userDoc.pnome,
                                    unome:userDoc.unome
                                },
                                status:status,
                                tipos:tipos,
                                eventos:eventos,
                                OpTipos:OpTipos
                            })   
                        })
                    }

                    if(categoria == "Evento"){

                        var tipos=[];
                        var eventos=[];
                        var status="";
                        tipos.push("Evento");
                        Evento.find().sort({data:-1}).exec((err2 , docs2)=>{
                            if(!err2 ){
                                if(docs2.length==0){status="Não foram encontrados resultados"}
                                for(var i=0;i<docs2.length;i++){
                                    var x=JSON.parse(JSON.stringify(docs2[i]));
                                    x.tipoEvento="Evento"
                                    for(var doc in usersList){
                                        if(usersList[doc].id == x.userId){
                                            x.user = usersList[doc].username
                                            console.log(x.user)
                                            break
                                        }
                                    }
                                    eventos.push(x)
                                }
            
                            }
                            else{
                            console.log("Occoreu um erro ao obter Evento da base de dados: \r\n"+err2+"\r\n\r\n");
                            res.render('error', { error:err2 , message:'Ocorreu um erro ao carregar a página de feed, por favor tente novamente'});
                            
                            }
                            eventos = eventos.sort(function(a,b) {return (a.data > b.data) ? -1 : ((b.data > a.data) ? 1 : 0);} )
                            res.render('feedPublico',{
                                user: {
                                    username: currentUser ,
                                    foto: userDoc.foto,
                                    idade: userDoc.idade,
                                    email:userDoc.email,
                                    pnome:userDoc.pnome,
                                    unome:userDoc.unome
                                },
                                status:status,
                                tipos:tipos,
                                eventos:eventos,
                                OpTipos:OpTipos
                            })   
                        })
                    }

                    if(categoria == "Ideia"){
                        
                        var tipos=[];
                        var eventos=[];
                        var status="";
                        tipos.push("Ideia");
                        Ideia.find().sort({data:-1}).exec((err2 , docs2)=>{
                            if(!err2 ){
                                if(docs2.length==0){status="Não foram encontrados resultados"}
                                for(var i=0;i<docs2.length;i++){
                                    var x=JSON.parse(JSON.stringify(docs2[i]));
                                    x.tipoEvento="Ideia"
                                    for(var doc in usersList){
                                        if(usersList[doc].id == x.userId){
                                            x.user = usersList[doc].username
                                            console.log(x.user)
                                            break
                                        }
                                    }
                                    eventos.push(x)
                                }
            
                            }
                            else{
                            console.log("Occoreu um erro ao obter Ideia da base de dados: \r\n"+err2+"\r\n\r\n");
                            res.render('error', { error:err2 , message:'Ocorreu um erro ao carregar a página de feed, por favor tente novamente'});
                            
                            }
                            eventos = eventos.sort(function(a,b) {return (a.data > b.data) ? -1 : ((b.data > a.data) ? 1 : 0);} )
                            res.render('feedPublico',{
                                user: {
                                    username: currentUser ,
                                    foto: userDoc.foto,
                                    idade: userDoc.idade,
                                    email:userDoc.email,
                                    pnome:userDoc.pnome,
                                    unome:userDoc.unome
                                },
                                status:status,
                                tipos:tipos,
                                eventos:eventos,
                                OpTipos:OpTipos
                            })   
                        })
                    }


                    if(categoria == "Cronica"){
                        
                        var tipos=[];
                        var eventos=[];
                        var status="";
                        tipos.push("Cronica");
                        Cronica.find().sort({data:-1}).exec((err2 , docs2)=>{
                            if(!err2 ){
                                if(docs2.length==0){status="Não foram encontrados resultados"}
                                for(var i=0;i<docs2.length;i++){
                                    var x=JSON.parse(JSON.stringify(docs2[i]));
                                    x.tipoEvento="Cronica"
                                    for(var doc in usersList){
                                        if(usersList[doc].id == x.userId){
                                            x.user = usersList[doc].username
                                            console.log(x.user)
                                            break
                                        }
                                    }
                                    eventos.push(x)
                                }
            
                            }
                            else{
                            console.log("Occoreu um erro ao obter Cronica da base de dados: \r\n"+err2+"\r\n\r\n");
                            res.render('error', { error:err2 , message:'Ocorreu um erro ao carregar a página de feed, por favor tente novamente'});
                            
                            }
                            eventos = eventos.sort(function(a,b) {return (a.data > b.data) ? -1 : ((b.data > a.data) ? 1 : 0);} )
                            res.render('feedPublico',{
                                user: {
                                    username: currentUser ,
                                    foto: userDoc.foto,
                                    idade: userDoc.idade,
                                    email:userDoc.email,
                                    pnome:userDoc.pnome,
                                    unome:userDoc.unome
                                },
                                status:status,
                                tipos:tipos,
                                eventos:eventos,
                                OpTipos:OpTipos
                            })   
                        })
                    }
                    if(categoria == "Trabalho Academico"){
                        
                        var tipos=[];
                        var eventos=[];
                        var status="";
                        tipos.push("Trabalho Academico");
                        TrabalhoAcademico.find().sort({data:-1}).exec((err2 , docs2)=>{
                            if(!err2 ){
                                if(docs2.length==0){status="Não foram encontrados resultados"}
                                for(var i=0;i<docs2.length;i++){
                                    var x=JSON.parse(JSON.stringify(docs2[i]));
                                    x.tipoEvento="Trabalho Academico"
                                    for(var doc in usersList){
                                        if(usersList[doc].id == x.userId){
                                            x.user = usersList[doc].username
                                            console.log(x.user)
                                            break
                                        }
                                    }
                                    eventos.push(x)
                                }
            
                            }
                            else{
                            console.log("Occoreu um erro ao obter Trabalho Academico da base de dados: \r\n"+err2+"\r\n\r\n");
                            res.render('error', { error:err2 , message:'Ocorreu um erro ao carregar a página de feed, por favor tente novamente'});
                            
                            }
                            eventos = eventos.sort(function(a,b) {return (a.data > b.data) ? -1 : ((b.data > a.data) ? 1 : 0);} )
                            res.render('feedPublico',{
                                user: {
                                    username: currentUser ,
                                    foto: userDoc.foto,
                                    idade: userDoc.idade,
                                    email:userDoc.email,
                                    pnome:userDoc.pnome,
                                    unome:userDoc.unome
                                },
                                status:status,
                                tipos:tipos,
                                eventos:eventos,
                                OpTipos:OpTipos
                            })   
                        })
                    }                        
                    
                }
     
                }
                else{
                    console.log("Utilizador não existe")
                }
            })
        }
        else{
            //console.log("Erro ao fazer parse do formulário da Pesquisa \r\n" + err +"\r\n\r\n");
            res.redirect('/feed')
        }
    })
})
module.exports = router;


