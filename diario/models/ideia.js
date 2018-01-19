var mongoose = require("mongoose")
var Schema = mongoose.Schema

var SchemaIdeia= new Schema({

    userId :Schema.Types.ObjectId,
    titulo: {type: String , required: true, max: 100},
    descricao: {type: String , required: true, max: 100},
    data: {type: Date , required: true},
    local: {type: String , required: false},
    privado: {type: Boolean , required: true},
})

module.exports = mongoose.model('ideias',SchemaIdeia,'ideias')