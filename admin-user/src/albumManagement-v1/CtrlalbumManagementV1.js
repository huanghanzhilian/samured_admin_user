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
    app.registerController('CtrlalbumManagementV1', ['$scope', '$rootScope', '$http', '$modal', '$stateParams', '$filter', '$state', '$sce', 'FileUploader', 'FileItem', '$timeout',
        function($scope, $rootScope, $http, $modal, $stateParams, $filter, $state, $sce, FileUploader, FileItem, $timeout) {


            //查询参数  通过$.extend合并url新参数 新参数替换旧参数
            $scope.queryParams = $.extend({
                pageNum: 1,
                pageSize: 10
            }, $stateParams);


            //请求数据
            $scope.orders = {
                pageNum: 1,
                pageSize: 10
            };

            //获取数据
            function getData(params) {
                $http.get('/api/album/list', {
                    params: $.extend({}, params, { optDesc: '视频管理' })
                }).success(function(data, status, headers, config) {
                    console.log(data)
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

            //添加专辑
            $scope.addAlbum=function(){
                var addModal = $modal.open({
                    template: __inline('tpl/addAlbum.html'),
                    controller: 'addAlbumCtrl',
                    windowClass:'screen',
                })
                addModal.result.then(function() {
                    //getData($scope.queryParams);
                })
            }
            //添加专辑控制器
            app.registerController('addAlbumCtrl', ['$scope', '$modalInstance',
                function($scope, $modalInstance) {
                    $scope.errorInfo = "";
                    $scope.submit = function() {
                        var params = {
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



            //编辑
            $scope.editList = function(event, order) {
                var addModal = $modal.open({
                    template: __inline('tpl/editItem.html'),
                    controller: 'AddCtrl',
                    windowClass:'screen',
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
            $scope.deleteConfirm=function(event,order){
                $.modalConfirm("你确认要删除吗？", function() {
                    $.modalAlert('删除成功')
                })
            }




        }
    ]);
});