var mongoose = require("mongoose")
var Schema = mongoose.Schema

var SchemaViagem= new Schema({

    userId :Schema.Types.ObjectId,
    titulo: {type: String , required: true, max: 100},
    descricao: {type: String , required: true, max: 100},
    data:{type:Date, required:true},
    datainicio: {type: Date , required: true},
    datafim: {type: Date , required: true},
    local: {type: String , required: false},
    privado: {type: Boolean , required: true},
    comentarios:[{type: String}],
    keys:[{type: String}],
    acompanhantes:[{type: String}],
    fotografias:[{type: String}]
})

module.exports = mongoose.model('viagens',SchemaViagem)