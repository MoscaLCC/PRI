
grammar gramatica;

@header{
        import java.util.HashSet;
        import java.util.ArrayList;
        import java.util.HashMap;
        import java.io.PrintWriter;
}

@members{
    //String dir = "C:\\Users\\Samuel\\Google Drive\\universidade\\GCS\\Pingo Doce\\site\\";
    String dir2 ="C:\\Users\\Samuel\\Google Drive\\universidade\\GCS\\Pingo Doce\\site\\";  
    String dirImagens="imagens\\";
    ArrayList<String> erros = new ArrayList<>();
    class Triplo{
        String c1;
        String rel;
        Conceito c2;

        public Triplo(String c1,String rel,Conceito c2){
             this.c1=c1;
             this.rel=rel;
             this.c2=c2;
        }

        public boolean equals(Triplo t){
             return this.c1.equals(t.c1) && this.rel.equals(t.rel) && this.c2.equals(t.c2) ;
        }
    }
    
    class Conceitos{
        HashSet<Conceito> conceitos;
        
        public Conceitos(){
            conceitos = new HashSet<>();
        }
        
        public boolean add(Conceito c){
            for(String atrib : c.atributos.values())
                atrib=atrib.toLowerCase();
            for(Conceito x : conceitos)
                if(x.nome.equals(c.nome))
                    return false;
            conceitos.add(c);
            return true;
        }
        
        public Conceito getByName(String nome){
            for(Conceito c : conceitos)
                if(c.nome.equals(nome))
                    return c;
            return null;
        }
        
        public HashSet<String> getNomes(){
            HashSet<String> ret = new HashSet<>();
            for(Conceito c : this.conceitos)
                ret.add(c.nome);
            return ret;
        }
    }
    
    class Conceito{
        String nome;
        HashMap<String,String> atributos;

        public Conceito(String nome,HashMap<String,String> atributos){
            this.nome=nome;
            this.atributos=atributos;
        }
        
        

        public boolean equals(Conceito c){
            boolean ret = true;
            ret = ret && c.nome.equals(this.nome);
            if(this.atributos.size() == c.atributos.size()){
                for(HashMap.Entry<String, String> entry : c.atributos.entrySet()){
                    boolean hasKey = this.atributos.containsKey(entry.getKey());
                    ret=ret && hasKey;
                    if(hasKey){
                        ret = ret && this.atributos.get(entry.getKey()).equals(entry.getValue());
                    }
                }
            }
            else ret=false;
          return ret; 
        }
    }
    
    class Aux{
        String conceito ;
        ArrayList<Aux> filhos;
        
        public Aux(String conceito){
            this.conceito=conceito;
            this.filhos = new ArrayList<>();
        }
        
        public String navBar(){
            String output="";
            if(this.filhos.size()>0){
                output+= "\n      <a onclick=\"myAccFunc('" + this.conceito + "')\" href=\"javascript:void(0)\" class=\"w3-button w3-block w3-white w3-left-align\" id=\"myBtn\">"
                       + "\n      " + this.conceito + "<i class=\"fa fa-caret-down\"></i>"
                       + "\n      </a>"
                       + "\n  <div id=\"" + this.conceito + "\" class=\"w3-bar-block w3-hide w3-padding-large w3-medium\">";
                for(Aux filho : this.filhos){
                    output += filho.navBar();
                }
                output+="\n  </div>";
            }
            else{
                output+="\n      <a href=\"javascript:void(0)\" onclick=\""+ this.conceito + "()\" class=\"w3-bar-item w3-button\">" + this.conceito + "</a>";
            }
            return output;
        }
        
        public String content(HashSet<Triplo> tripsM){
            String output="";
            if(this.filhos.size()==0){
                output+="\nfunction " + this.conceito + "(){"
                      + "\n    document.getElementById(\"title\").innerHTML='" + this.conceito + "';"
                      + "\n    document.getElementById(\"grid\").innerHTML='";
                for(Triplo t : tripsM){
                    if(t.rel.equals("iof")){
                        if(t.c2.nome.equals(this.conceito)){
                            String output2="";                                
                            output+="    <div class=\"w3-col l3 s6\">"
                                  + "      <div class=\"w3-container\">"
                                  + "          <div class=\"w3-display-container  w3-card-4\">";
                                  if(t.c2.atributos.keySet().contains("imagem")){
                           output+= "<a href=\""+ t.c1.replaceAll("\"","")+".html\"><img src=\"imagens/" + t.c1 + ".jpg\" style=\"width:100%;height:100%;\"></a>"
                                  + "  <p></p>";
                                  }
                                  else{  
                           output+="<a href=\""+ t.c1.replaceAll("\"","")+".html\"><p>" + t.c1 +"</p></a>"
                                 +"<p></p>";   
                                  }
                           output+= "</div>"
                                  + "</div>"
                                  + "</div>";
                         
                           output2+="<!DOCTYPE html>"
                                    + "\n<html>"
                                    + "\n<title>W3.CSS Template</title>"
                                    + "\n<meta charset=\"UTF-8\">"
                                    + "\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">"
                                    + "\n<link rel=\"stylesheet\" href=\"https://www.w3schools.com/w3css/4/w3.css\">"
                                    + "\n<link rel=\"stylesheet\" href='https://fonts.googleapis.com/css?family=Roboto'>"
                                    + "\n<link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css\">"
                                    + "\n<style>"
                                    + "\nhtml,body,h1,h2,h3,h4,h5,h6 {font-family: \"Roboto\", sans-serif}"
                                    + "\n</style>"
                                    + "\n<body class=\"w3-light-grey\">"
                                    + "\n<!-- Page Container -->"
                                    + "\n<div class=\"w3-content w3-margin-top\" style=\"max-width:1400px;\">"
                                    + "\n  <!-- The Grid -->"
                                    + "\n  <div class=\"w3-row-padding\">"
                                    + "\n    <!-- Left Column -->"
                                    + "\n    <div class=\"w3-twothird w3-center\" style=\"width:50%\">"
                                    + "\n      <div class=\"w3-white w3-text-grey w3-card\" >"
                                    + "\n        <div class=\"w3-display-container\">"
                                    + "\n          <img src=\""+dirImagens+t.c1+".jpg"+"\" style=\"width:50%\" alt=\"Avatar\">"
                                    + "\n          <div class=\"w3-display-bottomleft w3-container w3-text-black\">"
                                    + "\n          </div>"
                                    + "\n        </div>"
                                    + "\n        <div class=\"w3-container\">"
                                    + "\n          <hr>"
                                    +"\n <a href=\"pagina.html\" class=\"fa fa-home fa-fw w3-margin-right w3-large w3-text-teal\">Voltar</a>"
                                    + "\n          <br>"
                                    + "\n        </div>"
                                    + "\n      </div><br>"
                                    + "\n    <!-- End Left Column -->"
                                    + "\n    </div>"
                                    + "\n    <!-- Right Column -->"
                                    + "\n    <div class=\"w3-twothird\" style=\"width:50%\">"
                                    + "\n      <div class=\"w3-container w3-card w3-white w3-margin-bottom\">"
                                    + "\n        <h2 class=\"w3-text-grey w3-padding-50\"><i class=\" fa-fw w3-margin-right w3-xxlarge w3-text-teal\"></i>"+t.c1+"</h2>"
                                    + "\n        <div class=\"w3-container\">";
                                    for(String key:t.c2.atributos.keySet()){
                                             if(key.equals("resposta")){
                                                 output2+="\n<h5 class=\"w3-opacity\"><b>"+key+" </b></h5>"
                                                     + "\n<p id=\""+key+"\""+" style=display:none>"+ t.c2.atributos.get(key)+"</p>" 
                                                     +"\n<p>"
                                                     + "\n<button id=\"respbtn\" class=\"w3-button w3-grey w3-round\"onclick=\"mostrarResposta()\">Mostrar Resposta</button>"
                                                     +"\n</p>"
                                                     + "\n<hr>";
                                             }
                                             else{
                                                 output2+="\n<h5 class=\"w3-opacity\"><b>"+key+" </b></h5>"
                                                        + "\n<p>"+ t.c2.atributos.get(key)+"</p>"                            
                                                        + "\n<hr>";
                                     }
                                   }         
                                    output2+="\n</div>"
                                    + "\n      </div>"
                                    + "\n    <!-- End Right Column -->"
                                    + "\n    </div>"
                                    + "\n  <!-- End Grid -->"
                                    + "\n  </div>"
                                    + "\n  <!-- End Page Container -->"
                                    + "\n</div>"
                                    + "\n<footer class=\"w3-container w3-teal w3-center w3-margin-top\">"
                                    + "\n  <p>"+t.c1+"</p>"
                                    + "\n</footer>"
                                    + "\n</body>"
                                    + "\n<script>"
                                    +"\n function mostrarResposta(){"
                                    +"\n document.getElementById(\"resposta\").style.display='';"
                                    +"\n document.getElementById(\"respbtn\").style.display='none';"
                                    +"\n}"
                                    +"\n</script>"
                                    + "\n</html>";
                         try{
                                PrintWriter writer= new PrintWriter(dir2 + t.c1.replaceAll("\"","")+".html","UTF-8");
                                writer.println(output2);
                                writer.close();
                           }catch(Exception e){e.printStackTrace();}       
                        }  
                    }
                }
                output+="';\n}";
            }
            else{
                for(Aux filho : this.filhos){
                    output += filho.content(tripsM);
                }
            }
            return output;
        }
        
    }
    
    
    
    public Aux criaEstrutura(String pai , HashSet<String> conceitos , HashSet<Triplo> tripsC , HashSet<Triplo> tripsM){
        ArrayList<Aux> filhos = new ArrayList<>();
        for(Triplo t : tripsC){
            if(t.rel.equals("is-a")){
                if(t.c2.nome.equals(pai)){
                    filhos.add(new Aux(t.c1));
                }
            }
        }
        ArrayList<Aux> filhos2 = new ArrayList<>();
        
        for(Aux f : filhos){
            filhos2.add(criaEstrutura(f.conceito,conceitos,tripsC,tripsM));
        }
        
        Aux ret = new Aux(pai);
        ret.filhos=filhos2;
        return ret;
    }
   
   
}


