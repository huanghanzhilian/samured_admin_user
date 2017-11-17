define(['app'], function(app) {
    app.registerDirective('fileModel', ["$parse", function($parse) {
        return {
            restrict: 'A',

            link: function(scope, element, attrs) {
                var model = $parse(attrs.fileModel);
                var modelSetter = model.assign;
                element.bind("change", function() {
                    scope.$apply(function() {
                        /*for (var i = 0; i < Things.length; i++) {
                            Things[i]
                        }*/
                        modelSetter(scope, element[0].files);
                    })
                })
            }

        };
    }]);
});