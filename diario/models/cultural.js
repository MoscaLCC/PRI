var mongoose = require("mongoose")
var Schema = mongoose.Schema

var SchemaCultural= new Schema({

    userId :Schema.Types.ObjectId,
    titulo: {type: String , required: true, max: 100},
    descricao: {type: String , required: true, max: 100},
    data: {type: Date , required: true},
    local: {type: String , required: false},
    privado: {type: Boolean , required: true},
    tipo: {type: String, required:true},
    fotografias:[{type: String}]
})

module.exports = mongoose.model('culturais',SchemaCultural,'cultural')