ontologia returns[String name,Conceitos cncts ,HashSet<String> indvds , HashSet<String> rels , HashSet<Triplo> tripsC,HashSet<Triplo> tripsM,HashSet<Triplo> tripsI]
@after{
       HashSet<String> conceitos = $ontologia.cncts.getNomes();
       
       boolean alterado=true;
       while(alterado){
           alterado=false;
           for(Triplo t : $ontologia.tripsC){
               String triplo = ""+t.c1+" = "+t.rel+" => "+t.c2.nome;
               if(t.rel.equals("is-a")){
                   if(!conceitos.contains(t.c1))
                       erros.add("ERRO: O conceito <" +t.c1 + "> nao foi declarado :: " +triplo + " :: (as relacoes no bloco triplosC tem que ser sempre do tipo \"CONCEITO = REL => CONCEITO\")");
                   if(!conceitos.contains(t.c2.nome))
                       erros.add("ERRO: O conceito <" +t.c2.nome + "> nao foi declarado :: " +triplo+ " :: (as relacoes no bloco triplosC tem que ser sempre do tipo \"CONCEITO = REL => CONCEITO\")");
                   if(conceitos.contains(t.c1) && conceitos.contains(t.c2.nome)){
                       for(HashMap.Entry<String, String> entry : $ontologia.cncts.getByName(t.c2.nome).atributos.entrySet()){
                           Conceito c = $ontologia.cncts.getByName(t.c1);
                           if(!c.atributos.containsKey(entry.getKey())){
                               c.atributos.put(entry.getKey(), entry.getValue());
                               alterado=true;
                           }
                       }
                   }
               }
           }
       }
       for(Triplo t : $ontologia.tripsC){
                                         
           String triplo = ""+t.c1+" = "+t.rel+" => "+t.c2.nome;
           if(!$ontologia.rels.contains(t.rel))
                erros.add("ERRO: A relacao " + t.rel + " nao foi declarada :: " +triplo);
           if(!conceitos.contains(t.c1))
               erros.add("ERRO: O conceito <" +t.c1 + "> nao foi declarado :: " +triplo + " :: (as relacoes no bloco triplosC tem que ser sempre do tipo \"CONCEITO = REL => CONCEITO\")");
           if(!conceitos.contains(t.c2.nome))
               erros.add("ERRO: O conceito <" +t.c2.nome + "> nao foi declarado :: " +triplo+ " :: (as relacoes no bloco triplosC tem que ser sempre do tipo \"CONCEITO = REL => CONCEITO\")");
           
           if(conceitos.contains(t.c1) && conceitos.contains(t.c2.nome)){
                // CONCEITO = REL => CONCEITO
                Conceito aux = $ontologia.cncts.getByName(t.c2.nome);
                HashSet<String> nomesAtribs = new HashSet<>(aux.atributos.keySet());
                for(String atrib : t.c2.atributos.keySet()){
                    if(!nomesAtribs.contains(atrib))
                        erros.add("ERRO: o atributo <"+atrib+"> nao foi declarado no conceito <"+aux.nome+"> :: " +triplo);
                    else{
                         switch(aux.atributos.get(atrib)){
                             case "string":
                                 if(!t.c2.atributos.get(atrib).matches("^\"[^\"]*\"$"))
                                     erros.add("ERRO: o atributo <"+atrib+"> tem tipo String, mas foi encontrado um valor invalido :: "+triplo);
                                 break;
                             case "int":
                                 if(!t.c2.atributos.get(atrib).matches("^(-)?[0-9]+$"))
                                     erros.add("ERRO: o atributo <"+atrib+"> tem tipo Int, mas foi encontrado um valor invalido :: "+triplo);
                                 break;
                             case "float":
                                System.out.println("######### "+t.c2.atributos.get(atrib));
                                 if(!t.c2.atributos.get(atrib).matches("^-?[0-9]+\\.[0-9]+$"))
                                     erros.add("ERRO: o atributo <"+atrib+"> tem tipo Float, mas foi encontrado um valor invalido :: "+triplo);
                                 break;
                             case "bool":
                                 if(!t.c2.atributos.get(atrib).matches("^(true|false)$"))
                                     erros.add("ERRO: o atributo <"+atrib+"> tem tipo Bool, mas foi encontrado um valor invalido :: "+triplo);
                                 break;
                         }
                    }
                }
           }
       }
       for(Triplo t : $ontologia.tripsM){
           String triplo = ""+t.c1+" = "+t.rel+" => "+t.c2.nome;
           if(!$ontologia.rels.contains(t.rel))
                erros.add("ERRO: A relacao " + t.rel + " nao foi declarada :: " +triplo);
            if(!$ontologia.indvds.contains(t.c1))
                erros.add("ERRO: O individuo <" +t.c1 + "> nao foi declarado :: " +triplo + "(as relacoes no bloco triplosM tem que ser sempre do tipo \"INDIVIDUO = REL => CONCEITO\")");
            if(!conceitos.contains(t.c2.nome))
                erros.add("ERRO: O conceito <" +t.c2.nome + "> nao foi declarado :: " +triplo + "(as relacoes no bloco triplosM tem que ser sempre do tipo \"INDIVIDUO = REL => CONCEITO\")");
            else{
                if(t.rel.equals("iof")){
                    Conceito aux = $ontologia.cncts.getByName(t.c2.nome);
                    HashSet<String> nomesAtribs = new HashSet<>(aux.atributos.keySet());
                    for(String atrib : t.c2.atributos.keySet()){
                        if(!nomesAtribs.contains(atrib)){
                            erros.add("ERRO: o atributo <" + atrib + "> nao foi declarado no conceito <" + aux.nome + "> :: " + triplo);
                        }
                        else{
                             switch(aux.atributos.get(atrib)){
                                 case "string":
                                     if(!t.c2.atributos.get(atrib).matches("^\"[^\"]+\"$"))
                                         erros.add("ERRO: o atributo <"+atrib+"> tem tipo String, mas foi encontrado um valor invalido :: "+triplo);
                                     break;
                                 case "int":
                                     if(!t.c2.atributos.get(atrib).matches("^(-)?[0-9]+$"))
                                         erros.add("ERRO: o atributo <"+atrib+"> tem tipo Int, mas foi encontrado um valor invalido :: "+triplo);
                                     break;
                                 case "float":
                                     if(!t.c2.atributos.get(atrib).matches("^(-)?[0-9]+\\.[0-9]+$"))
                                         erros.add("ERRO: o atributo <"+atrib+"> tem tipo Float, mas foi encontrado um valor invalido :: "+triplo);
                                     break;
                             }
                        }
                    }
                }
                else erros.add("So sao admitidas relacoes \"iof\" no bloco triplosM");
            }
       }
       
       for(Triplo t : $ontologia.tripsI){
            String triplo = ""+t.c1+" = "+t.rel+" => "+t.c2.nome;
            if(!$ontologia.rels.contains(t.rel))
                erros.add("ERRO: A relacao " + t.rel + " nao foi declarada :: " +triplo);
            if(!$ontologia.indvds.contains(t.c1))
                erros.add("ERRO: O individuo <"+t.c1+"> nao foi declarado ::"+triplo+"(as relacoes no bloco triplosI tem que ser sempre do tipo \"INDIVIDUO = REL => INDIVIDUO\")");
            if(!$ontologia.indvds.contains(t.c2.nome))
                erros.add("ERRO: O individuo <"+t.c2.nome+"> nao foi declarado ::"+triplo+"(as relacoes no bloco triplosI tem que ser sempre do tipo \"INDIVIDUO = REL => INDIVIDUO\")");
            }
     
       if(erros.size()==0){
            /* Criação Do Virtual Learning Space */
            String output="<!DOCTYPE html>\n<html>"
                        + "\n<title>"+$ontologia.name+"</title>"
                        + "\n<meta charset=\"UTF-8\">"
                        + "\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">"
                        + "\n<link rel=\"stylesheet\" href=\"https://www.w3schools.com/w3css/4/w3.css\">"
                        + "\n<link rel=\"stylesheet\" href=\"https://fonts.googleapis.com/css?family=Roboto\">"
                        + "\n<link rel=\"stylesheet\" href=\"https://fonts.googleapis.com/css?family=Montserrat\">"
                        + "\n<link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css\">"
                        + "\n<style>"
                        + "\n.w3-sidebar a {font-family: \"Roboto\", sans-serif}"
                        + "\nbody,h1,h2,h3,h4,h5,h6,.w3-wide {font-family: \"Montserrat\", sans-serif;}"
                        + "\n</style>"
                        + "\n<body class=\"w3-content\" style=\"max-width:1200px\">"
                        + "\n<!-- Sidebar/menu -->"
                        + "\n<nav class=\"w3-sidebar w3-bar-block w3-white w3-collapse w3-top\" style=\"z-index:3;width:250px\" id=\"mySidebar\">"
                        + "\n  <div class=\"w3-container w3-display-container w3-padding-16\">"
                        + "\n    <i onclick=\"w3_close()\" class=\"fa fa-remove w3-hide-large w3-button w3-display-topright\"></i>"
                        + "\n    <h3 class=\"w3-wide\"><b>"+$ontologia.name+"</b></h3>"
                        + "\n  </div>"
                        + "\n  <div class=\"w3-padding-64 w3-large w3-text-grey\" style=\"font-weight:bold\">";
            ArrayList<Aux> conceitosPai = new ArrayList<>();
            for(String conceito : $ontologia.cncts.getNomes()){
                boolean isPai=true;                 
                for(Triplo t : $ontologia.tripsC){
                    if(t.rel.equals("is-a")){
                        if(t.c1.equals(conceito)){
                            isPai=false;
                        }
                    }
                }
                if(isPai){
                    conceitosPai.add(new Aux(conceito));
                }
            }
            
            ArrayList<Aux> pais = new ArrayList<>();
            
            for(Aux pai : conceitosPai){
                pais.add(criaEstrutura(pai.conceito,conceitos,$ontologia.tripsC,$ontologia.tripsM));
            }
                 
            for(Aux pai : pais){
                output+=pai.navBar();
            }
            output+="\n</nav>";
            
            output+="<!-- Top menu on small screens -->"
                  + "\n<header class=\"w3-bar w3-top w3-hide-large w3-black w3-xlarge\">"
                  + "\n  <div class=\"w3-bar-item w3-padding-24 w3-wide\">LOGO</div>"
                  + "\n  <a href=\"javascript:void(0)\" class=\"w3-bar-item w3-button w3-padding-24 w3-right\" onclick=\"w3_open()\"><i class=\"fa fa-bars\"></i></a>"
                  + "\n</header>"
                  + "\n<!-- Overlay effect when opening sidebar on small screens -->"
                  + "\n<div class=\"w3-overlay w3-hide-large\" onclick=\"w3_close()\" style=\"cursor:pointer\" title=\"close side menu\" id=\"myOverlay\"></div>"
                  + "\n<!-- !PAGE CONTENT! -->"
                  + "\n<div class=\"w3-main\" style=\"margin-left:250px\">"
                  + "\n  <!-- Push down content on small screens -->"
                  + "\n <!-- Top header -->"
                  + "\n  <header class=\"w3-container w3-xlarge\">"
                  + "\n    <p class=\"w3-left\" id=\"title\"></p>"
                  + "\n    <p class=\"w3-right\">"
                  + "\n    </p>"
                  + "\n  </header>"
                  + "\n   <div class=\"w3-row\" id=\"grid\">"
                  + "\n   </div>"
                  + "\n<script>"
                  + "\n// Accordion "
                  + "\nfunction myAccFunc(y) {"
                  + "\n    var x = document.getElementById(y);"
                  + "\n    if (x.className.indexOf(\"w3-show\") == -1) {"
                  + "\n        x.className += \" w3-show\";"
                  + "\n    } else {"
                  + "\n        x.className = x.className.replace(\" w3-show\", \"\");"
                  + "\n    }"
                  + "\n}"
                  + "\n// Script to open and close sidebar"
                  + "\nfunction w3_open() {"
                  + "\n    document.getElementById(\"mySidebar\").style.display = \"block\";"
                  + "\n    document.getElementById(\"myOverlay\").style.display = \"block\";"
                  + "\n}"
                  + "\nfunction w3_close() {"
                  + "\n    document.getElementById(\"mySidebar\").style.display = \"none\";"
                  + "\n    document.getElementById(\"myOverlay\").style.display = \"none\";"
                  + "\n}";
            for(Aux pai : pais){
                output+=pai.content($ontologia.tripsM);
                
            }
           
                
            output+="\n</script>"
                  + "\n</body>"
                  + "\n</html>";
             try{
                 PrintWriter writer= new PrintWriter(dir2 + "pagina.html","UTF-8");
                 writer.println(output);
                 writer.close();
             }catch(Exception e){e.printStackTrace();}

            
            /* GERACAO DE GRAFO EM DOT */
            
            ArrayList<String> output3 = new ArrayList<>();
            output3.add("digraph "+$ontologia.name+"{");
            for(Triplo t : $ontologia.tripsC)
                output3.add("\t" + t.c1 + "->" + t.c2.nome + " [label=\"" + t.rel + "\"]");
            for(Triplo t : $ontologia.tripsM)
                output3.add("\t" + t.c1 + "->" + t.c2.nome + " [label=\"" + t.rel + "\"]");
            for(Triplo t : $ontologia.tripsI)
                output3.add("\t" + t.c1 + "->" + t.c2.nome + " [label=\"" + t.rel + "\"]");
            output3.add("}");
            for(String line : output3)
                System.out.println(line);
           
        }
       else for(String err : erros)
            System.out.println(err);
        
}
    : 'Ontologia' TEXT {$ontologia.name=$TEXT.text;} conceitos {$ontologia.cncts=$conceitos.cncts;}
                       individuos? {if($individuos.text!=null)$ontologia.indvds = $individuos.indvds;else $ontologia.indvds=new HashSet<>();}
                       relacoes {$ontologia.rels=$relacoes.rels;}
                       'triplosC' triplos["conceitos"] {$ontologia.tripsC=$triplos.trips;}
                       ('triplosM' triplos["mistos"])? {if($triplos.text!=null)$ontologia.tripsM=$triplos.trips;else $ontologia.tripsM=new HashSet<>();}
                       ('triplosI' triplos["individuos"])? {if($triplos.text!=null)$ontologia.tripsI=$triplos.trips;else $ontologia.tripsI=new HashSet<>();}'.'
         ;

