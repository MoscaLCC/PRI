var mongoose = require("mongoose")
var Schema = mongoose.Schema

var SchemaEvento= new Schema({

    userId :Schema.Types.ObjectId,
    titulo: {type: String , required: true, max: 100},
    descricao: {type: String , required: true, max: 100},
    data: {type: Date , required: true},
    local: {type: String , required: false},
    dataevento: {type: String},
    comentarios:[{type: String}],
    keys:[{type: String}],
    privado: {type: Boolean , required: true},
})

module.exports = mongoose.model('eventos',SchemaEvento)