
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
                             default:
                                erros.add("ERRO: foi definido um atributo com tipo <"+aux.atributos.get(atrib)+">, mas mas este tipo n�o � suportado :: "+triplo);
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
                                default:
                                   erros.add("ERRO: foi definido um atributo com tipo <"+aux.atributos.get(atrib)+">, mas mas este tipo n�o � suportado :: "+triplo);
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
            for(Triplo t : $ontologia.tripsM){
                if(t.c2.nome.equals("utilizador")){
                    System.out.println("->> "+t.c2.atributos.get("username"));
                }
            }
           
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



TEXT: ([-_a-zA-Z0-9.]+) | ('"' ~('"')* '"');

NUM: '-'?[0-9]+;

Sep : [ \t\r\n]+ -> skip;

Comment : '%%'~('\n')*('\n'|EOF) -> skip;