conceitos returns [Conceitos cncts]
        :'conceitos' '{' conceito["conceito"] {$conceitos.cncts=new Conceitos();
                                   
                                   $conceitos.cncts.add($conceito.cnct);
                                   }
                                 (','conceito["conceito"] {if($conceitos.cncts.conceitos.contains($conceito.cnct))
                                                   erros.add("ERRO: O conceito <"+$conceito.cnct.nome + "> ja existe");
                                               else if(!$conceitos.cncts.add($conceito.cnct)) erros.add("ERRO: Ja existe um conceito com o nome <"+$conceito.cnct.nome + ">");
                                               
                                               ;} )* '}' 
         ;

conceito[String contexto] returns [Conceito cnct]: TEXT {$conceito.cnct=new Conceito($TEXT.text,new HashMap<>());} atributos[$conceito.contexto,$conceito.cnct.atributos]?
        ;
atributos[String contexto,HashMap<String,String> atribs]: '[' atributo[$atributos.contexto,$atributos.atribs] (','atributo[$atributos.contexto,$atributos.atribs])* ']'
         ;

atributo[String contexto,HashMap<String,String> atribs]: t1=TEXT sep=(':'|'=') t2=TEXT {
                                                        if($atributo.contexto.equals("conceito") && $sep.text.equals("="))
                                                            erros.add("ERRO de sintaxe: na declaracao de conceitos deve-se usar dois pontos (':') para separar os atributos dos seus tipos" );
                                                        if($atributo.contexto.equals("triplo") && $sep.text.equals(":"))
                                                            erros.add("ERRO de sintaxe: na declaracao de triplos deve-se usar um igual ('=') para separar os atributos dos seus valores" );
                                                        $atributo.atribs.put($t1.text,$t2.text);}
                                                                ;

