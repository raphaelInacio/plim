(function () {
    'use strict';

    angular
        .module('app')
        .factory('PedidoFactory', PedidoFactory);

    PedidoFactory.$inject = ['$http'];

    function PedidoFactory($http) {

        const endereco = {
            rua: '',
            numero: 0,
            complemento: '',
            cep: '',
            bairro: '',
            cidade: '',
            estado: ''
        }

        const fornecedor = {
            nome: '',
            email: '',
            telefone: '',
            endereco: endereco
        }

        const carro = {
            fabricante: '',
            nome: '',
            ano: 0
        }

        const servico = {
            nome: '',
            descricao: '',
            valor: 0.0
        };

        const orcamento = {
            valor: '',
            descricao: '',
            status: ['APROVADO'],
            fornecedor: fornecedor
        }

        const cliente = {
            nome: '',
            email: '',
            telefone: '',
            carro: carro,
            endereco: endereco
        }

        const pedido = {
            descricao: '',
            valor: 0.0,
            status: ['ABERTO'],
            cliente: cliente,
            servicos: [servico],
            orcamentos: [orcamento]
        }

        return pedido;
    }
})();