angular
    .module('card-stack-demo', ['gajus.swing'])
    .controller('card-stack-playground', function ($scope, swingHelper) {
        var vm = this;
        $scope.cards = [
            {name: 'clubs', symbol: '♣'},
            {name: 'diamonds', symbol: '♦'},
            {name: 'hearts', symbol: '♥'},
            {name: 'spades', symbol: '♠'}
        ];
        vm.swingStack = null;

        $scope.throwout = function (eventName, eventObject) {
            console.log('throwout', eventObject);
        };

        $scope.throwoutend = function (eventName, eventObject, idx) {
            console.log('throwoutend', eventObject, idx);
            $scope.$evalAsync(function() {
              $scope.cards.splice(idx, 1);
            });
        };

        $scope.throwoutleft = function (eventName, eventObject) {
            console.log('throwoutleft', eventObject);
        };

        $scope.throwoutright = function (eventName, eventObject) {
            // console.log('throwoutright', eventObject);
        };

        $scope.throwin = function (eventName, eventObject) {
            // console.log('throwin', eventObject);
        };

        $scope.dragstart = function (eventName, eventObject) {
            // console.log('dragstart', eventObject);
        };

        $scope.dragmove = function (eventName, eventObject) {
            // console.log('dragmove', eventObject);
        };

        $scope.dragend = function (eventName, eventObject) {
            // console.log('dragend', eventObject);
        };

        $scope.options = {
            allowedDirections: [swingHelper.Direction.UP, swingHelper.Direction.DOWN],
            /**
             * Invoked in the event of "dragmove".
             * Returns a value between 0 and 1 indicating the completeness of the throw out condition.
             * Ration of the absolute distance from the original card position and element width.
             *
             * @param {number} xOffset Distance from the dragStart.
             * @param {number} yOffset Distance from the dragStart.
             * @param {HTMLElement} element Element.
             * @returns {number}
             */
            throwOutConfidence: function (xOffset, yOffset, element) {
                const xConfidence = Math.min(Math.abs(xOffset) / element.offsetWidth, 1);
                const yConfidence = Math.min(Math.abs(yOffset) / element.offsetHeight, 1);
                return Math.max(xConfidence, yConfidence);
            },
            isThrowOut: function (xOffset, yOffset, element, throwOutConfidence) {
                return throwOutConfidence === 1;
            }
        };

        $scope.handleCard = function () {
            var cards = document.querySelectorAll('.stack>li');
            if (cards.length > 0) {
                var card = vm.swingStack.getCard(cards[cards.length - 1]);
                // console.log(vm.stacks);
                card.throwOut(0, 0, swingHelper.Direction.UP);
            }
        }
    });
