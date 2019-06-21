angular
    .module('card-stack-demo', ['gajus.swing'])
    .controller('card-stack-playground', function ($scope, swingHelper, $timeout) {
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
            console.log('throwoutend', eventObject);
            $timeout(function() {
                $scope.$evalAsync(function() {
                    $scope.cards.splice(idx, 1);
                });
            }, 100);
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
            allowedDirections: [swingHelper.Direction.LEFT, swingHelper.Direction.RIGHT],
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
                var element = cards[cards.length - 1];
                var card = vm.swingStack.getCard(element);
                // var offset = getOffset(element);
                /**
                 * Throws a card out of the stack in the direction away from the original offset.
                 *
                 * @param {number} coordinateX
                 * @param {number} coordinateY
                 * @param {Direction} [direction]
                 * @returns {undefined}
                 */
                card.throwOut(600, 0, swingHelper.Direction.RIGHT);
            }
        }

        function getOffset( el ) {
            var _x = 0;
            var _y = 0;
            while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
                _x += el.offsetLeft - el.scrollLeft;
                _y += el.offsetTop - el.scrollTop;
                el = el.offsetParent;
            }
            return { top: _y, left: _x };
        }
    });
