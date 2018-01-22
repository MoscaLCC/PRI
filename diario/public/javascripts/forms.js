function addfile() {
    var numFiles = $('#ficheiros').children().length +1
    if(numFiles > 6){ alert("Impossível adicionar, é impossível carregar mais que 6 ficheiros!!");}
    else{
        var nomeador = "ficheiro" + numFiles
        $("#ficheiros").append('<input type="file" name="'+ nomeador + '" id="'+nomeador+'" class="w3-input w3-border"/>')
    }
}
function rmfile() {
    var numFiles = $('#ficheiros').children().length
    if(numFiles<=1){ alert("Impossivel remover, é necessário carregar pelo menos um ficheiro!!")}
    else {
        var nomeador = "#ficheiro" + numFiles
        $(nomeador).remove()
    }
}
function addop(node) {
    var numOps = $('#'+node + 'opcoes').children().length +1 
    if(numOps > 15){ alert("Impossível Aadicionar, é impossível carregar mais que 15 opções!!"); }
    else{
        var nomeador = node + "opcao" + numOps
        var selector = '#'+ node +'opcoes'
        $(selector).append("<input type='text' name='" + nomeador + "' id='" + nomeador + "' class='w3-input w3-border'/>")
    }
}
function rmop(node) {
    var numOps = $('#'+node + 'opcoes').children().length
    if(numOps<=1){ alert("Impossivel remover, é necessario carregar pelo menos 1 opção!!")}
    else {
        var nomeador = "#"+ node + 'opcoes'
        $(nomeador).children().last().remove()
    }
}
function addFoto() {
    var numFotos = $(".fotoContainer").length +1
    if(numFotos > 15){ alert("Impossivel Adicionar, é impossivel carregar mais que 15 fotos!!");}
    else{
        var nomeador = "foto" + numFotos
    $('#fotos').append(`
    <div class="fotoContainer">
        <label class="w3-text-grey">Foto</label>
        <input type="file" name="` + nomeador + `" id="` + nomeador + `" class="w3-input w3-border"/>
        <p>
            <label class="w3-text-grey">Nome</label>
            <input class="w3-input w3-border" type="text" id="nome` + nomeador + `" name="nome` + nomeador + `" placeholder="Nome"/>
        </p>
        <p>
            <label class="w3-text-grey">*Descricao</label>
            <input class="w3-input w3-border" type="text" id="descricao` + nomeador + `" name="descricao" `+nomeador+`" placeholder="Descrição"/>
        </p>
        <p>
            <label class="w3-text-grey">Local</label>
            <input class="w3-input w3-border" type="text" id="local` + nomeador +`'" name="local`+nomeador+`" placeholder="Local"/>
        </p>
        <p>
            <label class="w3-text-grey">Pessoas</label>
            <div id="`+nomeador+`opcoes">
                <input class="w3-input w3-border" type="text" id="`+ nomeador + `opcao1" name="`+nomeador+`opcao1"/>
            </div>
            <input type="button" onclick="addop('`+nomeador+`')" value="Adicionar"/>
            <input type="button" onclick="rmop('`+nomeador+`')" value="Remover"/> 
        </p>
    </div>`)
    }
}

function rmFoto() {
    var numFotos = $(".fotoContainer").length
    if(numFotos<=1){ alert("Impossível remover, é necessário carregar pelo menos uma fotografia!!")}
    else {
        $(".fotoContainer").last().remove()
    }
}

