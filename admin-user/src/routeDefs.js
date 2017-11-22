/**
 * routeDefs.js 路由定义
 * @description 该app为SPA，single page application
 * 路由完全有前端控制，此处配置**路由**
 */
define(['app'], function(app) {
    app.registerProvider('routeDefs', [
        '$stateProvider',
        '$urlRouterProvider',
        '$couchPotatoProvider',
        function($stateProvider, $urlRouterProvider, $couchPotatoProvider) {
            this.$get = function() {
                // this is a config-time-only provider
                // in a future sample it will expose runtime information to the app
                return {};
            };
            // $locationProvider.html5Mode(true);

            $urlRouterProvider.otherwise('welcome');

            // a uniform empty tpl for inherit
            var emptyTplInherit = '/admin-user/empty-tpl-inherit.html';

            // 清退对账
            $stateProvider.state('welcome', {
                    url: '/welcome',
                    templateUrl: function(stateParams) {
                        return '/admin-user/welcome/welcome.html';
                    }
                })

                //上传视频
                .state('videoUpload', {
                    url: '/videoUpload',
                    abstract: true,
                    templateUrl: emptyTplInherit
                }).state('videoUpload.list', {
                    url: '',
                    templateUrl: '/admin-user/videoUpload-v1/videoUpload-v1.html',
                    controller: 'CtrlvideoUploadV1',
                    resolve: {
                        ctrl: $couchPotatoProvider.resolveDependencies(['/admin-user/videoUpload-v1/CtrlvideoUploadV1.js'])
                    }
                })


                //视频管理
                .state('videoManagement', {
                    url: '/videoManagement',
                    abstract: true,
                    templateUrl: emptyTplInherit
                }).state('videoManagement.list', {
                    url: '?pageNum',
                    templateUrl: '/admin-user/videoManagement-v1/videoManagement-v1.html',
                    controller: 'CtrlvideoManagementV1',
                    resolve: {
                        ctrl: $couchPotatoProvider.resolveDependencies(['/admin-user/videoManagement-v1/CtrlvideoManagementV1.js'])
                    }
                })

                //专辑管理
                .state('albumManagement', {
                    url: '/albumManagement',
                    abstract: true,
                    templateUrl: emptyTplInherit
                }).state('albumManagement.list', {
                    url: '?pageNum',
                    templateUrl: '/admin-user/albumManagement-v1/albumManagement-v1.html',
                    controller: 'CtrlalbumManagementV1',
                    resolve: {
                        ctrl: $couchPotatoProvider.resolveDependencies(['/admin-user/albumManagement-v1/CtrlalbumManagementV1.js'])
                    }
                })
                //专辑管理页
                .state('albumManagementManage', {
                    url: '/albumManagementManage',
                    abstract: true,
                    templateUrl: emptyTplInherit
                }).state('albumManagementManage.list', {
                    url: '?albumId&albumName&pageNum',
                    templateUrl: '/admin-user/albumManagementManage-v1/albumManagementManage-v1.html',
                    controller: 'CtrlalbumManagementManageV1',
                    resolve: {
                        ctrl: $couchPotatoProvider.resolveDependencies(['/admin-user/albumManagementManage-v1/CtrlalbumManagementManageV1.js'])
                    }
                })
                //专辑管理页 添加视频页
                .state('albumManagementAddVideo', {
                    url: '/albumManagementAddVideo',
                    abstract: true,
                    templateUrl: emptyTplInherit
                }).state('albumManagementAddVideo.list', {
                    url: '?albumId&albumName&pageNum',
                    templateUrl: '/admin-user/albumManagementAddVideo-v1/albumManagementAddVideo-v1.html',
                    controller: 'CtrlalbumManagementAddVideoV1',
                    resolve: {
                        ctrl: $couchPotatoProvider.resolveDependencies(['/admin-user/albumManagementAddVideo-v1/CtrlalbumManagementAddVideoV1.js'])
                    }
                })

                //我的平台
                .state('userView', {
                    url: '/userView',
                    abstract: true,
                    templateUrl: emptyTplInherit
                }).state('userView.list', {
                    url: '?albumId&albumName&pageNum',
                    templateUrl: '/admin-user/userView-v1/userView-v1.html',
                    controller: 'CtrluserViewV1',
                    resolve: {
                        ctrl: $couchPotatoProvider.resolveDependencies(['/admin-user/userView-v1/CtrluserViewV1.js'])
                    }
                })





                //进件审核
                .state('order', {
                    url: '/order',
                    abstract: true,
                    templateUrl: emptyTplInherit
                }).state('order.list', {
                    url: '?beginCheckStartTime&beginCheckEndTime&cityKey&companyKey&userKeypageNum&pageSize',
                    templateUrl: '/admin-user/order-v4/order-v4.html',
                    controller: 'CtrlOrderV4',
                    resolve: {
                        ctrl: $couchPotatoProvider.resolveDependencies(['/admin-user/order-v4/CtrlOrderV4.js'])
                    }
                }).state('order.check', {
                    url: '/{orderId:[0-9]+}?{flag:[0-9]+}&status',
                    templateUrl: '/admin-user/order-check-v4/order-check-v4.html',
                    controller: 'CtrlOrderCheckV4',
                    resolve: {
                        ctrl: $couchPotatoProvider.resolveDependencies(['/admin-user/order-check-v4/CtrlOrderCheckV4.js'])
                    }
                })
                //清退对账
                .state('repayingList', {
                    url: '/repayingList',
                    abstract: true,
                    templateUrl: emptyTplInherit
                }).state('repayingList.list', {
                    url: '?userKey&agentKey&companyKey&orderStatus&qingtuiStartTime&qingtuiEndTime&pageNum&pageSize',
                    templateUrl: '/admin-user/repaying-list-v4/repayingList-v4.html',
                    controller: 'CtrlRepayingListV4',
                    resolve: {
                        ctrl: $couchPotatoProvider.resolveDependencies(['/admin-user/repaying-list-v4/CtrlRepayingListV4.js'])
                    }
                })
                //放款功能
                .state('loanList', {
                    url: '/loanList',
                    abstract: true,
                    templateUrl: emptyTplInherit
                }).state('loanList.list', {
                    url: '?companyKey&agentKey&payStatus&payStartTime&payEndTime&pageNum&pageSize',
                    templateUrl: '/admin-user/loan-list/loan-list.html',
                    controller: 'loanList',
                    resolve: {
                        ctrl: $couchPotatoProvider.resolveDependencies(['/admin-user/loan-list/loan-list.js'])
                    }
                })
                //提现列表
                .state('withDraw', {
                    url: '/withDraw',
                    abstract: true,
                    templateUrl: emptyTplInherit
                }).state('withDraw.list', {
                    url: '?companyKey&agentKey&withDrawStatus&withDrawStartTime&withDrawEndTime&pageNum&pageSize',
                    templateUrl: '/admin-user/withDraw/withDraw.html',
                    controller: 'withDraw',
                    resolve: {
                        ctrl: $couchPotatoProvider.resolveDependencies(['/admin-user/withDraw/withDraw.js'])
                    }
                })
                //订单管理
                .state('user', {
                    url: '/user',
                    abstract: true,
                    templateUrl: emptyTplInherit
                }).state('user.list', {
                    url: '?userKey&agentKey&companyKey&orderStartTime&orderEndTime&orderStatus&informTimeStart&informTimeEnd&date&orderIds&pageNum&pageSize',
                    templateUrl: '/admin-user/user-v4/user-v4.html',
                    controller: 'CtrlUserV4',
                    resolve: {
                        ctrl: $couchPotatoProvider.resolveDependencies(['/admin-user/user-v4/CtrlUserV4.js'])
                    }
                })


        }
    ]);
    //end for define
});