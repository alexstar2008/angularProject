
var customFilters = angular.module('customFilters', []);
customFilters.filter('portfolioFilter', function () {
    return function (arr, type) {
        if (type == 'all')
            return arr;
        var filteredArr = [];
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].type == type)
                filteredArr.push(arr[i]);
        }
        return filteredArr;
    };
});