/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

grammar importacao;

@members{
       String output="";
}

importacao
@after{
       System.out.println(output);
}   : (tipoEvento ':' eventos ';' {output+=";";})+
       ;

tipoEvento : t='"Atividade Desportiva"' {output+=$t.text;}
            | t='"Trabalho Académico"' {output+=$t.text;}
            | t='"Receita Culinária"' {output+=$t.text;}
            | t='"Transação Monetária"' {output+=$t.text;}
            | t='"Álbum Fotográfico"' {output+=$t.text;}
            | t='"Viagem"' {output+=$t.text;} | t='Viagem' {output+=$t.text;}
            | t='"Cultural"' {output+=$t.text;} | t='Cultural' {output+=$t.text;}
            | t='"Ideia"' {output+=$t.text;} | t='Ideia' {output+=$t.text;}
            | t='"Pensamento"' {output+=$t.text;} | t='Pensamento' {output+=$t.text;}
            | t='"Cronica"' {output+=$t.text;} | t='Cronica' {output+=$t.text;}
            | t='"Evento"' {output+=$t.text;} | t='Evento' {output+=$t.text;}

           ;

eventos : evento (','evento )*;

evento: '(' {output+="{";} atributo (','{output+=",";} atributo)*  ')' {output+="\n}";} ;

atributo: nomeAtributo {output+="\n\t"+$nomeAtributo.text;} ':' {output+=":";} valorAtributo {output+=$valorAtributo.text;} ;

nomeAtributo: IDENT;

valorAtributo: IDENT|STRING|DATA
             | '['{output+="[";} STRING?{if($STRING.text!=null) output+=$STRING.text;} (',' STRING {output+=", "+$STRING.text;})*']' {output+="]";};

IDENT: [a-zA-Z0-9]+;

STRING: '"' ~('"')* '"';

DATA: DIGITO DIGITO DIGITO DIGITO '-' DIGITO DIGITO '-'DIGITO DIGITO;

DIGITO: [0-9] ;

WS : [ \t\r\n]+ -> skip;
