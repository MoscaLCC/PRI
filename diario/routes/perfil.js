var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser")
var user = require("../models/user")
var formidable = require("formidable")
var User = require("../models/user")

var fs = require('fs')
var cookieParser = require("cookie-parser")

/* GET home page. */
router.get('/', function(req, res, next) {
    var currentUser = req.cookies.online;
    User.find({'username': currentUser}).exec((err1,docs1)=>{
        if(!err1){
          if(docs1.length>0){
            var userDoc = docs1[0]
            //Calculo da Idade//
            var ageDifMs = Date.now() - userDoc.dataNascimento.getTime();
            var ageDate = new Date(ageDifMs); // miliseconds from epoch
            userDoc.idade=Math.abs(ageDate.getUTCFullYear() - 1970);
            var userID = userDoc._id  
            res.render('perfil',{
                user:{
                username: currentUser ,
                foto: userDoc.foto,
                idade: userDoc.idade,
                email:userDoc.email,
                pnome:userDoc.pnome,
                unome:userDoc.unome,
                password:userDoc.password
                }
            })
            }  
        }
        else{
            console.log("Utilizador não existe")
        }   
})
})

router.post('/',function(req,res,next) {
    var images_dir = './public/images/upload/'
    var form= new formidable.IncomingForm();
    var status=""

    form.parse(req,function(err,fields,files) {
        if(!err){
            if(fields.privado === "on")
                fields.privado = true;
            else fields.privado = false;

            console.log(files)
            if(files.foto1.name != "" && fields.namefoto != "" ){
                var extension = files.foto1.name.split(".")
                extension = extension[extension.length-1]
                var data = new Date()
                var novadata = data.toISOString().split(':').join('-')
                novadata = novadata.split('.').join('-')
                fields.fotografia = fields._id + "-" + novadata + "." + extension
                fs.rename(files.foto1.path, './public/images/upload/' + fields.fotografia, function(err1){
                    if(!err1){
                        console.log("Ficheiro recebido e guardado com sucesso")
                    }
                    else{
                        console.log("Ocorreram erros na gravação do ficheiro enviado")
                    }
                })
                User.update(
                    {'username':fields.username},
                    {$set:{'foto':fields.fotografia}}
                ).exec(function(err,docs){
                    if(!err){
                        console.log("Actividade desportiva alterado com sucesso")
                    }
                    else{
                        console.log("Ocurreu um erro tentar editar Ideia")
                    }
                })

            }
            else{
                if(fields.namefoto == ""){
                    User.update(
                        {'username':fields.username},
                        {$unset:{'foto':1}}
                    ).exec(function(err,docs){
                        if(!err){
                            console.log("perfil alterado com sucesso")
                        }
                        else{
                            console.log("Ocurreu um erro tentar editar perfil")
                        }
                    })
                }
            }

            if(fields.removido!=""){
                try {
                    curPath = images_dir + removido
                    fs.unlinkSync(curPath);
                }catch(err){console.log("ERRO:" + err)}
            }

            User.update(
                {'username':fields.username},
                {$set:{'email': fields.email,
                    'password': fields.password}}).exec(function(err,docs){
                if(!err){
                    console.log("Perfil alterado com sucesso")
                }
                else{
                    console.log("Ocurreu um erro tentar editar o perfil")
                }
            })



            res.redirect('/feed')
        }else {
            console.log("Ocurreo um erro ao tentar editar o Perfil")
            res.redirect('/feed')
        }
    })
})


module.exports = router;



