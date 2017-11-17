/**
 * 
 */

define([
    'app',
    'dict.cities',
    'angular-upload-file',
    'directive/jrDatepicker',
    'directive/jrDropdownButton',
    'directive/jrPlaceholder',
    'angular-upload-file',
    'directive/ngThumb',
    'directive/fileModel',
], function(app, citiesModule) {
    app.registerController('CtrlvideoManagementV1', ['$scope', '$rootScope', '$http', '$modal', '$stateParams', '$filter', '$state', '$sce', 'FileUploader', 'FileItem', '$timeout',
        function($scope, $rootScope, $http, $modal, $stateParams, $filter, $state, $sce, FileUploader, FileItem, $timeout) {


            //通过$.extend合并url新参数 新参数替换旧参数
            $scope.queryParams = $.extend({
                pageNum: 1,
                pageSize: 10
            }, $stateParams);

            //下拉菜单
            $scope.queryOptions = {
                orderStatus: [
                    { name: '结算状态', value: '' },
                    { name: '清退未结清', value: '6000' },
                    { name: '清退已结清', value: '6100' }
                ]
            };
            //请求数据
            $scope.orders = {
                pageNum: 1,
                pageSize: 10
            };

            //获取数据
            function getData(params) {
                $http.get('/api/video/list', {
                    params: $.extend({}, params, { optDesc: '视频管理' })
                })
                /*$http.get('/manage/repayingList-v4/json/get/getQingtuiPage', {
                    params: $.extend({}, params, { optDesc: '获取清退对账页面' })
                }).success(function(data, status, headers, config) {
                    $scope.orders = data.object;
                    $scope.resCode = data.resCode; //当resCode=1时，显示“确认收款”
                });*/
            }
            //初始化执行
            getData($scope.queryParams);

        }
    ]);
});