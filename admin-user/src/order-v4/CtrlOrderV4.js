/**
 * CtrlHome.js 首页控制器
 * @url /#/home
 * @author yuebin
 */

define([
'app',
'directive/jrDatepicker',
'directive/jrDropdownButton',
'directive/jrPagination',
'service/paramList',
'directive/jrPlaceholder',
'directive/jrOrderStates'
], function ( app) {
    app.registerController('CtrlOrderV4', ['$scope','$rootScope', '$http', '$modal', '$state', '$stateParams', '$filter', 'paramList', '$timeout',
    function ($scope, $rootScope, $http, $modal, $state, $stateParams, $filter, paramList, $timeout) {

//        $scope.rights = $rootScope.rights;
//        $scope.distributeOrderSwitch = $rootScope.distributeOrderSwitch;
        $scope.queryParams = $.extend({
            pageNum: 1,
            pageSize: 10
        }, $stateParams);
        console.log($scope.queryParams)
        $scope.queryOptions = {

        };

        $scope.orders = {
            pageNum: 1,
            pageSize: 10
        };

        function getData(params) {
            $http.get('/manage/order-v4/json/get/getReceivePage', {
                params: $.extend({},params,{optDesc:'新的进件审核'})
            }).success(function(data, status, headers, config) {
                $scope.orders = data.object;
            });
        }

        getData($scope.queryParams);

        $scope.search = function(event) {
            console.log($scope.queryParams);
            $scope.queryParams.pageNum = 1;
            getData($scope.queryParams)
            //$state.go('order-v4.list', $scope.queryParams,{reload:true});
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
            getData($scope.queryParams)
            //$state.go('order.list', $.extend({}, $stateParams, {pageNum: newValue}));
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
