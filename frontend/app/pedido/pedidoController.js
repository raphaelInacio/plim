(function () {
    'use strict';

    angular
        .module('app')
        .controller('PedidoController', PedidoController);

    PedidoController.$inject = ['$http'];

    function PedidoController($http) {

        const vm = this;

        vm.list = true
        vm.view = false
        vm.form = false

        vm.obterPedidos = function () {
            const url = "http://localhost:3003/api/pedidos"
            $http.get(url).then(function (res) {
                console.log(res.data)
                vm.pedidos = res.data
            })
        }

        vm.editarPedido = function (pedido) {
            vm.view = false
            vm.list = false
            vm.form = true
            const url = `http://localhost:3003/api/pedidos/${pedido._id}`
            $http.get(url).then(function (res) {
                vm.pedido = res.data
            })
        }

        vm.excluirPedido = function (pedido) {
            vm.list = true
            vm.view = false
            vm.form = false
            const url = `http://localhost:3003/api/pedidos/${pedido._id}`
            $http.delete(url).then(function (res) {
                vm.pedido = res.data
            })
        }

        vm.visualizarPedido = function (pedido) {
            vm.view = true
            vm.list = false
            vm.form = false
            console.log(vm)
            const url = `http://localhost:3003/api/pedidos/${pedido._id}`
            $http.get(url).then(function (res) {
                vm.pedido = res.data
            })
        }

        vm.cancelar = function () {
            vm.list = true
            vm.form = false
        }

        init();

        function init() {
            vm.obterPedidos()
        }
    }
})();