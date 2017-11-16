/**
 * app.js,定义app模块
 * @author yuebin
 */

//define(['angular', 'angular-couch-potato', 'angular-ui-router', 'angular-upload-file', 'angular-ui-bootstrap', 'angular-loading-bar','angular-multi-select', 'angular-ui-grid'], function(angular, couchPotato) {
define(['angular', 'angular-couch-potato', 'angular-ui-router', 'angular-upload-file', 'angular-ui-bootstrap', 'angular-uib-bootstrap','angular-loading-bar','angular-multi-select'], function(angular, couchPotato) {

    //定义angular模块
    //var app = angular.module('app', ['scs.couch-potato', 'ui.router', 'ui.bootstrap', 'ui.bootstrap.tpls', 'chieffancypants.loadingBar', 'angularFileUpload','isteven-multi-select', 'ui.grid','ui.grid.resizeColumns']);
    var app = angular.module('app', ['scs.couch-potato', 'ui.router', 'ui.bootstrap', 'ui.bootstrap.tpls', 'uib.bootstrap', 'uib.bootstrap.tpls','chieffancypants.loadingBar', 'angularFileUpload','isteven-multi-select']);
    // angular-ui-bootstrap datepicker config
    app.config(['datepickerConfig', 'datepickerPopupConfig', 'uibDatepickerPopupConfig', 'paginationConfig','cfpLoadingBarProvider',
        function(datepickerConfig, datepickerPopupConfig, uibDatepickerPopupConfig, paginationConfig, cfpLoadingBarProvider) {
            // ui-bootstrap datepicker global config
            datepickerConfig.showWeeks = false;
            datepickerConfig.startingDay = 1;
            datepickerConfig.dayTitleFormat = 'yyyy年MMMM';
            datepickerPopupConfig.showButtonBar = false;

            uibDatepickerPopupConfig.showButtonBar = true;
            uibDatepickerPopupConfig.clearText = '清空';
            uibDatepickerPopupConfig.closeText = '关闭';
            uibDatepickerPopupConfig.currentText = '今天';


            // ui-bootstrap pagination global config
            paginationConfig.maxSize = 5;
            paginationConfig.boundaryLinks = true;
            paginationConfig.itemsPerPage = 10;
            paginationConfig.previousText = '‹';
            paginationConfig.nextText = '›';
            paginationConfig.firstText = '«';
            paginationConfig.lastText = '»';

            //angular-loading-bar global config
            //cfpLoadingBarProvider.includeBar = false;
            cfpLoadingBarProvider.includeSpinner = false;
            //cfpLoadingBarProvider.parentSelector = '.body-view';
            //cfpLoadingBarProvider.latencyThreshold = '1000';
            //cfpLoadingBarProvider.spinnerTemplate = '<div class="modal-backdrop in loading-spinner"><span class="fa fa-spinner">Loading...</span></div>';


        }]);


    //couchPotato托管app，负责lazyload
    couchPotato.configureApp(app);

    return app;
});