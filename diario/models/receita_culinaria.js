var mongoose = require("mongoose")
var Schema = mongoose.Schema

var SchemaReceitaCulinaria= new Schema({

    userId :Schema.Types.ObjectId,
    titulo: {type: String , required: true, max: 100},
    descricao: {type: String , required: true, max: 100},
    data: {type: Date , required: true},
    privado: {type: Boolean , required: true},
    ingredientes:[{type: String}]
})

module.exports = mongoose.model('receitasculinarias',SchemaReceitaCulinaria,'receitasculinarias')