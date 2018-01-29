var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser")
var fs = require('fs')
var formidable = require("formidable")

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

router.get('/', function(req, res, next) {
    res.render("importar")
  });

router.post('/',function(req,res,next){
    var form= new formidable.IncomingForm();
    var status=""
    
    sync.fiber(function(){
        var currentUser = req.cookies.online;

        // Ir à base de dados buscar o ID do utilizador que fez o pedido
        var userID
        try{
            var docsUsers = sync.await(User.find({'username': currentUser}).exec(sync.defer()))
            if(docsUsers.length>0){
            userDoc = docsUsers[0]
            userID = userDoc._id
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
    
    
        
        form.parse(req,function(err,fields,files){
            if(files.ficheiro!=undefined){
                var contents
                try{
                    contents = fs.readFileSync(files.ficheiro.path,"utf8")
                }
                catch(err){
                    res.render("importar",{status:"Ocorreu um erro na leitura do ficheiro. Por favor tente novamente"})
                    return
                }
                if(contents!=undefined){
                    var separadoPorTipoDeEvento = contents.split(";")
                    for(var tipo in separadoPorTipoDeEvento){
                        var lista = separadoPorTipoDeEvento[tipo]
                        
                        if(lista.indexOf("Cultural") !== -1){
                            lista = lista.substring(lista.indexOf('[')).split("},")
                            lista = '{"list":'+lista+'}'
                            lista = JSON.parse(lista).list
                            for(elem in lista){
                                
                                lista[elem].userId = userID
                                console.log(lista[elem])
                                sync.fiber(function(){

                                    try{
                                        doc = sync.await(new Cultural(lista[elem]).save(sync.defer()))
                                    }
                                    catch(erro){
                                        console.log(erro)
                                        res.render("importar",{status:"Ocorreu um erro na importação dos dados. Por favor verifique a sintaxe dos dados no ficheiro fornecido."})
                                        return  
                                    }
                                })
                            }
                        }

                        if(lista.indexOf("Ideia") !== -1){
                            lista = lista.substring(lista.indexOf('[')).split("},")
                            lista = '{"list":'+lista+'}'
                            lista = JSON.parse(lista).list
                            for(elem in lista){
                                
                                lista[elem].userId = userID
                                console.log(lista[elem])
                                sync.fiber(function(){

                                    try{
                                        doc = sync.await(new Ideia(lista[elem]).save(sync.defer()))
                                    }
                                    catch(erro){
                                        console.log(erro)
                                        res.render("importar",{status:"Ocorreu um erro na importação dos dados. Por favor verifique a sintaxe dos dados no ficheiro fornecido."})
                                        return  
                                    }
                                })
                            }
                        }

                        if(lista.indexOf("Trabalho Académico") !== -1){
                            lista = lista.substring(lista.indexOf('[')).split("},")
                            lista = '{"list":'+lista+'}'
                            lista = JSON.parse(lista).list
                            for(elem in lista){
                                
                                lista[elem].userId = userID
                                console.log(lista[elem])
                                sync.fiber(function(){

                                    try{
                                        doc = sync.await(new TrabalhoAcademico(lista[elem]).save(sync.defer()))
                                    }
                                    catch(erro){
                                        console.log(erro)
                                        res.render("importar",{status:"Ocorreu um erro na importação dos dados. Por favor verifique a sintaxe dos dados no ficheiro fornecido."})
                                        return  
                                    }
                                })
                            }
                        }

                        if(lista.indexOf("Atividade Desportiva") !== -1){
                            lista = lista.substring(lista.indexOf('[')).split("},")
                            lista = '{"list":'+lista+'}'
                            lista = JSON.parse(lista).list
                            for(elem in lista){
                                
                                lista[elem].userId = userID
                                console.log(lista[elem])
                                sync.fiber(function(){

                                    try{
                                        doc = sync.await(new AtividadeDesportiva(lista[elem]).save(sync.defer()))
                                    }
                                    catch(erro){
                                        console.log(erro)
                                        res.render("importar",{status:"Ocorreu um erro na importação dos dados. Por favor verifique a sintaxe dos dados no ficheiro fornecido."})
                                        return  
                                    }
                                })
                            }
                        }

                        if(lista.indexOf("Pensamento") !== -1){
                            lista = lista.substring(lista.indexOf('[')).split("},")
                            lista = '{"list":'+lista+'}'
                            lista = JSON.parse(lista).list
                            for(elem in lista){
                                
                                lista[elem].userId = userID
                                console.log(lista[elem])
                                sync.fiber(function(){

                                    try{
                                        doc = sync.await(new Pensamento(lista[elem]).save(sync.defer()))
                                    }
                                    catch(erro){
                                        console.log(erro)
                                        res.render("importar",{status:"Ocorreu um erro na importação dos dados. Por favor verifique a sintaxe dos dados no ficheiro fornecido."})
                                        return  
                                    }
                                })
                            }
                        }

                        if(lista.indexOf("Crónica") !== -1){
                            lista = lista.substring(lista.indexOf('[')).split("},")
                            lista = '{"list":'+lista+'}'
                            lista = JSON.parse(lista).list
                            for(elem in lista){
                                
                                lista[elem].userId = userID
                                console.log(lista[elem])
                                sync.fiber(function(){

                                    try{
                                        doc = sync.await(new Cronica(lista[elem]).save(sync.defer()))
                                    }
                                    catch(erro){
                                        console.log(erro)
                                        res.render("importar",{status:"Ocorreu um erro na importação dos dados. Por favor verifique a sintaxe dos dados no ficheiro fornecido."})
                                        return  
                                    }
                                })
                            }
                        }

                        if(lista.indexOf("Receita Culinária") !== -1){
                            lista = lista.substring(lista.indexOf('[')).split("},")
                            lista = '{"list":'+lista+'}'
                            lista = JSON.parse(lista).list
                            for(elem in lista){
                                
                                lista[elem].userId = userID
                                console.log(lista[elem])
                                sync.fiber(function(){

                                    try{
                                        doc = sync.await(new ReceitaCulinaria(lista[elem]).save(sync.defer()))
                                    }
                                    catch(erro){
                                        console.log(erro)
                                        res.render("importar",{status:"Ocorreu um erro na importação dos dados. Por favor verifique a sintaxe dos dados no ficheiro fornecido."})
                                        return  
                                    }
                                })
                            }
                        }

                        if(lista.indexOf("Evento") !== -1){
                            lista = lista.substring(lista.indexOf('[')).split("},")
                            lista = '{"list":'+lista+'}'
                            lista = JSON.parse(lista).list
                            for(elem in lista){
                                
                                lista[elem].userId = userID
                                console.log(lista[elem])
                                sync.fiber(function(){

                                    try{
                                        doc = sync.await(new Evento(lista[elem]).save(sync.defer()))
                                    }
                                    catch(erro){
                                        console.log(erro)
                                        res.render("importar",{status:"Ocorreu um erro na importação dos dados. Por favor verifique a sintaxe dos dados no ficheiro fornecido."})
                                        return  
                                    }
                                })
                            }
                        }

                        if(lista.indexOf("Transação Monetária") !== -1){
                            lista = lista.substring(lista.indexOf('[')).split("},")
                            lista = '{"list":'+lista+'}'
                            lista = JSON.parse(lista).list
                            for(elem in lista){
                                
                                lista[elem].userId = userID
                                console.log(lista[elem])
                                sync.fiber(function(){

                                    try{
                                        doc = sync.await(new TransacaoMonetaria(lista[elem]).save(sync.defer()))
                                    }
                                    catch(erro){
                                        console.log(erro)
                                        res.render("importar",{status:"Ocorreu um erro na importação dos dados. Por favor verifique a sintaxe dos dados no ficheiro fornecido."})
                                        return  
                                    }
                                })
                            }
                        }

                        if(lista.indexOf("Álbum Fotográfico") !== -1){
                            lista = lista.substring(lista.indexOf('[')).split("},")
                            lista = '{"list":'+lista+'}'
                            lista = JSON.parse(lista).list
                            for(elem in lista){
                                
                                lista[elem].userId = userID
                                console.log(lista[elem])
                                sync.fiber(function(){

                                    try{
                                        doc = sync.await(new AlbumFotografico(lista[elem]).save(sync.defer()))
                                    }
                                    catch(erro){
                                        console.log(erro)
                                        res.render("importar",{status:"Ocorreu um erro na importação dos dados. Por favor verifique a sintaxe dos dados no ficheiro fornecido."})
                                        return  
                                    }
                                })
                            }
                        }

                        if(lista.indexOf("Viagem") !== -1){
                            lista = lista.substring(lista.indexOf('[')).split("},")
                            lista = '{"list":'+lista+'}'
                            lista = JSON.parse(lista).list
                            for(elem in lista){
                                
                                lista[elem].userId = userID
                                console.log(lista[elem])
                                sync.fiber(function(){

                                    try{
                                        doc = sync.await(new Viagem(lista[elem]).save(sync.defer()))
                                    }
                                    catch(erro){
                                        console.log(erro)
                                        res.render("importar",{status:"Ocorreu um erro na importação dos dados. Por favor verifique a sintaxe dos dados no ficheiro fornecido."})
                                        return  
                                    }
                                })
                            }
                        }
                    }
                    res.render("importar",{status:"Ficheiro importado com sucesso"})
                }
                else{
                    res.render("importar",{status:"Ocorreu um erro na leitura do ficheiro. Por favor tente novamente"})
                    return
                }
            }
            else{
                res.render("importar",{status:"Não foi submetido nenhum ficheiro"})
                return
            }
            

        })
    })
})

module.exports = router;