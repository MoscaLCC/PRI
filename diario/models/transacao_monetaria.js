var mongoose = require("mongoose")
var Schema = mongoose.Schema

var SchemaTransacaoMonetaria= new Schema({

    userId :Schema.Types.ObjectId,
    titulo: {type: String , required: true, max: 100},
    descricao: {type: String , required: true, max: 100},
    data: {type: Date , required: true},
    privado: {type: Boolean , required: true},
    interveniente: {type: String, required:true},
    tipo: {type: String, required:true},
    comentarios:[{type: String}],
    keys:[{type: String}],
    montante:{type: String , required: true},
})

module.exports = mongoose.model('transacoesmonetarias',SchemaTransacaoMonetaria,'transacoesmonetarias')