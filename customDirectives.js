
var customDirectives = angular.module('customDirectives', []);
customDirectives.directive('countTo', ['$timeout', '$document', function ($timeout, $document) {
    return {
        replace: true,
        scope: true,
        template: ' <div class="stats_item" >' +
            '<div class="stats_img"><img src="{{imgSrc}}" /></div>' +
            '<div class="stats_counter">{{counterText}}</div>' +
            '<span class="stats_title">{{itemTitle}}</span>' +
            '</div>',
        link: function (scope, element, attrs) {

            var e = element[0];
            var num, refreshInterval, duration, steps, step, countTo, value, increment;
            scope.counterText = 0;
            scope.imgSrc = attrs.imgSrc;
            scope.itemTitle = attrs.itemTitle;

            var calculate = function () {
                refreshInterval = 30;
                step = 0;
                scope.timoutId = null;
                countTo = parseInt(attrs.countTo) || 0;
                scope.value = parseInt(attrs.value, 10) || 0;
                duration = (parseFloat(attrs.duration) * 1000) || 0;

                steps = Math.ceil(duration / refreshInterval);
                increment = ((countTo - scope.value) / steps);
                num = scope.value;
            }

            var tick = function () {
                scope.timoutId = $timeout(function () {
                    num += increment;
                    step++;
                    if (step >= steps) {
                        $timeout.cancel(scope.timoutId);
                        num = countTo;
                        scope.counterText = countTo;
                    } else {
                        scope.counterText = Math.round(num);
                        tick();
                    }
                }, refreshInterval);

            }

            var start = function () {
                if (scope.timoutId) {
                    return;
                }
                calculate();
                tick();
            }

            $document.bind('scroll', function () {
                scope.currentOffset = (angular.element(document).scrollTop() + window.innerHeight-100);
                if (scope.currentOffset >= angular.element(e).offset().top) {
                    start();
                }
            });

            return true;
        }
    }

}]);
customDirectives.directive('headSection', function () {
    return {
        replace: true,
        scope: true,
        transclude: true,
        link: function (scope, element, attr) {
            scope.title = attr.headTitle;
            scope.titleClasses = {
                head_section_title: true,
                white: false,
            };
            scope.descClasses = {
                head_section_desc: true,
                white: false,
            }
            if (angular.isDefined(attr.whiteText)) {
                scope.descClasses.white = true;
                scope.titleClasses.white = true;
            }
        },
        template: '<div class="head_section">' +
            '<h2 ng-class="titleClasses" >{{title}}</h2>' +
            '<div class="line"></div>' +
            '<p ng-class="descClasses" ng-transclude></p></div>'
    }
});
customDirectives.directive('teamMember', function () {
    return {
        restrict: 'AE',
        replace: true,
        scope: {
            memberInfo: '='
        },
        template: angular.element(document.getElementById('teamMemberTemplate')).html(),
        link: function (scope, element, attributes) {
            scope.changeColorIcon = function ($event, type) {
                var element = angular.element($event.currentTarget);
                switch (type) {
                    case 'facebook': element.toggleClass('dark_blue_back'); break;
                    case 'twitter': element.toggleClass('light_blue_back'); break;
                    case 'google': element.toggleClass('red_back'); break;
                    case 'web': element.toggleClass('pink_back'); break;
                    default: return;
                }
            }
        }
    }
});