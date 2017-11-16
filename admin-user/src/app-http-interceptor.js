/**
 * http-interceptor.js
 * @description 统一的拦截器
 * 1.对所有get请求进行缓存处理
 * 2.对同一的请求code做处理，通常会跟后台约定code。比如code202，后台如果想直接返回提示信息，就返回该code，并在message中带相应的消息，该拦截器做统一的处理，不用在每一个http请求都做处理
 * 3.根据不同的code，跳转到不同的页面，如404，500等
 */

define(['app'], function(app) {
    app.config(['$httpProvider', function($httpProvider) {
        var errorInterceptor = ['$q', '$log', '$location', function($q, $log, $location) {
            // var msie = getInternetExplorerVersion();
            return {
                'request': function(config) {
                    if (config.method === 'GET' && config.url && !/^template\//.test(config.url)&&!/^uib\/template\//.test(config.url)) {
                        config.params = config.params || {};
                        // 自定义的html模板和js增加版本戳
                        if (/\.js$|\.html$/.test(config.url)) {
                            config.params['_'] = jrVersionStr;
                        } else {
                            config.params['_'] = new Date().getTime();
                        }
                    }
                    return config;
                },
                'response': function(response) {
                    if (typeof response.data === 'object' && response.data.success === false) {
                        // 用户未登陆则跳转到登陆页, error_no=3
                        if (response.data.resCode === '-300') {
                            location.href = '/manage/login';
                        } else if (response.data.resCode === '-400') { // 重新刷新页面
                            window.location.reload()
                        } else if (response.data.resCode === '-200') { // 重新刷新页面
                            return $q.reject(response);
                        } else {
                            $log.error(response);
                            modalAlert(response.data.message);
                            return $q.reject(response);
                        }
                    } else {
                        return response;
                    }

                },
                'responseError': function(rejection) {
                    $log.error(rejection);
                    var statusText = rejection.statusText;
                    var syserror = '系统错误，请稍后再试！';
                    modalAlert(syserror);
                    //var message = '系统错误，请稍后再试！';

                    //var alertModal = $modal.open({
                    //    template: __inline('tpl/modal-alert.html'),
                    //    controller: 'AlertCtrl',
                    //    backdrop: 'static',
                    //    resolve: {
                    //        message: function() {
                    //            angular.copy(message);
                    //        }
                    //    }
                    //})

                    return $q.reject(rejection);
                }
            };
        }];

        //app.registerController('AlertCtrl',function ($modalInstance,message) {
        //    $scope.message = message;
        //    $scope.submit = function () {
        //        $modalInstance.close();
        //    }
        //})
        $httpProvider.interceptors.push(errorInterceptor);

        function modalAlert(message) {
            $('.http-modal, .http-modal-backdrop').off().remove();
            var $modal = $(
                    '<div tabindex="-1" class="http-modal modal fade ngAlert in" ng-class="{in: animate}" style="z-index: 1050; display: block;">' +
                    '<div class="modal-dialog"><div class="modal-content">' +
                    '<div class=\"modal-header\">\r\n    <a href=\"javascript:void(0)\" class=\"modal-close\"></a>\r\n    <h3 class=\"modal-title\">错误信息</h3>\r\n</div>\r\n<div class=\"modal-body\">'+message+'</div>\r\n<div class=\"modal-footer\">\r\n    <button class=\"btn btn-primary\">确定</button>\r\n</div>' +
                    '</div></div>' +
                    '</div>');
            var $backdrop = $('<div class="modal-backdrop http-modal-backdrop in" style="z-index: 1040;"></div>');
            $modal.appendTo($('body'));
            $backdrop.appendTo($("body"));
            $modal.fadeIn(500);
            $modal.on('click', '.modal-close, .btn-primary', function() {
                $modal.off().remove();
                $backdrop.remove();
            });
        }
    }]);
});