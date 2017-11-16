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
    'dict.cities',
    'angular-upload-file',
    'directive/jrDatepicker',
    'directive/jrDropdownButton',
    'directive/jrPlaceholder',
    'angular-upload-file',
    'directive/ngThumb'
], function(app, citiesModule) {
    app.registerController('CtrlvideoUploadV1', ['$scope', '$rootScope', '$http', '$modal', '$stateParams', '$filter', '$state', '$sce', 'FileUploader', 'FileItem', '$timeout',
        function($scope, $rootScope, $http, $modal, $stateParams, $filter, $state, $sce, FileUploader, FileItem, $timeout) {

            //赛选
            /*$scope.queryOptions = {
                videolebel: [{
                    value: "0",
                    name: '--请选择--',
                    data:[{
                        value: "0",
                        name: '--请选择--',
                    }]
                }, {
                    value: '1',
                    name: '宣传片',
                    data:[{
                        value: "0",
                        name: '--请选择--',
                    },{
                        value: "1",
                        name: '宣传片11',
                    },{
                        value: "2",
                        name: '宣传片22',
                    }]
                }, {
                    value: '2',
                    name: '大型活动',
                    data:[{
                        value: "0",
                        name: '--请选择--',
                    },{
                        value: "1",
                        name: '大型活动11',
                    },{
                        value: "2",
                        name: '大型活动22',
                    }]
                }, {
                    value: '3',
                    name: '评测',
                    data:[{
                        value: "0",
                        name: '--请选择--',
                    },{
                        value: "1",
                        name: '评测11',
                    },{
                        value: "2",
                        name: '评测22',
                    }]
                }],
                videoStatus:[
                    {value: '1', name: '正常'},
                    {value: '2', name: '待审核'},
                    {value: '3', name: '已下架'}
                ],
                companyProvinceCode:citiesModule.get_provinces_from_dict(),
                companyCityCode:citiesModule.get_cities_by_code_from_dict("110000"),
                provinceCode:citiesModule.get_provinces_from_dict(),
                cityCode:citiesModule.get_cities_by_code_from_dict("110000")
            };*/
            $scope.names=[];
            //获取二级筛选
            $scope.get_tab=function(val){
                var obj=$scope.queryOptions.videolebel;
                for (var i = 0; i < obj.length; i++) {
                    if(obj[i].value==val){
                        $scope.df=obj[i].data;
                        console.log(obj[i].data)
                    }
                }
            }





            var uploader = $scope.uploader = new FileUploader({
                url: 'upload.php'
            });
            //uploader.options=112;
            // FILTERS
            /*uploader.filters.push({
                name: 'customFilter',
                fn: function(item , options) {
                    return this.queue.length < 10;
                }
            });*/
            $scope.fileNameChanged=function(q){
                //console.log($scope.uploader.queue)
                //console.dir(q.files.length)
            }


            $scope.$watch('uploaderApy', function(Val, nVal) {
                //console.log(Val)
            });


        }
    ]);
});