//form para Actividade Desportiva
function atividadeDesportiva(){
    document.getElementById('divOps').innerHTML=`
<div style="width:100%;">
<form class="w3-container" action="/registarAct" method="post" enctype="multipart/form-data" id="forms">
    
    <p>
        <label class="w3-text-grey">*Título</label>
        <input class="w3-input w3-border" type="text" id="titulo" name="titulo" placeholder="Título"/>
    </p>
    <p>
        <label class="w3-text-grey">*Descrição</label>
        <input class="w3-input w3-border" type="text" id="descricao" name="descricao" placeholder="Descrição"/>
    </p>
    <p>
        <label class="w3-text-grey">Local</label>
        <input class="w3-input w3-border" type="text" id="local" name="local" placeholder="Local"/>
    </p>
    <p>
        <label class="w3-text-grey">*Duração</label>
        <input class="w3-input w3-border" type="number" id="duracao" name="duracao" placeholder="Duração" min="0"/>
    </p>
    <p>
        <label class="w3-text-grey">Desporto</label>
        <select class="w3-input w3-border" id="desporto" name="desporto" placeholder="Desporto">
            <option name="desporto" id="Futebol" value="Futebol">Futebol</option>
            <option name="desporto" id="Natação" value="Natação">Natação</option>
        </select>
    </p>
    <p>
        <label class="w3-text-grey">Fotografia</label>
        <input class="w3-input w3-border" type="file" id="fotografia" name="fotografia"/>
    </p>
    <p>
        <label class="w3-text-grey">Privado     <input class="w3-check w3-text-white" type="checkbox" id="privado" name="privado" placeholder="Privado"/>
        </label>
    </p>
    <p class="w3-text-white">
        <input class="w3-btn w3-teal w3-round" type="submit" value="Registar Atividade Desportiva"/>
    </p>
</form>
<script>
    
</script>
</div>
    `
}
//form para trabalho academico
function trabalhoAcademico(){
    document.getElementById('divOps').innerHTML=`
<div style="width:100%;">
<form class="w3-container" action="/registarTrabalho" method="post" enctype="multipart/form-data" id="forms">
    <p>
        <label class="w3-text-grey">*Título</label>
        <input class="w3-input w3-border" type="text" id="titulo" name="titulo" placeholder="Título"/>
    </p>
    <p>
        <label class="w3-text-grey">*Descrição</label>
        <input class="w3-input w3-border" type="text" id="descricao" name="descricao" placeholder="Descrição"/>
    </p>
    <p>
        <label class="w3-text-grey">Local</label>
        <input class="w3-input w3-border" type="text" id="local" name="local" placeholder="Local"/>
    </p>
    <p>
        <label class="w3-text-grey">Nome da UC</label>
        <input class="w3-input w3-border" type="text" id="uc" name="uc" placeholder="Nome da UC"/>
    </p>
    <p>
        <label class="w3-text-grey">*Docente</label>
        <input class="w3-input w3-border" type="text" id="docente" name="docente" placeholder="Nome do Docente"/>
    </p>
    <p>
        <label class="w3-text-grey">Resultado</label>
        <input class="w3-input w3-border" type="number" id="resultado" name="resultado" placeholder="Resultado"/>
    </p>
    <p>
        <label class="w3-text-grey">Ficheiro</label>
        <div id="ficheiros">
            <input class="w3-input w3-border" type="file" id="ficheiro1" name="ficheiro1"/>
        </div>
        <input type="button" onclick="addfile()" value="Adicionar"/>
        <input type="button" onclick="rmfile()" value="Remover"/>
    </p>
    <p>
        <label class="w3-text-grey">Privado
        <input class="w3-check w3-text-white" type="checkbox" id="privado" name="privado" placeholder="Privado"/>
        </label>
    </p>
    <p class="w3-text-white">
        <input class="w3-btn w3-teal w3-round" type="submit" value="Registar Trabalho Académico"/>
    </p>
</form>
<script>
    
</script>
</div>
    `
}
//form para Cultural
function aCultural(){
    document.getElementById('divOps').innerHTML=`
<div style="width:100%;">
<form class="w3-container" action="/registarCultural" method="post" enctype="multipart/form-data" id="forms">
    <p>
        <label class="w3-text-grey">*Título</label>
        <input class="w3-input w3-border" type="text" id="titulo" name="titulo" placeholder="Título"/>
    </p>
    <p>
        <label class="w3-text-grey">*Descrição</label>
        <input class="w3-input w3-border" type="text" id="descricao" name="descricao" placeholder="Descrição"/>
    </p>
    <p>
        <label class="w3-text-grey">Local</label>
        <input class="w3-input w3-border" type="text" id="local" name="local" placeholder="Local"/>
    </p>
    <p>
        <label class="w3-text-grey">Tipo</label>
        <select class="w3-input w3-border" id="tipo" name="tipo" placeholder="Tipo">
            <option name="tipo" id="cinema" value="cinema">Cinema</option>
            <option name="tipo" id="musica" value="musica">Musica</option>
            <option name="tipo" id="teatro" value="teatro">Teatro</option>
            <option name="tipo" id="Historia" value="hostoria">História</option>
            <option name="tipo" id="Pintura" value="pintura">Pintura</option>         
            <option name="tipo" id="Arte" value="arte">Arte</option>
        </select>
    </p>
    <p>
        <label class="w3-text-grey">Fotografias</label>
        <div id="ficheiros">
            <input class="w3-input w3-border" type="file" id="ficheiro1" name="ficheiro1"/>
        </div>
        <input type="button" onclick='addfile()' value="Adicionar"/>
        <input type="button" onclick='rmfile()' value="Remover"/>
    </p>
    <p>
        <label class="w3-text-grey">Privado     <input class="w3-check w3-text-white" type="checkbox" id="privado" name="privado" placeholder="Privado"/>
        </label>
    </p>
    <p class="w3-text-white">
        <input class="w3-btn w3-teal w3-round" type="submit" value="Registar Atividade Cultural"/>
    </p>
</form>
<script>
    
</script>
</div>
    `
}
//form para Ideia
function aIdeia(){
    document.getElementById('divOps').innerHTML=`
<div style="width:100%;">
<form class="w3-container" action="/registarIdeia" method="post" enctype="multipart/form-data" id="forms">
    <p>
        <label class="w3-text-grey">*Título</label>
        <input class="w3-input w3-border" type="text" id="titulo" name="titulo" placeholder="Título"/>
    </p>
    <p>
        <label class="w3-text-grey">*Descrição</label>
        <input class="w3-input w3-border" type="text" id="descricao" name="descricao" placeholder="Descrição"/>
    </p>
    <p>
        <label class="w3-text-grey">Local</label>
        <input class="w3-input w3-border" type="text" id="local" name="local" placeholder="Local"/>
    </p>
    <p>
        <label class="w3-text-grey">Privado     <input class="w3-check w3-text-white" type="checkbox" id="privado" name="privado" placeholder="Privado"/>
        </label>
    </p>
    <p class="w3-text-white">
        <input class="w3-btn w3-teal w3-round" type="submit" value="Registar Ideia"/>
    </p>
</form>
<script>
    
</script>
</div>
    `
}
//form para Pensamento
function aPensamento(){
    document.getElementById('divOps').innerHTML=`
<div style="width:100%;">
<form class="w3-container" action="/registarPensamento" method="post" enctype="multipart/form-data" id="forms">
    <p>
        <label class="w3-text-grey">*Título</label>
        <input class="w3-input w3-border" type="text" id="titulo" name="titulo" placeholder="Título"/>
    </p>
    <p>
        <label class="w3-text-grey">*Descrição</label>
        <input class="w3-input w3-border" type="text" id="descricao" name="descricao" placeholder="Descrição"/>
    </p>
    <p>
        <label class="w3-text-grey">Local</label>
        <input class="w3-input w3-border" type="text" id="local" name="local" placeholder="Local"/>
    </p>
    <p>
        <label class="w3-text-grey">Privado     <input class="w3-check w3-text-white" type="checkbox" id="privado" name="privado" placeholder="Privado"/>
        </label>
    </p>
    <p class="w3-text-white">
        <input class="w3-btn w3-teal w3-round" type="submit" value="Registar Pensamento"/>
    </p>
</form>
<script>
    
</script>
</div>
    `
}
//form para Crónica
function aCronica(){
    document.getElementById('divOps').innerHTML=`
<div style="width:100%;">
<form class="w3-container" action="/registarCronica" method="post" enctype="multipart/form-data" id="forms">
    <p>
        <label class="w3-text-grey">*Título</label>
        <input class="w3-input w3-border" type="text" id="titulo" name="titulo" placeholder="Título"/>
    </p>
    <p>
        <label class="w3-text-grey">*Descrição</label>
        <input class="w3-input w3-border" type="text" id="descricao" name="descricao" placeholder="Descrição"/>
    </p>
    <p>
        <label class="w3-text-grey">Local</label>
        <input class="w3-input w3-border" type="text" id="local" name="local" placeholder="Local"/>
    </p>
    <p>
        <label class="w3-text-grey">Ficheiros</label>
        <div id="ficheiros">
            <input class="w3-input w3-border" type="file" id="ficheiro1" name="ficheiro1"/>
        </div>
        <input type="button" onclick='addfile()' value="Adicionar"/>
        <input type="button" onclick='rmfile()' value="Remover"/>
    </p>
    <p>
        <label class="w3-text-grey">Privado     <input class="w3-check w3-text-white" type="checkbox" id="privado" name="privado" placeholder="Privado"/>
        </label>
    </p>
    <p class="w3-text-white">
        <input class="w3-btn w3-teal w3-round" type="submit" value="Registar Crónica"/>
    </p>
</form>
<script>
    
</script>
</div>
    `
}
//form para Receita Culinaria
function receitaCulinaria(){
    document.getElementById('divOps').innerHTML=`
<div style="width:100%;">
<form class="w3-container" action="/registarReceita" method="post" enctype="multipart/form-data" id="forms">
    <p>
        <label class="w3-text-grey">*Título</label>
        <input class="w3-input w3-border" type="text" id="titulo" name="titulo" placeholder="Título"/>
    </p>
    
    <p>
        <label class="w3-text-grey">*Descrição</label>
        <input class="w3-input w3-border" type="text" id="descricao" name="descricao" placeholder="Descrição"/>
    </p>
    <p>
        <label class="w3-text-grey">Ingredientes</label>
        <div id="opcoes">
            <input class="w3-input w3-border" type="text" id="opcao1" name="opcao1"/>
        </div>
        <input type="button" onclick='addop("")' value="Adicionar"/>
        <input type="button" onclick='rmop("")' value="Remover"/>
    </p>
    <p>
        <label class="w3-text-grey">Privado     <input class="w3-check w3-text-white" type="checkbox" id="privado" name="privado" placeholder="Privado"/>
        </label>
    </p>
    <p class="w3-text-white">
        <input class="w3-btn w3-teal w3-round" type="submit" value="Registar Receita Culinária"/>
    </p>
</form>
<script>
    
</script>
</div>
    `
}
//form para Evento
function aEvento(){
    document.getElementById('divOps').innerHTML=`
<div style="width:100%;">
<form class="w3-container" action="/registarEve" method="post" enctype="multipart/form-data" id="forms">
    <p>
        <label class="w3-text-grey">*Título</label>
        <input class="w3-input w3-border" type="text" id="titulo" name="titulo" placeholder="Título"/>
    </p>
    
    <p>
        <label class="w3-text-grey">*Descrição</label>
        <input class="w3-input w3-border" type="text" id="descricao" name="descricao" placeholder="Descrição"/>
    </p>
    <p>
        <label class="w3-text-grey">Local</label>
        <input class="w3-input w3-border" type="text" id="local" name="local" placeholder="Local"/>
    </p>
    <p>
        <label class="w3-text-grey">Privado     <input class="w3-check w3-text-white" type="checkbox" id="privado" name="privado" placeholder="Privado"/>
        </label>
    </p>
    <p class="w3-text-white">
        <input class="w3-btn w3-teal w3-round" type="submit" value="Registar Evento"/>
    </p>
</form>
<script>
    
</script>
</div>
    `
}

