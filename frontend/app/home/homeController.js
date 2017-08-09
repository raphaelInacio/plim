(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$http','PedidoService'];

    function HomeController($http, PedidoService) {

        const vm = this;
        vm.view = false;
        vm.pedidoService = PedidoService.service;

        vm.visualizarPedido = function () {
            vm.view = true
            vm.pedidoService.listarPedidos((res) => {
                let tamanho = res.length;
                if(tamanho > 0){
                    vm.pedido = res[tamanho - 1];
                } else {
                    vm.view = false;
                }
            })
        }

        vm.aprovar = function (orcamento) {
            orcamento.status = 'APROVADO'
            vm.pedido.orcamento = orcamento
        }

        vm.reprovar = function (orcamento) {
            orcamento.status = 'REPROVADO'
            vm.pedido.orcamento = orcamento
        }

        vm.cancelar = function () {
            vm.list = true
            vm.form = false
        }

        init();

        function init() {
            vm.visualizarPedido()
        }
    }
})();