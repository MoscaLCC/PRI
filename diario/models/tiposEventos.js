var mongoose = require("mongoose")

var Schema = mongoose.Schema

var SchemaTiposEventos= new Schema({
    nome: {type: String , required: true, max: 100}
})

module.exports = mongoose.model('tiposEventos',SchemaTiposEventos,'tiposEventos')