var mongoose = require("mongoose")
var Schema = mongoose.Schema

var SchemaPensamento= new Schema({

    userId :Schema.Types.ObjectId,
    titulo: {type: String , required: true, max: 100},
    descricao: {type: String , required: true, max: 100},
    data: {type: Date , required: true},
    local: {type: String , required: false},
    privado: {type: Boolean , required: true},
})

module.exports = mongoose.model('pensamentos',SchemaPensamento)