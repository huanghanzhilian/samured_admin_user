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
   app.registerController('CtrlRepayingListV4',function ($scope, $http, $state, $stateParams,$filter,$modal) {
        $scope.queryParams = $.extend({
            pageNum: 1,
            pageSize: 10
        }, $stateParams);

        //下拉菜单
        $scope.queryOptions = {
            orderStatus: [
                {name: '结算状态',value: ''},
                {name: '清退未结清',value: '6000'},
                {name: '清退已结清',value: '6100'}
            ]
        };

        $scope.orders = {
            pageNum: 1,
            pageSize: 10
        };

        function getData(params) {
            $http.get('/manage/repayingList-v4/json/get/getQingtuiPage', {
                params: $.extend({},params,{optDesc:'获取清退对账页面'})
            }).success(function(data, status, headers, config) { 
                $scope.orders = data.object;
                $scope.resCode = data.resCode; //当resCode=1时，显示“确认收款”
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
        //确认清退
        $scope.repayConfirm=function(event,order){
            if (confirm('你确认要对租客“'+order.userName+'”执行确认清退操作吗？')) {
                var params = {
                    orderId:order.orderId,
                    optDesc:'确认清退'
                };
                $http.get("/manage/repayingList-v4/json/update/confirmQingTui", {
                    params: params
                }).success(function(res) {
                    if(res.success==true){
                        getData($scope.queryParams);
                    }
                });
            }

        }


       $scope.addRemark = function (order) {
           var addModal = $modal.open({
               template: __inline('tpl/addModal.html'),
               controller: 'AddCtrl',
               resolve: {
                   message: function () {
                       return angular.copy(order);
                   }
               }
           })
           addModal.result.then(function() {
               getData($scope.queryParams);
           })
       }
       app.registerController('AddCtrl', ['$scope','$modalInstance','message',
           function($scope,$modalInstance,message) {
               $scope.message = message;
               $scope.message.remark = $scope.message.qingtuiRemark;
               $scope.submit = function() {
                   var params = {
                       orderId: $scope.message.orderId,
                       remark: $scope.message.remark
                   };
                   $http.get('/manage/repayingList-v4/json/add/qingtuiRemark',{
                       params: $.extend({optDesc: '添加清退备注'}, params)
                   }).success(function(data) {
                       if(data.success) {
                           //$state.reload();
                           $modalInstance.close();
                       }
                   })
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
