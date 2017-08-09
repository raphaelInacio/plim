(function () {
    angular.module('app').controller('BillingCycleController', [
        '$http',
        '$location',
        'MessageFactory',
        'TabsFactory',
        BillingCycleController
    ])

    function BillingCycleController($http, $location, MessageFactory, TabsFactory) {

        const vm = this
        const limit = 3

        vm.url = 'http://localhost:3003/api/billingCycles'
        vm.msgs = MessageFactory
        vm.tabs = TabsFactory

        vm.refresh = function () {

            const page = parseInt($location.search().page) || 1

            $http.get(`${vm.url}?skip=${(page - 1) * limit }&limit=${limit}`).then(function (res) {
                vm.billingCycle = {
                    credits: [{}],
                    debits: [{}]
                }

                vm.billingCycles = res.data
                vm.calculateValues()
                vm.count()
            })
        }

        vm.create = function () {
            $http.post(vm.url, vm.billingCycle).then(function (res) {
                vm.refresh()
                vm.msgs.addSuccess('Operação realizada com sucesso!')
            }, function (reason) {
                vm.msgs.addErrors(reason.data)
            })
        }

        vm.showTabUpdate = function (billingCycle) {
            vm.billingCycle = billingCycle
            vm.calculateValues()
            vm.tabs.show(vm, {
                tabUpdate: true
            })
        }

        vm.showTabDelete = function (billingCycle) {
            vm.billingCycle = billingCycle
            vm.calculateValues()
            vm.tabs.show(vm, {
                tabDelete: true
            })
        }

        vm.update = function () {
            const urlUpdate = `${vm.url}/${vm.billingCycle._id}`
            $http.put(urlUpdate, vm.billingCycle)
            .then(function (res) {
                vm.refresh()
                vm.msgs.addSuccess('Operação realizada com sucesso!')
            }, function (reason) {
                vm.msgs.addErrors(reason.data)
            })

        }

        vm.delete = function () {
            const deleteUrl = `${vm.url}/${vm.billingCycle._id}`
            $http.delete(deleteUrl, vm.billingCycle)
                .then(function (res) {
                    vm.refresh()
                    vm.msgs.addSuccess('Operação realizada com sucesso!')
                }, function (reason) {
                    vm.msgs.addErrors(reason.data)
                })
        }

        vm.addCredit = function (index) {
            vm.billingCycle.credits.splice(index + 1, 0, {})
            vm.calculateValues()
        }

        vm.cloneCredit = function (index, {
            name,
            value
        }) {
            vm.billingCycle.credits.splice(index + 1, 0, {
                name,
                value
            })
            vm.calculateValues()
        }

        vm.deleteCredit = function (index) {
            if (vm.billingCycle.credits.length > 1)
                vm.billingCycle.credits.splice(index, 1)
            vm.calculateValues()
        }

        vm.addDebt = function (index) {
            vm.billingCycle.debits.splice(index + 1, 0, {})
            vm.calculateValues()
        }

        vm.cloneDebt = function (index, {
            name,
            value,
            status
        }) {
            vm.billingCycle.debits.splice(index + 1, 0, {
                name,
                value,
                status
            })

            vm.calculateValues()
        }

        vm.deleteDebt = function (index) {
            if (vm.billingCycle.debits.length > 1)
                vm.billingCycle.debits.splice(index, 1)
            vm.calculateValues()
        }

        vm.calculateValues = function () {

            vm.credit = 0
            vm.debit = 0

            if (vm.billingCycle) {

                vm.billingCycle.credits.forEach(function ({
                    value
                }) {
                    vm.credit += !value || isNaN(value) ? 0 : parseFloat(value)
                })

                vm.billingCycle.debits.forEach(function ({
                    value
                }) {
                    vm.debit += !value || isNaN(value) ? 0 : parseFloat(value)
                })
            }

            vm.total = vm.credit - vm.debit
        }

        vm.count = function () {
            $http.get(`${vm.url}/count`).then(function (res) {
                vm.pages = Math.ceil(res.data.value / limit)
                vm.tabs.show(vm, {
                    tabList: true,
                    tabCreate: true
                })
            })
        }

        vm.refresh()
    }
})()