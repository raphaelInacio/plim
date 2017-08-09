angular.module('app').component('valueBox', {
    bindings : {
        grid: '@',
        colorClass: '@',
        value: '@',
        text: '@',
        iconClass: '@'
    },
    template:`
        <div class="{{ $ctrl.grid }}">
            <div class="small-box {{ $ctrl.colorClass }}">
                <div class="inner">
                    <h3>{{ $ctrl.value }}</h3>
                    <p>{{ $ctrl.text }}</p>
                </div>            
                <div class="icon">
                    <i class="fa {{ $ctrl.iconClass }}"></i>
                </div>
            </div>
        </div>
        `
})