var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser")
var cookieParser = require("cookie-parser")
var formidable = require("formidable")
var mongoose = require("mongoose")

var TiposEventos=require("../models/tiposEventos")

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
var Cultural = require("../models/cultural")
var sync = require("synchronize")

var User = require("../models/user")
/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.cookies.online === undefined){
    res.redirect('/login')
  }
    else{
      var currentUser = req.cookies.online;
      TiposEventos.find().exec(function(err,docs){
      if(!err){
        var tipos=[]
        //eventos =  lista com todos os eventos do currentUser
        var eventos=[]
        for(var i=0;i<docs.length;i++)
          tipos.push(docs[i].nome);
        
        User.find({'username': currentUser}).exec((err1,docs1)=>{
          if(!err1){
            if(docs1.length>0){
              var userDoc = docs1[0]
              var userID = userDoc._id
              Ideia.find({'userId':userID }).exec((err2 , docs2)=>{
                if(!err2){
                  for(var i=0;i<docs2.length;i++){
                    var x=JSON.parse(JSON.stringify(docs2[i]));
                    x.tipoEvento="Ideia"
                    eventos.push(x)
                  }
                }
                else{
                  console.log("Occoreu um erro ao obter eventos da base de dados: \r\n"+err2+"\r\n\r\n");
                  res.render('error', { error:err2 , message:'Ocorreu um erro ao carregar a página de feed, por favor tente novamente'});
                }
              })

              TrabalhoAcademico.find({'userId':userID }).exec((err2 , docs2)=>{
                if(!err2){
                  for(var i=0;i<docs2.length;i++){
                    var x=JSON.parse(JSON.stringify(docs2[i]));
                    x.tipoEvento="Trabalho Académico"
                    eventos.push(x)
                  }
                }
                else{
                  console.log("Occoreu um erro ao obter eventos da base de dados: \r\n"+err2+"\r\n\r\n");
                  res.render('error', { error:err2 , message:'Ocorreu um erro ao carregar a página de feed, por favor tente novamente'});
                }
              })

              AtividadeDesportiva.find({'userId':userID }).exec((err2 , docs2)=>{
                if(!err2){
                  for(var i=0;i<docs2.length;i++){
                    var x=JSON.parse(JSON.stringify(docs2[i]));
                    x.tipoEvento="Atividade Desportiva"
                    eventos.push(x)
                  }
                }
                else{
                  console.log("Occoreu um erro ao obter eventos da base de dados: \r\n"+err2+"\r\n\r\n");
                  res.render('error', { error:err2 , message:'Ocorreu um erro ao carregar a página de feed, por favor tente novamente'});
                }
              })

              Pensamento.find({'userId':userID }).exec((err2 , docs2)=>{
                if(!err2){
                  for(var i=0;i<docs2.length;i++){
                    var x=JSON.parse(JSON.stringify(docs2[i]));
                    x.tipoEvento="Pensamento"
                    eventos.push(x)
                  }
                }
                else{
                  console.log("Occoreu um erro ao obter eventos da base de dados: \r\n"+err2+"\r\n\r\n");
                  res.render('error', { error:err2 , message:'Ocorreu um erro ao carregar a página de feed, por favor tente novamente'});
                }
              })

              Cronica.find({'userId':userID }).exec((err2 , docs2)=>{
                if(!err2){
                  for(var i=0;i<docs2.length;i++){
                    var x=JSON.parse(JSON.stringify(docs2[i]));
                    x.tipoEvento="Cronica"
                    eventos.push(x)
                  }
                }
                else{
                  console.log("Occoreu um erro ao obter eventos da base de dados: \r\n"+err2+"\r\n\r\n");
                  res.render('error', { error:err2 , message:'Ocorreu um erro ao carregar a página de feed, por favor tente novamente'});
                }
              })

              ReceitaCulinaria.find({'userId':userID }).exec((err2 , docs2)=>{
                if(!err2){
                  for(var i=0;i<docs2.length;i++){
                    var x=JSON.parse(JSON.stringify(docs2[i]));
                    x.tipoEvento="Receita Culinária"
                    eventos.push(x)
                  }
                }
                else{
                  console.log("Occoreu um erro ao obter eventos da base de dados: \r\n"+err2+"\r\n\r\n");
                  res.render('error', { error:err2 , message:'Ocorreu um erro ao carregar a página de feed, por favor tente novamente'});
                }
              })

              Evento.find({'userId':userID }).exec((err2 , docs2)=>{
                if(!err2){
                  for(var i=0;i<docs2.length;i++){
                    var x=JSON.parse(JSON.stringify(docs2[i]));
                    x.tipoEvento="Evento"
                    eventos.push(x)
                  }
                }
                else{
                  console.log("Occoreu um erro ao obter eventos da base de dados: \r\n"+err2+"\r\n\r\n");
                  res.render('error', { error:err2 , message:'Ocorreu um erro ao carregar a página de feed, por favor tente novamente'});
                }
              })

              TransacaoMonetaria.find({'userId':userID }).exec((err2 , docs2)=>{
                if(!err2){
                  for(var i=0;i<docs2.length;i++){
                    var x=JSON.parse(JSON.stringify(docs2[i]));
                    x.tipoEvento="Transação Monetária"
                    eventos.push(x)
                  }
                }
                else{
                  console.log("Occoreu um erro ao obter eventos da base de dados: \r\n"+err2+"\r\n\r\n");
                  res.render('error', { error:err2 , message:'Ocorreu um erro ao carregar a página de feed, por favor tente novamente'});
                }
              })

              AlbumFotografico.find({'userId':userID }).exec((err2 , docs2)=>{
                if(!err2){
                  for(var i=0;i<docs2.length;i++){
                    var x=JSON.parse(JSON.stringify(docs2[i]));
                    x.tipoEvento="Álbum Fotográfico"
                    eventos.push(x)
                  }
                }
                else{
                  console.log("Occoreu um erro ao obter eventos da base de dados: \r\n"+err2+"\r\n\r\n");
                  res.render('error', { error:err2 , message:'Ocorreu um erro ao carregar a página de feed, por favor tente novamente'});
                }
              })

              Viagem.find({'userId':userID }).exec((err2 , docs2)=>{
                if(!err2){
                  for(var i=0;i<docs2.length;i++){
                    var x=JSON.parse(JSON.stringify(docs2[i]));
                    x.tipoEvento="Viagem"
                    eventos.push(x)
                  }
                }
                else{
                  console.log("Occoreu um erro ao obter eventos da base de dados: \r\n"+err2+"\r\n\r\n");
                  res.render('error', { error:err2 , message:'Ocorreu um erro ao carregar a página de feed, por favor tente novamente'});
                }
              })

              Cultural.find({'userId':userID }).exec((err2 , docs2)=>{
                if(!err2 ){
                  for(var i=0;i<docs2.length;i++){
                    var x=JSON.parse(JSON.stringify(docs2[i]));
                    x.tipoEvento="Cultural"
                    eventos.push(x)
                  }

                }
                else{
                  console.log("Occoreu um erro ao obter eventos da base de dados: \r\n"+err2+"\r\n\r\n");
                  res.render('error', { error:err2 , message:'Ocorreu um erro ao carregar a página de feed, por favor tente novamente'});
                }

                setTimeout(function() {
                }, 3000);
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

            else{
              console.log("Tentativa de acesso ao feed de um utilizador que não existe na base de dados");
              res.clearCookie("online")
              res.render('error', { message:'Ocorreu um erro ao carregar a página de feed, por favor tente novamente'});
            }
            
          }
          else{

          }
        })
        
      }
      else{
        console.log("Occoreu um erro ao obter tipos de eventos: \n"+err+"\n\n");
        res.render('error', { error:err , message:'Erro ao obter tipos de eventos'});
      }
    })

    
  }  
  
});
/*
router.post('/',function(req,res,next) {
  var form= new formidable.IncomingForm();
  var status=""
  form.parse(req,function(err,fields,files){
    
    if(user.find({'username':fields.username}).password == fields.password){
            res.cookie(fields.username, 'Online')
    }
    else{res.cookie(fields.username,'')}
  })
  
})
*/

module.exports = router;