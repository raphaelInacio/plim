(function () {
    'use strict';

    angular
        .module('app')
        .service('PedidoService', PedidoService);

    PedidoService.$inject = ['$http', 'MessageFactory'];

    function PedidoService($http, MessageFactory) {
        const self = this;
        self.messages = MessageFactory; 
        const _url = `http://localhost:3003/api/pedidos`

        const _criarPedido = function (pedido, cb) {
            $http.post(_url, pedido).then(function (res) {
                self.messages.addSuccess('Pedido criado com sucesso!');
                cb(res.data);
            }, function (reason) {
                self.msgs.addErrors(reason.data)
            });
        };

        const _atualizarPedido = function (pedido, cb) {
            $http.put(`${_url}/${pedido._id}`, pedido).then(function (res) {
                self.messages.addSuccess('Pedido atualizado com sucesso!');
                cb(res.data);
            }, function (reason) {
                self.msgs.addErrors(reason.data)
            });
        };

        const _obterPedido = function (id, cb) {
            $http.get(`${_url}/${id}`).then(function (res) {
                cb(res.data);
            }, function (reason) {
                self.msgs.addErrors(reason.data)
            });
        };

        const _excluirPedido = function (id, cb) {
            $http.delete(`${_url}/${id}`).then(function (res) {
                self.messages.addSuccess('Pedido cancelado com sucesso!');
                cb(res.data);
            }, function (reason) {
                self.msgs.addErrors(reason.data)
            });
        };

        const _listarPedidos = function (cb) {
            $http.get(_url).then(function (res) {
                cb(res.data);
            }, function (reason) {
                self.msgs.addErrors(reason.data)
            });
        };

        this.service = {
            criarPedido: _criarPedido,
            obterPedido: _obterPedido,
            listarPedidos: _listarPedidos,
            excluirPedido: _excluirPedido,
            atualizarPedido: _atualizarPedido
        };
    }
})();