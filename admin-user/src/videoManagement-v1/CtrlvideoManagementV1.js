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


            //查询参数  通过$.extend合并url新参数 新参数替换旧参数
            $scope.queryParams = $.extend({
                pageNum: 1,
                pageSize: 10
            }, $stateParams);

            //下拉菜单 查询选项
            $scope.queryOptions = {
                orderStatus: [
                    { name: '全部', value: '' },
                    { name: '已发布', value: '6000' },
                    { name: '待处理', value: '6100' }
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
                }).success(function(data, status, headers, config) {
                    $scope.orders = data.object;
                    $scope.resCode = data.resCode;
                });
                /*$http.get('/manage/repayingList-v4/json/get/getQingtuiPage', {
                    params: $.extend({}, params, { optDesc: '获取清退对账页面' })
                }).success(function(data, status, headers, config) {
                    $scope.orders = data.object;
                    $scope.resCode = data.resCode; //当resCode=1时，显示“确认收款”
                });*/
            }
            //初始化执行
            getData($scope.queryParams);

            //执行搜索方法
            $scope.search = function(event) {
                $scope.queryParams.pageNum = 1; //页码置为初始值
                getData($scope.queryParams); //执行
            };

            //清空查询项
            $scope.clearParams = function() {
                var pageSize = $scope.queryParams.pageSize;
                $scope.queryParams = {
                    pageNum: 1,
                    pageSize: pageSize
                }
            }

            //编辑
            $scope.editList = function(event, order) {
                var addModal = $modal.open({
                    template: __inline('tpl/editItem.html'),
                    controller: 'AddCtrl',
                    windowClass: 'screen',
                    resolve: {
                        order: function() {
                            return angular.copy(order);
                        }
                    }
                })
                addModal.result.then(function() {
                    getData($scope.queryParams);
                })
            }
            //通过打款
            app.registerController('AddCtrl', ['$scope', '$modalInstance', 'order',
                function($scope, $modalInstance, order) {
                    $scope.order = order;
                    $scope.errorInfo = "";


                    //下拉菜单 查询选项
                    $scope.queryOptionsq = {
                        orderStatus: [{
                            name: '--请选择--',
                            value: ''
                        }, {
                            name: '已发布',
                            value: '1'
                        }, {
                            name: '待处理',
                            value: '-1'
                        }],
                        videolebel: [{
                            value: '',
                            name: '--请选择--',
                        }, {
                            value: '1',
                            name: '宣传片'
                        }, {
                            value: '2',
                            name: '大型活动'
                        }, {
                            value: '3',
                            name: '评测'
                        }],
                    };

                    $scope.fiseOrders={};
                    //获得当前编辑视频信息
                    var params = {
                        videoId: order.videoId
                    };

                    $http.get("/api/video/basic", {
                        params: params
                    }).success(function(res) {
                        $scope.fiseOrders=res.object;
                        console.log($scope.fiseOrders)
                        // $.modalAlert('基本信息保存成功！')
                        // $modalInstance.close()
                    });

                    //保持信息
                    $scope.save=function(){
                        console.log($scope.fiseOrders)
                        $.modalAlert('基本信息保存成功！')
                        $modalInstance.close()
                    }
                    $scope.submit = function() {
                        var params = {
                            detailId: order.detailId,
                            checkResult: "1",
                            optDesc: '确认打款'
                        };
                        $http.get("/manage/repayingList-v4/json/get/checkWithDraw", {
                            params: params
                        }).success(function(res) {
                            $.modalAlert(res.message)
                            $modalInstance.close()
                        });
                    }
                }
            ])

            //删除数据
            $scope.deleteConfirm = function(event, order) {
                $.modalConfirm("你确认要删除吗？", function() {
                    $.modalAlert('删除成功')
                })
            }



            /**
             * 多选
             */
            $scope.allchecked = false;
            //单个检查
            $scope.acheck = function(order, checked) {
                order.checked = checked
                var allchecked = true;
                $($scope.orders.infoList).each(function(i, item) {
                    if (!item.checked) {
                        allchecked = false
                    }
                })
                $scope.allchecked = allchecked
            }
            //全选
            $scope.change = function(allchecked) {
                $scope.allchecked = allchecked
                $($scope.orders.infoList).each(function(i, item) {
                    item.checked = $scope.allchecked
                })
            }
            //全选导出
            $scope.exportall = function() {
                var arrId = []
                $($scope.orders.infoList).each(function(i, item) {
                    if (item.checked) {
                        arrId.push(item.videoId)
                    }
                })

                if (arrId.length == 0) {
                    $.modalAlert('您还没有选择！')
                } else {
                    $.modalConfirm("你确认要删除吗？", function() {
                        console.log(arrId)
                        //window.open('/manage/repayingList-v4/json/export/exportConfirmPayMoney/loanList_' + (new Date()).getTime() + '.xls?payCheckIdStr=' + arrId.join(","));
                        $.modalAlert('删除成功')
                    })

                }
            }



        }
    ]);
});