app.run(['$templateCache', function($templateCache) {
    $templateCache.put('tpl-home.html', '<div>{{title}}</div>');
    $templateCache.put('tpl-singin.html', '<button ng-click="authenticate(\'facebook\')">Sign in with Facebook</button><button ng-click="authenticate(\'google\')">Sign in with Google</button><button ng-click="authenticate(\'github\')">Sign in with GitHub</button><button ng-click="authenticate(\'linkedin\')">Sign in with LinkedIn</button><button ng-click="authenticate(\'twitter\')">Sign in with Twitter</button>');
    $templateCache.put('tpl-users.html', '<div></div>');
}]);