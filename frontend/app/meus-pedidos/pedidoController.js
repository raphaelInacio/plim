(function () {
    'use strict';

    angular
        .module('app')
        .controller('PedidoController', PedidoController);

    PedidoController.$inject = ['$http', 'PedidoService'];

    function PedidoController($http, PedidoService) {

        const vm = this;
        vm.pedidoService = PedidoService.service;

        vm.factoryView = function (list, view, form) {
            vm.list = list;
            vm.view = view;
            vm.form = form;
        };

        vm.obterPedidos = function () {
            vm.pedidoService.listarPedidos((res) => {
                if (res.length > 0) {
                    vm.pedidos = res;
                } else {
                    vm.list = false;
                }
            });
        };

        vm.editarPedido = function (pedido) {
            vm.factoryView(false, false, true);
            vm.pedidoService.atualizarPedido(pedido, (res) => {
                vm.pedido = res;
            });
        };

        vm.excluirPedido = function (pedido) {
            vm.factoryView(true, false, false);
            vm.pedidoService.excluirPedido(pedido._id, (res) => {
                vm.obterPedidos();
            });
        };

        vm.visualizarPedido = function (pedido) {
            vm.factoryView(false, true, false);
            console.log(pedido)
            vm.pedidoService.obterPedido(pedido._id, (res) => {
                vm.pedido = res;
            });
        };

        vm.cancelar = function () {
            vm.list = true;
            vm.form = false;
        };


        function init() {
            vm.obterPedidos();
            vm.factoryView(true, false, false);
        }

        init();
    }
})();