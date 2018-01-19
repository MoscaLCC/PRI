var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser")
var cookieParser = require("cookie-parser")
var formidable = require("formidable")
var fs = require('fs')
var Ide = require("../models/ideia")
var User = require("../models/user")
var AtividadeDesportiva = require("../models/atividade_desportiva")
var Pensamento = require("../models/pensamento")
var Cultural = require("../models/cultural")
var User = require("../models/user")
var TiposEventos=require("../models/tiposEventos")
var ReceitaCulinaria = require("../models/receita_culinaria")
var TransacaoMonetaria = require("../models/transacao_monetaria")

/* GET home page. */
router.get('/', function(req, res, next) {
    res.redirect('feed')
});

router.post('/',function(req,res,next) {

    var form= new formidable.IncomingForm();
    form.parse(req,function(err,fields,files){
        if(!err){
            console.log(JSON.stringify(fields))
            var currentUser = req.cookies.online;
            var categoria = fields.pesquisa;
            User.find({'username': currentUser}).exec((err1,docs1)=>{
            if(!err1){
                if(docs1.length>0){
                var userDoc = docs1[0]
                var userID = userDoc._id
                    if(categoria == "Cultural"){
                        console.log("entrou 1")
                        var tipos=[];
                        var eventos=[];
                        tipos.push("Cultural");
                        Cultural.find({'userId':userID }).sort({data:-1}).exec((err2 , docs2)=>{
                            if(!err2 ){
                            for(var i=0;i<docs2.length;i++){
                                var x=JSON.parse(JSON.stringify(docs2[i]));
                                console.log("conteudo do "+ x);
                                x.tipoEvento="Cultural"
                                eventos.push(x)
                            }
            
                            }
                            else{
                            console.log("Occoreu um erro ao obter Pensamentos da base de dados: \r\n"+err2+"\r\n\r\n");
                            res.render('error', { error:err2 , message:'Ocorreu um erro ao carregar a página de feed, por favor tente novamente'});
                            
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
                                tipos:tipos,
                                eventos:eventos
                            })    
                        })
                    }
                    if(categoria == "Pensamento"){
                        console.log("entrou 2")
                        var tipos=[];
                        var eventos=[];
                        tipos.push("Pensamento");
                        Pensamento.find({'userId':userID }).sort({data:-1}).exec((err2 , docs2)=>{
                            if(!err2 ){
                            for(var i=0;i<docs2.length;i++){
                                var x=JSON.parse(JSON.stringify(docs2[i]));
                                console.log("conteudo do "+ x);
                                x.tipoEvento="Pensamento"
                                eventos.push(x)
                            }
            
                            }
                            else{
                            console.log("Occoreu um erro ao obter Pensamentos da base de dados: \r\n"+err2+"\r\n\r\n");
                            res.render('error', { error:err2 , message:'Ocorreu um erro ao carregar a página de feed, por favor tente novamente'});
                            
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
                                tipos:tipos,
                                eventos:eventos
                            })   
                        })
                    }
                    
                    if(categoria == "Atividade Desportiva"){
                        console.log("entrou 3")
                        var tipos=[];
                        var eventos=[];
                        tipos.push("Atividade Desportiva");
                        AtividadeDesportiva.find({'userId':userID }).sort({data:-1}).exec((err2 , docs2)=>{
                            if(!err2 ){
                            for(var i=0;i<docs2.length;i++){
                                var x=JSON.parse(JSON.stringify(docs2[i]));
                                console.log("conteudo do "+ x);
                                x.tipoEvento="Atividade Desportiva"
                                eventos.push(x)
                            }
            
                            }
                            else{
                            console.log("Occoreu um erro ao obter Pensamentos da base de dados: \r\n"+err2+"\r\n\r\n");
                            res.render('error', { error:err2 , message:'Ocorreu um erro ao carregar a página de feed, por favor tente novamente'});
                            
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
                                tipos:tipos,
                                eventos:eventos
                            })   
                        })
                    }
                    if(categoria == "Receita Culinária"){
                        console.log("entrou 4")
                        var tipos=[];
                        var eventos=[];
                        tipos.push("Receita Culinária");
                        ReceitaCulinaria.find({'userId':userID }).sort({data:-1}).exec((err2 , docs2)=>{
                            if(!err2 ){
                            for(var i=0;i<docs2.length;i++){
                                var x=JSON.parse(JSON.stringify(docs2[i]));
                                console.log("conteudo do "+ x);
                                x.tipoEvento="Receita Culinária"
                                eventos.push(x)
                            }
            
                            }
                            else{
                            console.log("Occoreu um erro ao obter Pensamentos da base de dados: \r\n"+err2+"\r\n\r\n");
                            res.render('error', { error:err2 , message:'Ocorreu um erro ao carregar a página de feed, por favor tente novamente'});
                            
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
                                tipos:tipos,
                                eventos:eventos
                            })     
                        })
                    }
                    if(categoria == "Transação Monetária"){
                        console.log("Entrou 5")
                        var tipos=[];
                        var eventos=[];
                        tipos.push("Transação Monetária");
                        TransacaoMonetaria.find({'userId':userID }).sort({data:-1}).exec((err2 , docs2)=>{
                            if(!err2 ){
                            for(var i=0;i<docs2.length;i++){
                                var x=JSON.parse(JSON.stringify(docs2[i]));
                                console.log("conteudo do "+ x);
                                x.tipoEvento="Transação Monetária"
                                eventos.push(x)
                            }
            
                            }
                            else{
                            console.log("Occoreu um erro ao obter Pensamentos da base de dados: \r\n"+err2+"\r\n\r\n");
                            res.render('error', { error:err2 , message:'Ocorreu um erro ao carregar a página de feed, por favor tente novamente'});
                            
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
                                tipos:tipos,
                                eventos:eventos
                            })   
                        })
                    }
                    //else{
                    //    console.log("entrou vazio ")
                    //    res.redirect('/feed')    
                    //}
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


