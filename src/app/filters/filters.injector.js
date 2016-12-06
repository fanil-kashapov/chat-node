'use strict';

import filters from './filters';

var moduleName = 'chatApp.filters';
angular.module(moduleName, []);

angular.module(moduleName)
    .factory('Filters', filters.FiltersFactory);

export default moduleName;