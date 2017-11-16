/**
 * 进件管理 审核 控制器
 *
 * @url: '/{orderId:[0-9]+}?tab',
 * tab 取值为 0, 1, 2, 3, 4 ...
 *
 * @author    yuebin & Yang,junlong at 2015-10-13 20:12:03 update.
 * @version:  $Id: CtrlOrderCheckV4.js 21003 2016-11-26 03:56:52Z zhangmiao03 $
 */

define([
    'app',
    'directive/jrDatepicker',
    'directive/jrDropdownButton',
    'directive/jrPlaceholder',
    'angular-upload-file',
    'directive/ngThumb'
], function (app) {
    app.registerController('CtrlOrderCheckV4', ['$scope', '$rootScope', '$http', '$modal', '$stateParams', '$filter', '$state', '$sce','FileUploader', 'FileItem','$timeout',
        function ($scope, $rootScope, $http, $modal, $stateParams, $filter, $state, $sce,FileUploader, FileItem,$timeout) {



            // 进件ID
            $scope.orderId = $stateParams.orderId;
            $scope.flagIndex = $stateParams.flag;

            $scope.tabData = {
                audit: false,
                reaudit: false,
                auditPage: false,
                reauditPage: false
            };

            if ($scope.flagIndex == 1) {
                $scope.tabData.audit = true;
            }

            if ($scope.flagIndex == 4) {// 选中初审
                $scope.tabData.audit = true;
                $scope.tabData.auditPage = true;
            }

            //点击展示用户信息
            $scope.userInfoInit = function () {
                $http.get('/manage/public/json/get/userinfoAudit', {
                    params: {orderId: $stateParams.orderId,optDesc:'用户信息'}
                }).success(function (data, status, headers, config) {
                    $scope.userInfo = data.object;
                });
            };

            //审核信息
            $scope.auditInit = function () {
                $http.get('/manage/public/json/get/orderLogInfo', {
                    params: {orderId: $stateParams.orderId,optDesc:'审核信息'}
                }).success(function (data, status, headers, config) {
                    $scope.LogInfo = data.object;
                });
            };
            $scope.auditData={
                orderId:$stateParams.orderId,
                checkMemo:""
            }
            $scope.manualSubmit = function (mes) {
                if (mes==0&&!$scope.auditData.checkMemo) {
                    alert('请输入批注信息！');
                    return;
                }
                //审核结果 1通过 2拒绝
                $scope.auditData.checkResult=mes
                if (window.confirm('您确定进入提交评审吗？')) {
                    $http.get('/manage/order-v4/json/operate/humanCheckOrder', {
                        params: $.extend({},$scope.auditData,{optDesc:'审核结果提交'})
                    }).success(function (data, status, headers, config) {
                        window.close();
                        //提交后刷新主页面
                        window.opener.location.reload();
                    });
                }
            };

            $scope.manualQuit=function(){
                window.close();
            }
    }]);

});