//form para transacaoMonetaria
function transacaoMonetaria(){
    document.getElementById('divOps').innerHTML=`
<div style="width:100%;">
<form class="w3-container" action="/registarTransacao" method="post" enctype="multipart/form-data" id="forms">
    <p>
        <label class="w3-text-grey">*Título</label>
        <input class="w3-input w3-border" type="text" id="titulo" name="titulo" placeholder="Título"/>
    </p>
    <p>
        <label class="w3-text-grey">*Descrição</label>
        <input class="w3-input w3-border" type="text" id="descricao" name="descricao" placeholder="Descrição"/>
    </p>    
    <p>
        <label class="w3-text-grey">Tipo</label>
        <select class="w3-input w3-border" id="tipo" name="tipo" placeholder="Tipo">
            <option name="tipo" id="credito" value="credito">Credito</option>
            <option name="tipo" id="debito" value="debito">Debito</option>
        </select>
    </p>
    <p>
        <label class="w3-text-grey">Montante</label>
        <input class="w3-input w3-border" type="number" id="montante" name="montante" placeholder="Montante"/>
    </p>
    <p>
        <label class="w3-text-grey">Interveniente</label>
        <input class="w3-input w3-border" type="text" id="interveniente" name="interveniente" placeholder="Interveniente"/>
    </p>
    <p>
        <label class="w3-text-grey">Privado     <input class="w3-check w3-text-white" type="checkbox" id="privado" name="privado" placeholder="Privado"/>
        </label>
    </p>
    <p class="w3-text-white">
        <input class="w3-btn w3-teal w3-round" type="submit" value="Registar Transação"/>
    </p>
</form>
<script>
    
</script>
</div>
    `
}

