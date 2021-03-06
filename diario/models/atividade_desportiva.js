var mongoose = require("mongoose")
var Schema = mongoose.Schema

var SchemaAtividadeDesportiva= new Schema({
    
    userId :Schema.Types.ObjectId,
    titulo: {type: String , required: true, max: 100},
    descricao: {type: String , required: true, max: 100},
    data: {type: Date , required: true},
    local: {type: String , required: false},
    privado: {type: Boolean , required: true},
    duracao: {type: String, required:true},
    desporto:{type: String , required: true},
    comentarios:[{type: String}],
    keys:[{type: String}],
    fotografia:{type: String , required: false}
})

module.exports = mongoose.model('atividadesdesportivas',SchemaAtividadeDesportiva)