(function() {
    'use strict';

    angular
        .module('app')
        .service('ServicoService', ServicoService);

    ServicoService.$inject = ['$http'];
    
    function ServicoService($http) {
        const url = `http://localhost:3003/api/servicos`;
        
        this.service = {
            obterServicos : _obterServicos    
        } 
        
        function _obterServicos(cb) {
            $http.get(url).then(function (res) {
               cb(res.data); 
            })
        }

        }
})();