individuos returns [HashSet<String> indvds]
@init{$individuos.indvds=new HashSet<>();}
    :'individuos' '{' TEXT {$individuos.indvds.add($TEXT.text);}
    (','TEXT {if($individuos.indvds.contains($TEXT.text))
               erros.add("ERRO: Ja existe um individuo com nome <"+$TEXT.text + ">");
             else $individuos.indvds.add($TEXT.text);}
    )* '}' 
        ; 


relacoes returns [HashSet<String> rels]
@init{$relacoes.rels=new HashSet<>();
        $relacoes.rels.add("is-a");
        $relacoes.rels.add("iof");
        $relacoes.rels.add("pof");
}
    :'relacoes' '{' TEXT { $relacoes.rels.add($TEXT.text);}
    (','TEXT {if($relacoes.rels.contains($TEXT.text))
               erros.add("ERRO: Ja existe uma relacao com o nome <"+$TEXT.text + ">");
             else $relacoes.rels.add($TEXT.text);}
    )* '}' 
        ;

triplos[String contexto] returns[HashSet<Triplo> trips]
@init{
      $triplos.trips=new HashSet<>();
      }
    : '{' (triplo[$triplos.contexto]{
                       if(!$triplos.trips.contains($triplo.trip))
                            $triplos.trips.add($triplo.trip);
                       else erros.add("ERRO: Triplo repetido :: "+$triplo.trip.c1+" = "+$triplo.trip.rel+" => "+$triplo.trip.c2.nome);
                       }
           ';')* 
        '}'
        ;



triplo[String contexto] returns [Triplo trip]
    : c1=TEXT '=' rel=TEXT '=>' c2=conceito["triplo"] {if(contexto.equals("individuos") && $c2.cnct.atributos.size()>0)
                                                           erros.add("ERRO: nao podem ser usados atributos em relacoes entre dois individuos :: "+$c1.text + " = "+$rel.text+" => " + $c2.cnct.nome);
                                                       else $triplo.trip=new Triplo($c1.text,$rel.text,$c2.cnct);}
       ;



TEXT: ([-_a-zA-Z0-9.]+) | ('\"' ~('\"')* '\"');

NUM: '-'?[0-9]+;

Sep : [ \t\r\n]+ -> skip;

Comment : '%%'~('\n')*('\n'|EOF) -> skip;