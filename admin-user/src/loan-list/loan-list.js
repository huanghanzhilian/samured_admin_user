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
   app.registerController('loanList',function ($scope, $http, $state, $stateParams,$filter,$modal) {
        $scope.queryParams = $.extend({
            pageNum: 1,
            pageSize: 10,
            payStatus:"10"
        }, $stateParams);

        //下拉菜单
        $scope.queryOptions = {
            payStatus: [
                {name: '未打款',value: '10'},
                {name: '已打款',value: '1'}
            ]
        };

        $scope.orders = {
            pageNum: 1,
            pageSize: 10
        };

        function getData(params) {
            $http.get('/manage/repayingList-v4/json/get/getSendLoanMoneyPage', {
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
        //确认清退
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
       app.registerController('AddCtrl', ['$scope','$modalInstance','order',
           function($scope,$modalInstance,order) {
               $scope.order=order;
               $scope.errorInfo="";
               $scope.submit = function() {
                   var params = {
                       payCheckId:order.payCheckId,
                       optDesc:'确认打款'
                   };
                   $http.get("/manage/repayingList-v4/json/operate/sendLoanMoney", {
                       params: params
                   }).success(function(res) {
                       $.modalAlert(res.message)
                       $modalInstance.close()

                   });
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
         * 多选
         */
       $scope.allchecked = false;
       //单个检查
       $scope.acheck = function(order,checked) {
           order.checked=checked
            var allchecked=true;
           $($scope.orders.infoList).each(function (i,item) {
               if(!item.checked){
                   allchecked=false
               }
           })
           $scope.allchecked=allchecked
       }
       //全选
       $scope.change = function(allchecked) {
           $scope.allchecked=allchecked
           $($scope.orders.infoList).each(function (i,item) {
               item.checked=$scope.allchecked
               console.log(item)
           })
       }
       //确认打款及导出
       $scope.publishall = function() {
           var arrId=[]
           $($scope.orders.infoList).each(function (i,item) {
               if(item.checked){
                   arrId.push(item.payCheckId)
               }
           })
           if(arrId.length == 0) {
               $.modalAlert('您还没有选择！')
           } else {
               if(confirm('确认打款及导出？')) {
                   $http.get("/manage/repayingList-v4/json/operate/confirmPayMoney", {
                       params: {
                           payCheckIdStr:arrId.join(",")
                       }
                   }).success(function(res) {
                      if(res.object){
                          $.modalConfirm(res.message,function(){
                              window.open('/manage/repayingList-v4/json/export/exportConfirmPayMoney/loanList_'+(new Date()).getTime()+'.xls?payCheckIdStr='+res.object);
                              getData($scope.queryParams);
                          })
                      }

                   });

               }
           }
       }
       //导出
       $scope.exportall = function() {
           var arrId=[]
           $($scope.orders.infoList).each(function (i,item) {
               if(item.checked){
                   arrId.push(item.payCheckId)
               }
           })
           if(arrId.length == 0) {
               $.modalAlert('您还没有选择！')
           } else {
               $.modalConfirm("你确认要导出吗？",function(){
                   window.open('/manage/repayingList-v4/json/export/exportConfirmPayMoney/loanList_'+(new Date()).getTime()+'.xls?payCheckIdStr='+arrId.join(","));

               })

           }
       }
    });
});
