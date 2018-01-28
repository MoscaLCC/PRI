var mongoose = require("mongoose")
var Schema = mongoose.Schema

var SchemaAlbumFotografico= new Schema({

    userId :Schema.Types.ObjectId,
    titulo: {type: String , required: true, max: 100},
    descricao: {type: String , required: true, max: 100},
    data: {type: Date , required: true},
    local: {type: String , required: false},
    privado: {type: Boolean , required: true},
    comentarios:[{type: String}],
    keys:[{type: String}],
    fotografias:[
                    {
                        nome: {type: String},
                        descricao: {type: String},
                        pessoas: [{type:String}]
                    }
                ]
})

module.exports = mongoose.model('albunsfotograficos',SchemaAlbumFotografico,'albunsfotograficos')