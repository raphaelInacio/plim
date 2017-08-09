(function () {
    'use strict';

    angular
        .module('app')
        .controller('NovoController', NovoController);

    NovoController.$inject = ['$http', 'ServicoService', 'CarroService', 'PedidoService', 'MessageFactory', 'PedidoFactory'];

    function NovoController($http, ServicoService, CarroService, PedidoService, MessageFactory, PedidoFactory) {

        const vm = this;
        vm.view = true;
        vm.list = false;
        vm.form = false;
        vm.modeloStatus = true;
        vm.anoStatus = true;
        vm.confirmar = true;
        vm.finalizar = false;
        vm.edit = false;
        vm.pedido = PedidoFactory;
        vm.pedido.servicos = []
        vm.carro = {
            fabricante: "",
            modelo: "",
            ano: ""
        };

        vm.carroService = CarroService.service;
        vm.servicoService = ServicoService.service;
        vm.pedidoService = PedidoService.service;
        vm.messageFactory = MessageFactory;

        vm.obterServicos = function () {
            vm.servicos = vm.servicoService.obterServicos(
                (res) => {
                    vm.servicos = res;
                }
            );
        };

        vm.obterFabricantes = function () {
            vm.carroService.obterFabricantes(
                (res) => {
                    vm.fabricantes = res;
                });
        };

        vm.obterModelo = function (fabricante) {
            vm.modeloStatus = false;
            vm.anoStatus = true;
            vm.carro.fabricante = fabricante;
            vm.carroService.obterModelo(
                vm.carro, (res) => {
                    vm.modelos = res;
                });
        };

        vm.obterAno = function (modelo) {
            vm.modeloStatus = false;
            vm.anoStatus = false;
            vm.carro.modelo = modelo;
            vm.carroService.obterAno(
                vm.carro, (res) => {
                    vm.anos = res;
                });
        };

        vm.adicionarServico = function (servico) {
            vm.pedido.servicos.push(servico);
            vm.calcularValor();
        };

        vm.calcularValor = () => {
            vm.pedido.valor = vm.pedido.servicos.reduce((preval, elem) => preval + elem.valor, 0)
        };

        vm.cancelarPedido = function () {
            vm.list = true;
            vm.form = false;
            vm.pedido = PedidoFactory.pedido;
        };

        vm.criarPedido = function () {
            vm.pedidoService.criarPedido(vm.pedido, (res) => {
                vm.confirmar = true;
                vm.edit = false;
                vm.finalizar = false;
                vm.init();
            });
        };

        vm.confirmarPedido = function () {
            vm.pedido.cliente.carro.fabricante = vm.pedido.cliente.carro.fabricante.fipe_name;
            vm.pedido.cliente.carro.nome = vm.pedido.cliente.carro.modelo.fipe_name;
            vm.pedido.cliente.carro.ano = vm.pedido.cliente.carro.ano.name;
            vm.confirmar = false;
            vm.edit = true;
            vm.finalizar = true;
        };

        function init() {
            vm.pedido = PedidoFactory;
            vm.obterServicos();
            vm.obterFabricantes();
        }

        init();
    }
})();