//form para album Fotografico
function albumFotografico(){
    document.getElementById('divOps').innerHTML=`
<div style="width:100%;">
<form class="w3-container" action="/registarAlbum" method="post" enctype="multipart/form-data" id="forms">
    <p>
        <label class="w3-text-grey">*Título</label>
        <input class="w3-input w3-border" type="text" id="titulo" name="titulo" placeholder="Título"/>
    </p>
    <p>
        <label class="w3-text-grey">*Descrição</label>
        <input class="w3-input w3-border" type="text" id="descricao" name="descricao" placeholder="Descrição"/>
    </p>
    <div id="fotos">
        <div class="fotoContainer">
            <label class='w3-text-grey'>Foto</label>
            <input type="file" name='foto1' id='foto1' class='w3-input w3-border'/>
            <p>
                <label class='w3-text-grey'>Nome</label>
                <input class='w3-input w3-border' type='text' id='nomefoto1' name='nomefoto1' placeholder='Nome'/>
            </p>
            <p>
                <label class='w3-text-grey'>*Descricao</label>
                <input class='w3-input w3-border' type='text' id='descricaofoto1'name='descricaofoto1' placeholder='Descrição'/>
            </p>
            <p>
                <label class='w3-text-grey'>Local</label>
                <input class='w3-input w3-border' type='text' id='localfoto1'name='localfoto1' placeholder='Local'/>
            </p>
            <p>
                <label class='w3-text-grey'>Pessoas</label>
                <div id='foto1opcoes'>
                    <input class='w3-input w3-border' type='text' id='foto1opcao1' name='foto1opcao1'/>
                </div>
                <input type="button" onclick="addop('foto1')" value="Adicionar"/>
                <input type="button" onclick="rmop('foto1')" value="Remover"/>
            </p>
        </div>
        
    </div>
    <input type="button" onclick="addFoto()" value="Adicionar fotografia"/>
    <input type="button" onclick="rmFoto()" value="Remover fotografia"/>
    <p>
        <label class="w3-text-grey">Privado     <input class="w3-check w3-text-white" type="checkbox" id="privado" name="privado" placeholder="Privado"/>
        </label>
    </p>
    <p class="w3-text-white">
        <input class="w3-btn w3-teal w3-round" type="submit" value="Registar Álbum"/>
    </p>
</form>
<script>
    
</script>
</div>
    `
}

