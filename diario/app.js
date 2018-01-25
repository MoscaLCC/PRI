var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport')
var mongoose = require("mongoose")
var utils=require("utils")
mongoose.connect("mongodb://user:pass@ds129926.mlab.com:29926/eudigital")
mongoose.Promise = global.Promise
var dbGlobal = mongoose.connection
dbGlobal.on("error",console.error.bind(console,"MongoDB connection error: "))

var index = require('./routes/index')
var editarCronica = require('./routes/editarCronica')
var editarPensaento = require('./routes/editarPensamento')
var ideia = require('./routes/registarIdeia')
var users = require('./routes/users')
var editarViagem = require('./routes/editarViagem')
var editarTraAcd = require('./routes/editarTraAcd')
var editarTransMon = require('./routes/editaTransMon')
var editarIdeia = require('./routes/editarIdeia')
var editarEvento = require('./routes/editarEvento')
var editActDesp = require('./routes/editarActDesp')
var transacao = require('./routes/registarTransacao')
var cronica = require('./routes/registarCronica')
var trabalho = require('./routes/registarTrabalho')
var registar = require('./routes/registarAct')
var viagem = require('./routes/registarViagem')
var receita = require('./routes/registarReceita')
var signup = require('./routes/registarUser')
var login = require('./routes/login')
var feed = require('./routes/feed')
var editarCultural = require('./routes/editarCultural')
var editarRecCul = require('./routes/editarRecCul')
var logout= require('./routes/logout')
var pensamento= require('./routes/registarPensamento')
var cultural= require('./routes/registarCultural')
var evento = require('./routes/registarEve')
var album= require('./routes/registarAlbum')
var pesquisa = require('./routes/pesquisarCat')
var perfil = require('./routes/perfil')
var eliminar = require('./routes/eliminar')
var editar = require('./routes/editar')
var outrasPublicacoes= require('./routes/outras_publicacoes')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use((req,res,next)=>{
  req.db=dbGlobal
  next()
})

app.use('/ola',(req,res,next)=>{
  res.render('teste2')
})
app.use('/', index)
app.use('/feed', feed)
app.use('/registarAct',registar)
app.use('/users', users)
app.use('/signup',signup)
app.use('/login', login)
app.use('/logout',logout)
app.use('/editarTraAcd', editarTraAcd)
app.use('/editarCronica', editarCronica)
app.use('/registarPensamento',pensamento)
app.use('/registarCronica', cronica)
app.use('/registarTransacao', transacao)
app.use('/registarCultural',cultural)
app.use('/registarTrabalho', trabalho)
app.use('/pesquisarCat',pesquisa)
app.use('/perfil',perfil)
app.use('/editarTransMon', editarTransMon)
app.use('/editarRecCul', editarRecCul)
app.use('/editarPensamento', editarPensaento)
app.use('/registarEve', evento)
app.use('/editarCultural', editarCultural)
app.use('/editarIdeia', editarIdeia)
app.use('/editarActDesp', editActDesp)
app.use('/editarEvento', editarEvento)
app.use('/registarIdeia', ideia)
app.use('/registarViagem', viagem)
app.use('/editarViagem', editarViagem)
app.use('/registarReceita', receita)
app.use('/registarAlbum', album)
app.use('/eliminar', eliminar)
app.use('/editar',editar)
app.use('/publicacoes',outrasPublicacoes)
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

