'use strict';

import filters from './filters';

// TODO: Please write it in more compact way e.g.
// const ngModule = angular.module('chatApp.filters', [])
// ngModule.factory('Filters', filters.FiltersFactory)
// export default moduleName.name;

var moduleName = 'chatApp.filters';
angular.module(moduleName, []);

angular.module(moduleName)
    .factory('Filters', filters.FiltersFactory);

export default moduleName;