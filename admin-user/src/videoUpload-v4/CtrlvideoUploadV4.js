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
    'directive/jrDatepicker',
    'directive/jrDropdownButton',
    'directive/jrPlaceholder',
    'angular-upload-file',
    'directive/ngThumb'
], function (app,citiesModule) {
    app.registerController('CtrlvideoUploadV4', ['$scope', '$rootScope', '$http', '$modal', '$stateParams', '$filter', '$state', '$sce','FileUploader', 'FileItem','$timeout',
        function ($scope, $rootScope, $http, $modal, $stateParams, $filter, $state, $sce,FileUploader, FileItem,$timeout) {
            $scope.flagIndex = $stateParams.flag;

            //tab切换页
            $scope.tabData = {
                videoPage: false,//上传视频
                moviePage: false,//上传电影
                albumPage: false,//上传专辑
                tvplayPage: false//上传电视剧
            };

            $scope.queryOptions = {
                videolebel: [
                    {value: '1', name: '宣传片'},
                    {value: '2', name: '大型活动'},
                    {value: '3', name: '评测'}
                ],
                videoStatus:[
                    {value: '1', name: '正常'},
                    {value: '2', name: '待审核'},
                    {value: '3', name: '已下架'}
                ],
                companyProvinceCode:citiesModule.get_provinces_from_dict(),
                companyCityCode:citiesModule.get_cities_by_code_from_dict("110000"),
                provinceCode:citiesModule.get_provinces_from_dict(),
                cityCode:citiesModule.get_cities_by_code_from_dict("110000")
            };


            $scope.save=function($event){
                //3秒内不能点击
                if ($($event.target).data('disabled')) {
                    return false;
                }
                $($event.target).data('disabled', true);
                setTimeout(function(){
                    $($event.target).data('disabled', false);
                },3000)
                $.modalAlert('请上传封面',function(){
                    window.close();
                    //提交后刷新主页面
                    //window.location.reload();
                })
            }


            $scope.userInfoInit=function(){
                //console.log($scope.tabData)
            }
            $scope.$watch('tabData', function(newValue, oldValue) {
                /*if (newValue === oldValue) {
                    return false;
                }
                $scope.queryParams.pageSize = newValue;
                getData($scope.queryParams)*/
            });






    }]);
});
