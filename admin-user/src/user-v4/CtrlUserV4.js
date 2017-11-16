/**
 * CtrlHome.js 首页控制器
 * @url /#/home
 * @author yuebin
 */

define([
    'app',
    'directive/jrDatepicker',
    'directive/jrDropdownButton',
    'directive/jrPlaceholder',
    'directive/jrPagination'
], function ( app) {
    app.registerController('CtrlUserV4', ['$scope', '$http', '$modal', '$state', '$stateParams', '$filter',
    function ($scope, $http, $modal, $state, $stateParams, $filter) {

        $scope.queryParams = $.extend({
            pageNum: 1,
            pageSize: 10
        }, $stateParams);

        $scope.queryOptions = {
            orderStatus: [
                {value: '', name: '全部状态'},
                {name: '初始状态',value: '0'},
                {name: '系统审核成功',value: '500'},
                {name: '已关联用户',value: '1000'},
                {name: '经纪人修改订单中',value: '1001'},
                {name: '用户提交确认',value: '1100'},

                {name: '待上传合同',value: '3000'},
                {name: '待人工审核',value: '3050'},
                {name: '人工审核成功',value: '3100'},
                {name: '已发标，待打款',value: '4000'},
                {name: '还款中',value: '4100'},
                {name: '已还清',value: '5100'},
                {name: '已清退',value: '6000'},
                {name: '清退已结清',value: '6100'},

                {name: '系统审核失败',value: '-500'},
                {name: '人工审核失败',value: '-3200'},
                {name: '打款失败',value: '-4200'},
                {name: '系统放弃废单',value: '-7003'},
                {name: '管家放弃废单',value: '-7004'}
            ]
        };

        $scope.orders = {
            pageNum: 1,
            pageSize: 10
        };
        
        function getData(params) {
            $http.get('/manage/user-v4/json/get/getOrderPage', {
                params: $.extend({},params,{optDesc:'订单管理'})
            }).success(function(data, status, headers, config) {
                $scope.orders = data.object;
            });
        }

        getData($scope.queryParams);

        $scope.search = function(event) {
            $scope.queryParams.pageNum = 1;
            getData($scope.queryParams);
            //$state.go('user-v4.list', $scope.queryParams,{reload:true});
        };

        //清空查询项
        $scope.clearParams = function() {
            var pageSize = $scope.queryParams.pageSize;
            $scope.queryParams = {
                pageNum: 1,
                pageSize: pageSize
            }
            console.log($scope.queryParams)
        }

        /**
         * 翻页跳转
         */
        $scope.$watch('orders.pageNum', function(newValue, oldValue) {
            if (newValue === oldValue) {
                return false;
            }
            $scope.queryParams.pageNum = newValue;
            getData($scope.queryParams);
            //$state.go('user-v4.list', $.extend({}, $stateParams, {pageNum: newValue}));
        });

        $scope.$watch('orders.pageSize', function(newValue, oldValue) {
            if (newValue === oldValue) {
                return false;
            }
            $scope.queryParams.pageSize = newValue;
            getData($scope.queryParams)
        });

    }]);
});
