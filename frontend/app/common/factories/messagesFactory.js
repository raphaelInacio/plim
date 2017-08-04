(function () {
    
    angular.module('app').factory('MessageFactory', ['toastr', MessageFactory])

    function MessageFactory(toastr) {

        function addMessages(msgs, title, method) {
            if (msgs instanceof Array) {
                msgs.forEach(msg => toastr[method](msg, title))
            } else {
                toastr[method](msgs, title)
            }
        }

        function addSuccess(msgs) {
            addMessages(msgs, 'Sucesso', 'success')
        }

        function addErrors(msgs) {
            addMessages(msgs, "Erro", 'error')
        }

        return {
            addSuccess,
            addErrors
        }

    }
})()