//form para Viagem
function aViagem(){
    document.getElementById('divOps').innerHTML=`
<div style="width:100%;">
<form class="w3-container" action="/registarViagem" method="post" enctype="multipart/form-data" id="forms">
    <p>
        <label class="w3-text-grey">*Título</label>
        <input class="w3-input w3-border" type="text" id="titulo" name="titulo" placeholder="Título"/>
    </p>
    <p>
        <label class="w3-text-grey">*Descrição</label>
        <input class="w3-input w3-border" type="text" id="descricao" name="descricao" placeholder="Descrição"/>
    </p>
    <p>
        <label class="w3-text-grey">Data Inicio</label>
        <input class="w3-input w3-border" type="date" id="datainicio" name="datainicio" onload="this.valueAsDate = new Date();" value=""/>
    </p>
        <p>
        <label class="w3-text-grey">Data Fim</label>
        <input class="w3-input w3-border" type="date" id="datafim" name="datafim" onload="this.valueAsDate = new Date();" value=""/>
    </p>
    <p>
        <label class="w3-text-grey">Local</label>
        <input class="w3-input w3-border" type="text" id="local" name="local" placeholder="Local"/>
    </p>
      <p>
        <label class="w3-text-grey">Acompanhantes</label>
        <div id="opcoes">
            <input class="w3-input w3-border" type="text" id="opcao1" name="opcao1"/>
        </div>
        <input type="button" onclick='addop("")' value="Adicionar"/>
        <input type="button" onclick='rmop("")' value="Remover"/>
    </p>
    <p>
        <label class="w3-text-grey">Fotografias</label>
        <div id="ficheiros" name="ficheiros">
            <input class="w3-input w3-border" type="file" id="ficheiro1" name="ficheiro1"/>
        </div>
        </br>
        </hr>
        <input type="button" onclick='addfile()' value="Adicionar"/>
        <input type="button" onclick='rmfile()' value="Remover"/>
    </p>
    <p>
        <label class="w3-text-grey">Privado     <input class="w3-check w3-text-white" type="checkbox" id="privado" name="privado" placeholder="Privado"/>
        </label>
    </p>
    <p class="w3-text-white">
        <input class="w3-btn w3-teal w3-round" type="submit" value="Registar Pensamento"/>
    </p>
</form>
<script>
    
</script>
</div>
    `
}



