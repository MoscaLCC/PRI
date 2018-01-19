var mongoose = require("mongoose")
var Schema = mongoose.Schema

var SchemaViagem= new Schema({

    userId :Schema.Types.ObjectId,
    titulo: {type: String , required: true, max: 100},
    descricao: {type: String , required: true, max: 100},
    datainicio: {type: Date , required: true},
    datafim: {type: Date , required: true},
    local: {type: String , required: false},
    privado: {type: Boolean , required: true},
    acompanhantes:[{type: String}],
    album:[{type: String}]
})

module.exports = mongoose.model('viagens',SchemaViagem)