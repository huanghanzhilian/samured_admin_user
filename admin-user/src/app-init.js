/**
 * app-init.js app的配置
 * 1.http请求的头部设定
 * 2.couchpatato设定
 */

define(['app', 'routeDefs', 'app-http-interceptor', './CtrlApp'], function(app) {
    app.config(['routeDefsProvider', '$httpProvider', function(routeDefsProvider, $httpProvider) {

        //GET header config
        $httpProvider.defaults.headers.get = $httpProvider.defaults.headers.get || {};
        $httpProvider.defaults.headers.get['X-Requested-With'] = 'XMLHttpRequest';
        $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';

        //POST header config
        $httpProvider.defaults.headers.post = {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'X-Requested-With': 'XMLHttpRequest'
        };
    }]);

    $.modalAlert = function modalAlert(message, callback) {
        $('.http-modal, .http-modal-backdrop').off().remove();
        var $modal = $(
            '<div tabindex="-1" class="http-modal modal fade ngAlert in" ng-class="{in: animate}" style="z-index: 1050; display: block;">' +
            '<div class="modal-dialog"><div class="modal-content">' +
            '<div class=\"modal-header\">\r\n    <a href=\"javascript:void(0)\" class=\"modal-close\"></a>\r\n    <h3 class=\"modal-title\">提示信息</h3>\r\n</div>\r\n<div class=\"modal-body\">' + message + '</div>\r\n<div class=\"modal-footer\">\r\n    <button class=\"btn btn-primary\">确定</button>\r\n</div>' +
            '</div></div>' +
            '</div>');
        var $backdrop = $('<div class="modal-backdrop http-modal-backdrop in" style="z-index: 1040;"></div>');
        $modal.appendTo($('body'));
        $backdrop.appendTo($("body"));
        $modal.fadeIn(500);
        $modal.on('click', '.modal-close, .btn-primary', function() {
            $modal.off().remove();
            $backdrop.remove();
            if (callback) {
                callback();
            }
        });
    }



    $.modalConfirm = function modalConfirm(message, callback) {
        $('.http-modal, .http-modal-backdrop').off().remove();
        var $modal = $(
            '<div tabindex="-1" class="http-modal modal fade ngAlert in" ng-class="{in: animate}" style="z-index: 1050; display: block;">' +
            '<div class="modal-dialog"><div class="modal-content">' +
            '<div class=\"modal-header\">\r\n    <a href=\"javascript:void(0)\" class=\"modal-close\"></a>\r\n    <h3 class=\"modal-title\">确认信息</h3>\r\n</div>\r\n<div class=\"modal-body\">' + message + '</div>\r\n<div class=\"modal-footer\">\r\n    <button class=\"btn btn-primary\">确定</button>\r\n<button class=\"btn btn-cancel\">取消</button>\r\n</div>' +
            '</div></div>' +
            '</div>');
        var $backdrop = $('<div class="modal-backdrop http-modal-backdrop in" style="z-index: 1040;"></div>');
        $modal.appendTo($('body'));
        $backdrop.appendTo($("body"));
        $modal.fadeIn(500);
        $modal.on('click', '.modal-close, .btn-cancel', function() {
            $modal.off().remove();
            $backdrop.remove();
        });
        $modal.on('click', '.btn-primary', function() {
            $modal.off().remove();
            $backdrop.remove();
            if (callback) {
                callback();
            }
        });
    }
    app.run(['$couchPotato', '$state', '$stateParams', '$rootScope', '$http', '$modal', function($couchPotato, $state, $stateParams, $rootScope, $http, $modal) {

        // by assigning the couchPotato service to the lazy property, we
        // the register functions will know to run-time-register components
        // instead of config-time-registering them.
        app.lazy = $couchPotato;

        // angular-ui-project recommends assigning these services to the root
        // scope.  Others have argued that doing so can lead to obscured
        // dependencies and that making services directly available to html and
        // directives is unclean.  In any case, the ui-router demo assumes these
        // are available in the DOM, therefore they should be on $rootScope.
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        $rootScope.userAuth = '';

        $rootScope.curTime = Date.parse(new Date());
        $rootScope.endTime = Date.parse(new Date());
        $rootScope.startTime = Date.parse(new Date()) - 86400 * 7 * 1000;

        $rootScope.canAccess = function(value) {
            var arr = $rootScope.userAuth.match(/,-.+?(?=,)/g)
            if (arr) {
                for (var i = 0; i < arr.length; i++) {
                    var str = arr[i].substr(2, arr[i].length - 2)
                    if (value.indexOf(str) > -1) {
                        return false;
                    }
                }
            }
            if ($rootScope.userAuth.match(value) || $rootScope.userAuth.match('all') || !$rootScope.userAuth) {
                return true;
            }
            return false;
        };



        // 请求客户信息
        $.ajax({
            url: "/manage/public/json/get/userattribute",
            async: false,
            cache: false,
            dataType: "json",
            success: function(data) {
                $rootScope.userInfo = data.object;
                angular.element('#side').css('visibility', 'visible');

                $rootScope.userAuth = ',' + data.object.authority + ',';
                $rootScope.rights = data.object.rights;

                //获得enterpriseId、enterpriseStatus
                $rootScope.enterpriseId = data.object.enterpriseId;
                $rootScope.enterpriseStatus = data.object.enterpriseStatus;
                $rootScope.corInfoDisabled = false; //企业是否可填写信息
                $rootScope.checkEnterpriseReason = data.object.checkEnterpriseReason; //企业信息审核未通过原因

                if ($rootScope.userAuth == ",corporate-info,") { //企业信息录入
                    location.href = "#/corporateInfo/main";
                }
                $('#top-logo').show();

                // 显示side内容
                $('#side-style').remove();

                if (data.object.alertChangePwd) {
                    alert("您的密码是初始密码，为了账户安全，请尽快修改密码！");
                }
            }
        });


        // 修改密码
        $rootScope.modifyPassword = function(event) {
            var modalModifyPassword = $modal.open({
                template: __inline('tpl/modal-modify-password.html'),
                controller: 'ModalModifyPassword',
                backdrop: 'static'
            });

        };

        app.registerController('ModalModifyPassword', function($scope, $modalInstance) {
            $scope.modify = {};
            $scope.modifySubmit = function() {
                if ($scope.modify.newPassword !== $scope.modify.newPasswordConfirm) {
                    $scope.errorInfo = '新密码和确认新密码输入不一致';
                    return false;
                }
                $http.post('/manage/public/json/update/updatePassword', $.param({
                    password: $.fn.md5($scope.modify.password),
                    newPassword: $.fn.md5($scope.modify.newPassword),
                    optDesc: "修改密码"
                })).success(function(data, status, headers, config) {
                    $modalInstance.close();
                });
            };
        });

        app.registerFilter('encodeURI', function() {
            return function(value) {
                return encodeURIComponent(value);
            }
        });
    }]);

});