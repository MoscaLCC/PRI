var mongoose = require("mongoose")
var Schema = mongoose.Schema

var SchemaCronica= new Schema({

    userId :Schema.Types.ObjectId,
    titulo: {type: String , required: true, max: 100},
    descricao: {type: String , required: true, max: 100},
    data: {type: Date , required: true},
    local: {type: String , required: false},
    privado: {type: Boolean , required: true},
    comentarios:[{type: String}],
    keys:[{type: String}],
    ficheiros:[{type: String}]
})

module.exports = mongoose.model('cronicas',SchemaCronica,'cronicas')