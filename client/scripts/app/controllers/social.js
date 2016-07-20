angular.module('socialLogin.facebook', [])
    
        .provider('$facebookDefaults', function () {
                var defaults,
                    self;

                defaults = {
                    client_id: '',
                    redirect_uri: 'https://www.facebook.com/connect/login_success.html',
                    scope: 'email,read_stream,publish_actions'
                };


                self = {
                    useConfig: function (config) {
                        angular.extend(defaults, config);
                    },
                    $get: function () {
                        return {
                            defaults: defaults
                        };
                    }
                };

                return self;
            })

        .factory('$facebookAuth', ['$q', '$http', '$facebookDefaults',
                    function ($q, $http, $facebookDefaults) {

                var self;

                self = {

                    getAuthURL: function (authConfig) {
                        var url = 'https://www.facebook.com/dialog/oauth?',
                            config = authConfig || {
                                client_id: $facebookDefaults.defaults.client_id,
                                redirect_uri: $facebookDefaults.defaults.redirect_uri,
                                response_type: 'token',
                                scope: $facebookDefaults.defaults.scope
                            },
                            params = [];

                        angular.forEach(config, function (value, key) {
                            params[params.length] = encodeURIComponent(key) + '=' + encodeURIComponent(value);
                        });

                        return url + params.join('&');
                    }

                };

                return self;

            }]);