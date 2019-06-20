"use strict";
var Swing = require('swing');
var moduleName = 'gajus.swing';
module.exports = moduleName;

function SwingStackController($scope, $element, $attrs, $parse) {
  var stack;
  var defaultOptions = {};
  var options = $parse($attrs.swingOptions)($scope);

  this.add = addCardElement;

  function bindComponent() {
      if ($attrs.swingStack) {
          var set = $parse($attrs['swingStack']).assign;
          set($scope, stack);
      }
  }

  function addCardElement(cardElement) {
      return stack.createCard(cardElement);
  }

  function initComponent() {
      angular.extend(defaultOptions, options);
      stack = Swing.Stack(defaultOptions);
      bindComponent();
  }

  initComponent();

}

SwingStackController.$inject = ['$scope', '$element', '$attrs', '$parse'];

function swingStack() {
    return {
        restrict: 'A',
        controller: SwingStackController
    }
}

function ngName(eventName) {
  return 'swingOn' +
     eventName.charAt(0).toUpperCase() +
     eventName.slice(1);
}

function swingCardLink(scope, element, attrs, swingStack) {
  var card = swingStack.add(element[0]);
  var events = [
    'throwout',
    'throwoutend',
    'throwoutleft',
    'throwoutright',
    'throwoutup',
    'throwoutdown',
    'throwin',
    'throwinend',
    'dragstart',
    'dragmove',
    'dragend'
  ];

    function addListener(eventName) {
        card.on(eventName, function (eventObject) {
            // If you wrap your methods inside $scope.$apply you may face digest cycle issues that's why we removed this code from here
            scope[ngName(eventName)]({
                eventName: eventName,
                eventObject: eventObject
            });
        });
    }

  // Map all Swing events to the scope expression.
  // Map eventObject variable name to the expression wrapper fn.
  // @see https://docs.angularjs.org/api/ng/service/$compile#comprehensive-directive-api
  angular.forEach(events, addListener);
}

swingCardLink.$inject = ['scope', 'element', 'attrs', 'swingStack'];

function swingCard() {
  return {
    restrict: 'A',
    require: '^swingStack',
    scope: {
      swingOnThrowout: '&',
      swingOnThrowoutend: '&',
      swingOnThrowoutleft: '&',
      swingOnThrowoutright: '&',
      swingOnThrowoutup: '&',
      swingOnThrowoutdown: '&',
      swingOnThrowin: '&',
      swingOnThrowinend: '&',
      swingOnDragstart: '&',
      swingOnDragmove: '&',
      swingOnDragend: '&'
    },
    link: swingCardLink
  };
}

function swingHelper() {
    return {
        Direction: Swing.Direction
    };
}

angular
  .module(moduleName, [])
  .directive('swingStack', swingStack)
  .directive('swingCard', swingCard)
  .factory('swingHelper', swingHelper);
