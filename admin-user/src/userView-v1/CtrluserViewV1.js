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
    app.registerController('CtrluserViewV1', ['$scope', '$rootScope', '$http', '$modal', '$stateParams', '$filter', '$state', '$sce', 'FileUploader', 'FileItem', '$timeout',
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

            //是否为编辑状态
            $scope.isEditStatus = false;

            //编辑
            $scope.edit = function() {
                $scope.isEditStatus = !$scope.isEditStatus;
            }
            //取消编辑
            $scope.cancel = function() {
                $scope.isEditStatus = false;
            }
            //请求数据
            /*$scope.orders = {
                pageNum: 1,
                pageSize: 10
            };*/

            //获取uptoken
            /*$http.get('/uptoken', {
                
            }).success(function(data, status, headers, config) {
                $scope.uptoken=data.uptoken;
            });*/

            //获取数据
            function getData(params) {
                $http.get('/api/video/userInfo', {
                    params: $.extend({}, params, { optDesc: '视频管理' })
                }).success(function(data, status, headers, config) {
                    $scope.orders = data.object;
                    $scope.resCode = data.resCode;
                });
            }
            //初始化执行
            getData($scope.queryParams);



            $scope.reader = new FileReader(); //创建一个FileReader接口
            $scope.thumb = ''; //用于存放图片的base64
            $scope.img_upload = function(files) { //单次提交图片的函数
                $scope.thumb = '';
                $scope.orders.guid = (new Date()).valueOf(); //通过时间戳创建一个随机数，作为键名使用
                $scope.reader.readAsDataURL(files[0]); //FileReader的方法，把图片转成base64
                $scope.reader.onload = function(ev) {
                    $scope.$apply(function() {
                        $scope.thumb=ev.target.result; //接收base64
                    });
                };

                var data = new FormData(); //以下为像后台提交图片数据
                data.append('file', files[0]);
                data.append('key', $scope.guid);
                /*data.append('token', $scope.uptoken);
                $http({
                    method: 'post',
                    url: 'http://upload.qiniu.com/',
                    data: data,
                    headers: { 'Content-Type': undefined },
                    transformRequest: angular.identity
                }).success(function(data) {
                    if (data) {
                        alert("成功：" + JSON.stringify(res));
                        // $scope.form.image[data.guid] = data.result_value;
                        // $scope.thumb[data.guid].status = 'SUCCESS';
                        // console.log($scope.form)
                    }
                })*/
            };



            $scope.readera = new FileReader(); //创建一个FileReader接口
            $scope.thumb = ''; //用于存放图片的base64
            $scope.img_uploada = function(files) { //单次提交图片的函数
                $scope.thumba = '';
                $scope.orders.guida = (new Date()).valueOf(); //通过时间戳创建一个随机数，作为键名使用
                $scope.readera.readAsDataURL(files[0]); //FileReader的方法，把图片转成base64
                $scope.readera.onload = function(ev) {
                    $scope.$apply(function() {
                        $scope.thumba=ev.target.result; //接收base64
                    });
                };
            };

            $scope.save=function(){
                alert(JSON.stringify($scope.orders))
            }

            $scope.$watch('fileToUpload', function(Val, nVal) {
                //console.log(Val)
                /*if (Val != undefined) {
                    for (var i = 0; i < Val.length; i++) {
                        var files = Val[i]
                        var arr = { saixuan: $scope.queryOptions.videolebel, videoName: Val[i].name.replace(/(.avi|.mov|.mp4)$/, '') };
                        var obj = { files: files, arr: arr }
                        $scope.names.push(obj);
                        console.log($scope.names)
                    }
                    //console.log(Val[0])
                    // console.log(Val instanceof Object)
                    //$scope.names.push(Val);
                }*/

            });



        }
    ]);
});