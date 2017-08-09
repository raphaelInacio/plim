const restFul = require('node-restful')
const mongoose = restFul.mongoose

const endereco = new mongoose.Schema({
    rua: {
        type: String,
        require: true
    },
    numero: {
        type: Number,
        require: true,
        min: 0
    },
    complemento: {
        type: String,
        require: true
    },
    cep: {
        type: String,
        require: true
    },
    bairro: {
        type: String,
        require: true
    },
    cidade: {
        type: String,
        require: true
    },
    estado: {
        type: String,
        require: true
    }
})

const fornecedor = new mongoose.Schema({
    nome: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    telefone: {
        type: String,
        require: true
    },
    endereco: endereco
})

const carro = new mongoose.Schema({
    fabricante: {
        type: String,
        require: true
    },
    nome: {
        type: String,
        require: true
    },
    ano: {
        type: String,
        require: true
    }
})

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

const orcamento = new mongoose.Schema({
    valor: {
        type: Number,
        require: true,
        min: 0
    },
    descricao: {
        type: String,
        require: true
    },
    status: {
        type: String,
        require: true,
        uppercase: true,
        enum: ['APROVADO', 'EM_ANALISE', 'REPROVADO']
    },
    fornecedor: fornecedor
})

const cliente = new mongoose.Schema({
    nome: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    telefone: {
        type: String,
        require: true
    },
    carro: carro,
    endereco: endereco
})

const pedido = new mongoose.Schema({
    descricao: {
        type: String,
        require: true
    },
    dataPedido: {
        type: Date,
        default: Date.now
    },
    valor: {
        type: Number,
        require: true,
        min: 0
    },
    status: {
        type: String,
        require: true,
        uppercase: true,
        enum: ['ABERTO', 'FECHADO']
    },
    cliente: cliente,
    servicos: [servico],
    orcamentos: [orcamento]
})
module.exports = restFul.model('Pedido', pedido)