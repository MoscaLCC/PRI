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
      sync.fiber(function(){
        var currentUser = req.cookies.online;

        // Ir à base de dados buscar os tipos de eventos disponíveis
        var tipos=[]
        var OpTipos=[]
        try{
          var docsTipos = sync.await(TiposEventos.find().exec(sync.defer()))
          for(var i=0;i<docsTipos.length;i++){
            tipos.push(docsTipos[i].nome);
            OpTipos.push(docsTipos[i].nome)
          }
        }
        catch(err){
          console.log("Occoreu um erro ao obter tipos de eventos: \n"+err+"\n\n");
          res.render('error', { error:err , message:'Erro ao obter tipos de eventos'});
          return
        }

        // Ir à base de dados buscar o ID do utilizador que fez o pedido
        var userID
        var userDoc
        try{
          var docsUsers = sync.await(User.find({'username': currentUser}).exec(sync.defer()))
          if(docsUsers.length>0){
            userDoc = docsUsers[0]
            userID = userDoc._id
            //Calculo da Idade//
            var ageDifMs = Date.now() - userDoc.dataNascimento.getTime();
            var ageDate = new Date(ageDifMs); // miliseconds from epoch
            userDoc.idade=Math.abs(ageDate.getUTCFullYear() - 1970);
           
          }
          else{
            console.log("Tentativa de acesso ao feed de um utilizador que não existe na base de dados");
            res.clearCookie("online")
            res.render('error', { message:'Ocorreu um erro ao carregar a página de feed, por favor tente novamente'});
          }
        }
        catch(err){
          console.log("Occoreu um erro ao obter informações sobre o utilizador: \n"+err+"\n\n");
          res.render('error', { error:err , message:'Erro ao obter informações sobre o utilizador'})
          return
        }

        //eventos =  lista com todos os eventos do currentUser
        var eventos=[]
        try{
          var docsIdeias = sync.await(Ideia.find({'userId':userID }).exec(sync.defer()))
          for(var i=0;i<docsIdeias.length;i++){
            var x=JSON.parse(JSON.stringify(docsIdeias[i]));
            x.tipoEvento="Ideia"
            eventos.push(x)
          }
        }
        catch(err){
          console.log("Occoreu um erro ao obter eventos da base de dados: \r\n"+err+"\r\n\r\n");
          res.render('error', { error:err , message:'Ocorreu um erro ao carregar a página de feed, por favor tente novamente'});
          return
        }

        try{
          var docsAcademicos = sync.await(TrabalhoAcademico.find({'userId':userID }).exec(sync.defer()))
          for(var i=0;i<docsAcademicos.length;i++){
            var x=JSON.parse(JSON.stringify(docsAcademicos[i]));
            x.tipoEvento="Trabalho Académico"
            eventos.push(x)
          }
        }
        catch(err){
          console.log("Occoreu um erro ao obter eventos da base de dados: \r\n"+err+"\r\n\r\n");
          res.render('error', { error:err , message:'Ocorreu um erro ao carregar a página de feed, por favor tente novamente'});
          return
        }

        try{
          var docsDesportivas = sync.await(AtividadeDesportiva.find({'userId':userID }).exec(sync.defer()))
          for(var i=0;i<docsDesportivas.length;i++){
            var x=JSON.parse(JSON.stringify(docsDesportivas[i]));
            x.tipoEvento="Atividade Desportiva"

            eventos.push(x)
          }
        }
        catch(err){
          console.log("Occoreu um erro ao obter eventos da base de dados: \r\n"+err+"\r\n\r\n");
          res.render('error', { error:err , message:'Ocorreu um erro ao carregar a página de feed, por favor tente novamente'});
          return
        }

        try{
          var docsPensamentos = sync.await(Pensamento.find({'userId':userID }).exec(sync.defer()))
          for(var i=0;i<docsPensamentos.length;i++){
            var x=JSON.parse(JSON.stringify(docsPensamentos[i]));
            x.tipoEvento="Pensamento"
            eventos.push(x)
          }
        }
        catch(err){
          console.log("Occoreu um erro ao obter eventos da base de dados: \r\n"+err+"\r\n\r\n");
          res.render('error', { error:err , message:'Ocorreu um erro ao carregar a página de feed, por favor tente novamente'});
          return
        }

        try{
          var docsCronicas = sync.await(Cronica.find({'userId':userID }).exec(sync.defer()))
          for(var i=0;i<docsCronicas.length;i++){
            var x=JSON.parse(JSON.stringify(docsCronicas[i]));
            x.tipoEvento="Crónica"
            eventos.push(x)
          }
        }
        catch(err){
          console.log("Occoreu um erro ao obter eventos da base de dados: \r\n"+err+"\r\n\r\n");
          res.render('error', { error:err , message:'Ocorreu um erro ao carregar a página de feed, por favor tente novamente'});
          return
        }

        try{
          var docsReceitas = sync.await(ReceitaCulinaria.find({'userId':userID }).exec(sync.defer()))
          for(var i=0;i<docsReceitas.length;i++){
            var x=JSON.parse(JSON.stringify(docsReceitas[i]));
            x.tipoEvento="Receita Culinária"
            eventos.push(x)
          }
        }
        catch(err){
          console.log("Occoreu um erro ao obter eventos da base de dados: \r\n"+err+"\r\n\r\n");
          res.render('error', { error:err , message:'Ocorreu um erro ao carregar a página de feed, por favor tente novamente'});
          return
        }

        try{
          var docsEventos = sync.await(Evento.find({'userId':userID }).exec(sync.defer()))
          for(var i=0;i<docsEventos.length;i++){
            var x=JSON.parse(JSON.stringify(docsEventos[i]));
            x.tipoEvento="Evento"
            eventos.push(x)
          }
        }
        catch(err){
          console.log("Occoreu um erro ao obter eventos da base de dados: \r\n"+err+"\r\n\r\n");
          res.render('error', { error:err , message:'Ocorreu um erro ao carregar a página de feed, por favor tente novamente'});
          return
        }
        
        try{
          var docsTransacoes = sync.await(TransacaoMonetaria.find({'userId':userID }).exec(sync.defer()))
          for(var i=0;i<docsTransacoes.length;i++){
            var x=JSON.parse(JSON.stringify(docsTransacoes[i]));
            x.tipoEvento="Transação Monetária"
            eventos.push(x)
          }
        }
        catch(err){
          console.log("Occoreu um erro ao obter eventos da base de dados: \r\n"+err+"\r\n\r\n");
          res.render('error', { error:err , message:'Ocorreu um erro ao carregar a página de feed, por favor tente novamente'});
          return
        }

        try{
          var docsAlbuns = sync.await(AlbumFotografico.find({'userId':userID }).exec(sync.defer()))
          for(var i=0;i<docsAlbuns.length;i++){
            var x=JSON.parse(JSON.stringify(docsAlbuns[i]));
            x.tipoEvento="Álbum Fotográfico"
            eventos.push(x)
          }
        }
        catch(err){
          console.log("Occoreu um erro ao obter eventos da base de dados: \r\n"+err+"\r\n\r\n");
          res.render('error', { error:err , message:'Ocorreu um erro ao carregar a página de feed, por favor tente novamente'});
          return
        }

        try{
          var docsViagens = sync.await(Viagem.find({'userId':userID }).exec(sync.defer()))
          for(var i=0;i<docsViagens.length;i++){
            var x=JSON.parse(JSON.stringify(docsViagens[i]));
            x.tipoEvento="Viagem"
            eventos.push(x)
          }
        }
        catch(err){
          console.log("Occoreu um erro ao obter eventos da base de dados: \r\n"+err+"\r\n\r\n");
          res.render('error', { error:err , message:'Ocorreu um erro ao carregar a página de feed, por favor tente novamente'});
          return
        }

        try{
          var docsCulturais = sync.await(Cultural.find({'userId':userID }).exec(sync.defer()))
          for(var i=0;i<docsCulturais.length;i++){
            var x=JSON.parse(JSON.stringify(docsCulturais[i]));
            x.tipoEvento="Cultural"
            eventos.push(x)
          }
        }
        catch(err){
          console.log("Occoreu um erro ao obter eventos da base de dados: \r\n"+err+"\r\n\r\n");
          res.render('error', { error:err , message:'Ocorreu um erro ao carregar a página de feed, por favor tente novamente'});
          return
        }

        if(eventos.length!=0){
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
            eventos:eventos,
            OpTipos:OpTipos
          })
        }
        else{
          eventos = eventos.sort(function(a,b) {return (a.data > b.data) ? -1 : ((b.data > a.data) ? 1 : 0);} )
          res.render('feed',{
            status:"Ainda não foram criados eventos",
            user: {
              username: currentUser ,
              foto: userDoc.foto,
              idade: userDoc.idade,
              email:userDoc.email,
              pnome:userDoc.pnome,
              unome:userDoc.unome
            },
            tipos:tipos,
            eventos:eventos,
            OpTipos:OpTipos
          })
        }
      })
    }    
})

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