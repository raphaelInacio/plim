(function() {
    'use strict';

    angular
        .module('app')
        .service('CarroService', CarroService);

    CarroService.$inject = ['$http'];
   
    function CarroService($http) {
 
       const _obterFabricantes = function (cb) {
            const url = 'http://fipeapi.appspot.com/api/1/carros/marcas.json';
            $http.get(url).then(function (res) {
                cb(res.data);
            });
        };

       const _obterModelo = function (carro, cb) {
            const url = `http://fipeapi.appspot.com/api/1/carros/veiculos/${carro.fabricante.id}.json`
            $http.get(url).then(function (res) {
                cb(res.data);
            });
        };

        const _obterAno = function (carro, cb) {
            const url = `http://fipeapi.appspot.com/api/1/carros/veiculo/${carro.fabricante.id}/${carro.modelo.id}.json`
            $http.get(url).then(function (res) {
                cb(res.data);
            })
        }

         this.service = {
            obterFabricantes : _obterFabricantes,
            obterModelo : _obterModelo,
            obterAno : _obterAno
        };
    }
})();