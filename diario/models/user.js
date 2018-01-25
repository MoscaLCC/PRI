var mongoose = require("mongoose")

var Schema = mongoose.Schema

var SchemaUser= new Schema({
    username: {type: String , required: true, max: 100},
    password: {type: String , required: true, max: 100},
    dataNascimento: {type: Date , required: true},
    email: {type: String , required: true},
    pnome: {type: String , required: true},
    unome: {type: String, required:true},
    sexo:  {type: String, required:true},
    foto: {type: String , required: false}
})

module.exports = mongoose.model('users',SchemaUser)