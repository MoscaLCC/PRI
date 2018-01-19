var mongoose = require("mongoose")
var Schema = mongoose.Schema

var SchemaTrabalhoAcademico= new Schema({

    userId :Schema.Types.ObjectId,
    titulo: {type: String , required: true, max: 100},
    descricao: {type: String , required: true, max: 100},
    data: {type: Date , required: true},
    local: {type: String , required: false},
    privado: {type: Boolean , required: true},
    uc: {type: String, required:true},
    docente:{type: String},
    resultado:{type: String , required: true},
    ficheiros:[{type: String}]
})

module.exports = mongoose.model('trabalhosacademicos',SchemaTrabalhoAcademico,'trabalhosacademicos')