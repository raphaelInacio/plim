const express = require('express')

module.exports = function (server) {
    const router = express.Router()
    server.use('/api', router)
    const pedidoService = require('../api/pedido/pedidoService')
    const servicoService = require('../api/servico/servicoService')
    servicoService.register(router, '/servicos')
    pedidoService.register(router, '/pedidos')
}