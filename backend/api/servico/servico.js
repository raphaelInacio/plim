const restFul = require('node-restful')
const mongoose = restFul.mongoose

const servico = new mongoose.Schema({
    nome: {
        type: String,
        require: true
    },
    descricao: {
        type: String,
        require: true
    },
    valor: {
        type: Number,
        require: true,
        min: 0
    },
})


module.exports = restFul.model('Servico', servico)