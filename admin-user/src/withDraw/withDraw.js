/**
 * CtrlRepayingListV4.js 清退对账控制器
 * @url /#/repayingList-v4
 * @author yuebin
 */

define([
    'app',
    'directive/jrDatepicker',
    'directive/jrDropdownButton',
    'directive/jrPlaceholder',
    'directive/jrPagination'
], function ( app) {
   app.registerController('withDraw',function ($scope, $http, $state, $stateParams,$filter,$modal) {
        $scope.queryParams = $.extend({
            pageNum: 1,
            pageSize: 10,
            withDrawStatus:"0"
        }, $stateParams);

        //下拉菜单
        $scope.queryOptions = {
            withDrawStatus: [
                {name: '待审核',value: '0'},
                {name: '审核成功',value: '1'},
                {name: '审核失败',value: '-1'}
            ]
        };

        $scope.orders = {
            pageNum: 1,
            pageSize: 10
        };

        function getData(params) {
            $http.get('/manage/repayingList-v4/json/get/getWithDrawPage', {
                params: $.extend({},params,{optDesc:'放款列表'})
            }).success(function(data, status, headers, config) { 
                $scope.orders = data.object;
            });
        }

        getData($scope.queryParams);

        $scope.search = function(event) {
            $scope.queryParams.pageNum = 1;
            getData($scope.queryParams);
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
        //确认打款
        $scope.repayConfirm=function(event,order){
            var addModal = $modal.open({
                template: __inline('tpl/addModal.html'),
                controller: 'AddCtrl',
                resolve: {
                    order: function () {
                        return angular.copy(order);
                    }
                }
            })
            addModal.result.then(function() {
                getData($scope.queryParams);
            })
        }

       //通过打款
       app.registerController('AddCtrl', ['$scope','$modalInstance','order',
           function($scope,$modalInstance,order) {
               $scope.order=order;
               $scope.errorInfo="";
               $scope.submit = function() {
                   var params = {
                       detailId:order.detailId,
                       checkResult:"1",
                       optDesc:'确认打款'
                   };
                   $http.get("/manage/repayingList-v4/json/get/checkWithDraw", {
                       params: params
                   }).success(function(res) {
                       $.modalAlert(res.message)
                       $modalInstance.close()
                   });
               }
           }])
       //拒绝
       $scope.refuse=function(event,order){
           var addModal = $modal.open({
               template: __inline('tpl/refuse.html'),
               controller: 'refuseCtrl',
               resolve: {
                   order: function () {
                       return angular.copy(order);
                   }
               }
           })
           addModal.result.then(function() {
               getData($scope.queryParams);
           })

       }
       app.registerController('refuseCtrl', ['$scope','$modalInstance','order',
           function($scope,$modalInstance,order) {
               $scope.order=order;
               $scope.order.memo="";
               $scope.errorInfo="";
               $scope.submit = function() {
                   if($scope.order.memo){
                       var params = {
                           detailId:order.detailId,
                           checkResult:"0",
                           memo:$scope.order.memo,
                           optDesc:'拒绝打款'
                       };
                       $http.get("/manage/repayingList-v4/json/get/checkWithDraw", {
                           params: params
                       }).success(function(res) {
                           $.modalAlert(res.message)
                           $modalInstance.close()
                       });
                   }else{
                       $.modalAlert("拒绝理由不能为空")
                   }

               }
           }])
        /**
         * 翻页跳转
         */
        $scope.$watch('orders.pageNum', function(newValue, oldValue) {
            if (newValue === oldValue) {
                return false;
            }
            $scope.queryParams.pageNum = newValue;
            getData($scope.queryParams);
            //$state.go('repayingList-v4.list', $.extend({}, $stateParams, {pageNum: newValue}));
        });
       $scope.$watch('orders.pageSize', function(newValue, oldValue) {
           if (newValue === oldValue) {
               return false;
           }
           $scope.queryParams.pageSize = newValue;
           getData($scope.queryParams)
       });

        /**
         * 导出
         */
        $scope.export = function(e) {
            var params = $.extend({}, $scope.queryParams, {optDesc:'导出清退对账'});
            //window.open('/v4/rs/manage/exportRepayingList/repayMoneyList_'+(new Date()).getTime()+'.xls?' + $.param($scope.queryParams));
            window.open('/manage/repayingList-v4/json/export/exportRepayingList/repayMoneyList_'+(new Date()).getTime()+'.xls?' + $.param(params));
        };

        
    });
});
