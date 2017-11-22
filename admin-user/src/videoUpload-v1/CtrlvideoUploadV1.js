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
    'directive/ngThumb',
    'directive/fileModel'
], function(app, citiesModule) {
    app.registerController('CtrlvideoUploadV1', ['$scope', '$rootScope', '$http', '$modal', '$stateParams', '$filter', '$state', '$sce', 'FileUploader', 'FileItem', '$timeout',
        function($scope, $rootScope, $http, $modal, $stateParams, $filter, $state, $sce, FileUploader, FileItem, $timeout) {
            //赛选
            $scope.queryOptions = {
                videolebel: [{
                    value: "0",
                    name: '--请选择--',
                    data: [{
                        value: "0",
                        name: '--请选择--',
                    }]
                }, {
                    value: '1',
                    name: '宣传片',
                    data: [{
                        value: "0",
                        name: '--请选择--',
                    }, {
                        value: "1",
                        name: '宣传片11',
                    }, {
                        value: "2",
                        name: '宣传片22',
                    }]
                }, {
                    value: '2',
                    name: '大型活动',
                    data: [{
                        value: "0",
                        name: '--请选择--',
                    }, {
                        value: "1",
                        name: '大型活动11',
                    }, {
                        value: "2",
                        name: '大型活动22',
                    }]
                }, {
                    value: '3',
                    name: '评测',
                    data: [{
                        value: "0",
                        name: '--请选择--',
                    }, {
                        value: "1",
                        name: '评测11',
                    }, {
                        value: "2",
                        name: '评测22',
                    }]
                }],

            };
            $scope.names = [];
            //获取二级筛选
            $scope.get_tab = function(val) {
                var obj = $scope.queryOptions.videolebel;
                for (var i = 0; i < obj.length; i++) {
                    if (obj[i].value == val) {
                        $scope.df = obj[i].data;
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
            $scope.fileNameChanged = function(q) {
                //console.log($scope.uploader.queue)
                //console.dir(q.files.length)
            }
            $scope.dataRemove = function(index) {
                console.log(index)
                $scope.names.splice(index, 1);
            }


            /*$scope.$watch('fileToUpload', function(Val, nVal) {
                if (Val != undefined) {
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
                }

            });*/


            // 七牛 s
            //引入Plupload 、qiniu.js后
            var uploader = Qiniu.uploader({
                runtimes: 'html5,flash,html4', //上传模式,依次退化
                browse_button: 'pickfiles', //上传选择的点选按钮，**必需**
                //uptoken_url: 'uptoken', //Ajax请求upToken的Url，**强烈建议设置**（服务端提供）
                uptoken:'cLSEU0YNM_ZJiMax9Pc6d_N7nnhMGGz9D95lFrN-:VFGsPf8SCtSm95mHv36XCiNvER4=:eyJzY29wZSI6Imh1YW5nIiwiZGVhZGxpbmUiOjE1MTEzNDkwOTR9',
                // uptoken : '', //若未指定uptoken_url,则必须指定 uptoken ,uptoken由其他程序生成
                // unique_names: true, // 默认 false，key为文件名。若开启该选项，SDK为自动生成上传成功后的key（文件名）。
                // save_key: true,   // 默认 false。若在服务端生成uptoken的上传策略中指定了 `sava_key`，则开启，SDK会忽略对key的处理
                domain: 'http://test.huanghanlian.com/', //bucket 域名，下载资源时用到，**必需**
                get_new_uptoken: false, //设置上传文件的时候是否每次都重新获取新的token
                container: 'container', //上传区域DOM ID，默认是browser_button的父元素，
                max_file_size: '100mb', //最大文件体积限制
                flash_swf_url: 'js/plupload/Moxie.swf', //引入flash,相对路径
                max_retries: 3, //上传失败最大重试次数
                dragdrop: true, //开启可拖曳上传
                drop_element: 'container', //拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
                chunk_size: '4mb', //分块上传时，每片的体积
                auto_start: false, //选择文件后自动上传，若关闭需要自己绑定事件触发上传
                mimeLimit :'image/jpeg;image/png',
                init: {
                    'FilesAdded': function(up, files) {
                        //alert(JSON.stringify(up))
                        //alert(JSON.stringify(files))
                        plupload.each(files, function(file) {
                            $scope.$apply(function() {
                                $scope.names.push(file);
                                console.log($scope.names.length)
                            });
                            
                            //alert(JSON.stringify(file))
                            // 文件添加进队列后,处理相关的事情
                        });
                    },
                    'BeforeUpload': function(up, file) {
                        // 每个文件上传前,处理相关的事情
                    },
                    'UploadProgress': function(up, file) {
                        // 每个文件上传时,处理相关的事情
                    },
                    'FileUploaded': function(up, file, info) {
                        // 每个文件上传成功后,处理相关的事情
                        // 其中 info.response 是文件上传成功后，服务端返回的json，形式如
                        // {
                        //    "hash": "Fh8xVqod2MQ1mocfI4S4KpRL6D98",
                        //    "key": "gogopher.jpg"
                        //  }
                        // 参考http://developer.qiniu.com/docs/v6/api/overview/up/response/simple-response.html
                        console.log(info.response)
                        // var domain = up.getOption('domain');
                        // var res = parseJSON(info.response);
                        // var sourceLink = domain + res.key; 获取上传成功后的文件的Url
                    },
                    'Error': function(up, err, errTip) {
                        //上传出错时,处理相关的事情
                    },
                    'UploadComplete': function() {
                        //队列文件处理完毕后,处理相关的事情
                    },
                    'Key': function(up, file) {
                        // 若想在前端对每个文件的key进行个性化处理，可以配置该函数
                        // 该配置必须要在 unique_names: false , save_key: false 时才生效

                        var key = "";
                        // do something with key here
                        return key
                    }
                }
            });
            //开始
            $('#pickfilesaaa').on('click', function() {
                uploader.start();
            });
            // 七牛 e

            



        }
    ]);
});