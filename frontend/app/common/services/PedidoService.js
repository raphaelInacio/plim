(function () {
    'use strict';

    angular
        .module('app')
        .service('PedidoService', PedidoService);

    PedidoService.$inject = ['$http'];

    function PedidoService($http) {

        const _url = `http://localhost:3003/api/pedidos`

        const _criarPedido = function (pedido, cb) {
            $http.post(_url, pedido).then(function (res) {
                cb(res.data);
            });
        };

        const _atualizarPedido = function (pedido, cb) {
            $http.put(_url, pedido).then(function (res) {
                cb(res.data);
            });
        };

        const _obterPedido = function (id, cb) {
            $http.get(`${_url}/${id}`).then(function (res) {
                cb(res.data);
            });
        };

        const _excluirPedido = function (id, cb) {
            $http.delete(`${_url}/${id}`).then(function (res) {
                cb(res.data);
            });
        };

        const _listarPedidos = function (cb) {
            $http.get(_url).then(function (res) {
                cb(res.data);
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