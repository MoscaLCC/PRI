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
var user= require("../models/user")
var sync = require("synchronize")

var User = require("../models/user")
/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.cookies.online === undefined){
    res.redirect('/login')
  }
    else{
      sync.fiber(function(){
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

        
        var usersID=[]
        var currentUser
        var userLogado
        try{
          var users=[]
          currentUser = req.cookies.online;          
          var userDoc= sync.await(User.find({"username":currentUser}).exec(sync.defer()))
          userLogado=userDoc[0]
          
          //Calculo da Idade//
          var ageDifMs = Date.now() - userLogado.dataNascimento.getTime();
          var ageDate = new Date(ageDifMs);
          userLogado.idade=Math.abs(ageDate.getUTCFullYear() - 1970);

          users= sync.await(User.find().exec(sync.defer()))        
          if(users.length!=0){
            for(var i=0;i<users.length;i++){
                var x=users[i]._id
                
                x.user=users[i].username
                usersID.push(x)

            }
           
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

        var eventos=[]
        for(var j=0;j<usersID.length;j++){
            try{
            var docsIdeias = sync.await(Ideia.find({'userId':usersID[j],'privado':'false'}).exec(sync.defer()))
            for(var i=0;i<docsIdeias.length;i++){
                var x=JSON.parse(JSON.stringify(docsIdeias[i]));
                x.tipoEvento="Ideia"
                x.user=usersID[j].user
                eventos.push(x)
            }
            }
            catch(err){
            console.log("Occoreu um erro ao obter eventos da base de dados: \r\n"+err+"\r\n\r\n");
            res.render('error', { error:err , message:'Ocorreu um erro ao carregar a página de feed, por favor tente novamente'});
            return
            }

            try{
            var docsAcademicos = sync.await(TrabalhoAcademico.find({'userId':usersID[j],'privado':false }).exec(sync.defer()))
            for(var i=0;i<docsAcademicos.length;i++){
                var x=JSON.parse(JSON.stringify(docsAcademicos[i]));
                x.tipoEvento="Trabalho Académico"
                x.user=usersID[j].user
                eventos.push(x)
            }
            }
            catch(err){
            console.log("Occoreu um erro ao obter eventos da base de dados: \r\n"+err+"\r\n\r\n");
            res.render('error', { error:err , message:'Ocorreu um erro ao carregar a página de feed, por favor tente novamente'});
            return
            }

            try{
            var docsDesportivas = sync.await(AtividadeDesportiva.find({'userId':usersID[j],'privado':false }).exec(sync.defer()))
            for(var i=0;i<docsDesportivas.length;i++){
                var x=JSON.parse(JSON.stringify(docsDesportivas[i]));
                x.tipoEvento="Atividade Desportiva"
                x.user=usersID[j].user
                eventos.push(x)
            }
            }
            catch(err){
            console.log("Occoreu um erro ao obter eventos da base de dados: \r\n"+err+"\r\n\r\n");
            res.render('error', { error:err , message:'Ocorreu um erro ao carregar a página de feed, por favor tente novamente'});
            return
            }

            try{
            var docsPensamentos = sync.await(Pensamento.find({'userId':usersID[j],'privado':false }).exec(sync.defer()))
            for(var i=0;i<docsPensamentos.length;i++){
                var x=JSON.parse(JSON.stringify(docsPensamentos[i]));
                x.tipoEvento="Pensamento"
                x.user=usersID[j].user
                eventos.push(x)
            }
            }
            catch(err){
            console.log("Occoreu um erro ao obter eventos da base de dados: \r\n"+err+"\r\n\r\n");
            res.render('error', { error:err , message:'Ocorreu um erro ao carregar a página de feed, por favor tente novamente'});
            return
            }

            try{
            var docsCronicas = sync.await(Cronica.find({'userId':usersID[j],'privado':false}).exec(sync.defer()))
            for(var i=0;i<docsCronicas.length;i++){
                var x=JSON.parse(JSON.stringify(docsCronicas[i]));
                x.tipoEvento="Cronica"
                x.user=usersID[j].user
                eventos.push(x)
            }
            }
            catch(err){
            console.log("Occoreu um erro ao obter eventos da base de dados: \r\n"+err+"\r\n\r\n");
            res.render('error', { error:err , message:'Ocorreu um erro ao carregar a página de feed, por favor tente novamente'});
            return
            }

            try{
            var docsReceitas = sync.await(ReceitaCulinaria.find({'userId':usersID[j],'privado':false}).exec(sync.defer()))
            for(var i=0;i<docsReceitas.length;i++){
                var x=JSON.parse(JSON.stringify(docsReceitas[i]));
                x.tipoEvento="Receita Culinária"
                x.user=usersID[j].user
                eventos.push(x)
            }
            }
            catch(err){
            console.log("Occoreu um erro ao obter eventos da base de dados: \r\n"+err+"\r\n\r\n");
            res.render('error', { error:err , message:'Ocorreu um erro ao carregar a página de feed, por favor tente novamente'});
            return
            }

            try{
            var docsEventos = sync.await(Evento.find({'userId':usersID[j],'privado':false}).exec(sync.defer()))
            for(var i=0;i<docsEventos.length;i++){
                var x=JSON.parse(JSON.stringify(docsEventos[i]));
                x.tipoEvento="Evento"
                x.user=usersID[j].user
                eventos.push(x)
            }
            }
            catch(err){
            console.log("Occoreu um erro ao obter eventos da base de dados: \r\n"+err+"\r\n\r\n");
            res.render('error', { error:err , message:'Ocorreu um erro ao carregar a página de feed, por favor tente novamente'});
            return
            }
            
            try{
            var docsTransacoes = sync.await(TransacaoMonetaria.find({'userId':usersID[j],'privado':false}).exec(sync.defer()))
            for(var i=0;i<docsTransacoes.length;i++){
                var x=JSON.parse(JSON.stringify(docsTransacoes[i]));
                x.tipoEvento="Transação Monetária"
                x.user=usersID[j].user
                eventos.push(x)
            }
            }
            catch(err){
            console.log("Occoreu um erro ao obter eventos da base de dados: \r\n"+err+"\r\n\r\n");
            res.render('error', { error:err , message:'Ocorreu um erro ao carregar a página de feed, por favor tente novamente'});
            return
            }

            try{
            var docsAlbuns = sync.await(AlbumFotografico.find({'userId':usersID[j],'privado':false}).exec(sync.defer()))
            for(var i=0;i<docsAlbuns.length;i++){
                var x=JSON.parse(JSON.stringify(docsAlbuns[i]));
                x.tipoEvento="Álbum Fotográfico"
                x.user=usersID[j].user
                eventos.push(x)
            }
            }
            catch(err){
            console.log("Occoreu um erro ao obter eventos da base de dados: \r\n"+err+"\r\n\r\n");
            res.render('error', { error:err , message:'Ocorreu um erro ao carregar a página de feed, por favor tente novamente'});
            return
            }

            try{
            var docsViagens = sync.await(Viagem.find({'userId':usersID[j],'privado':false}).exec(sync.defer()))
            for(var i=0;i<docsViagens.length;i++){
                var x=JSON.parse(JSON.stringify(docsViagens[i]));
                x.tipoEvento="Viagem"
                x.user=usersID[j].user
                eventos.push(x)
            }
            }
            catch(err){
            console.log("Occoreu um erro ao obter eventos da base de dados: \r\n"+err+"\r\n\r\n");
            res.render('error', { error:err , message:'Ocorreu um erro ao carregar a página de feed, por favor tente novamente'});
            return
            }

            try{
            var docsCulturais = sync.await(Cultural.find({'userId':usersID[j],'privado':false}).exec(sync.defer()))
            for(var i=0;i<docsCulturais.length;i++){
                var x=JSON.parse(JSON.stringify(docsCulturais[i]));
                x.tipoEvento="Cultural"
                x.user=usersID[j].user
                eventos.push(x)
            }
            }
            catch(err){
            console.log("Occoreu um erro ao obter eventos da base de dados: \r\n"+err+"\r\n\r\n");
            res.render('error', { error:err , message:'Ocorreu um erro ao carregar a página de feed, por favor tente novamente'});
            return
            }
        }
        if(eventos.length!=0){
        eventos = eventos.sort(function(a,b) {return (a.data > b.data) ? -1 : ((b.data > a.data) ? 1 : 0);} )
        res.render('feedPublico',{
            user: {
                username:currentUser,
                foto:userLogado.foto,
                idade:userLogado.idade,
                email:userLogado.email,
                pnome:userLogado.pnome,
                unome:userLogado.unome
              },
          tipos:tipos,
          eventos:eventos,
          OpTipos:OpTipos
        })
        }
        else{
            res.render('feedPublico',{
                user: {
                    username:currentUser,
                    foto:userLogado.foto,
                    idade:userLogado.idade,
                    email:userLogado.email,
                    pnome:userLogado.pnome,
                    unome:userLogado.unome
                  },
                status:"Não existem publicações públicas de outros utilizadores",
                tipos:tipos,
                eventos:eventos,
                OpTipos:OpTipos
              })
        }
      })
    }    
})

module.exports = router;