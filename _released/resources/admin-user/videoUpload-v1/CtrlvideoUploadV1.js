define(["app","dict.cities","angular-upload-file","directive/jrDatepicker","directive/jrDropdownButton","directive/jrPlaceholder","angular-upload-file","directive/ngThumb","directive/fileModel"],function(app){app.registerController("CtrlvideoUploadV1",["$scope","$rootScope","$http","$modal","$stateParams","$filter","$state","$sce","FileUploader","FileItem","$timeout",function($scope,$rootScope,$http,$modal,$stateParams,$filter,$state,$sce,FileUploader){$scope.queryOptions={videolebel:[{value:"0",name:"--请选择--",data:[{value:"0",name:"--请选择--"}]},{value:"1",name:"宣传片",data:[{value:"0",name:"--请选择--"},{value:"1",name:"宣传片11"},{value:"2",name:"宣传片22"}]},{value:"2",name:"大型活动",data:[{value:"0",name:"--请选择--"},{value:"1",name:"大型活动11"},{value:"2",name:"大型活动22"}]},{value:"3",name:"评测",data:[{value:"0",name:"--请选择--"},{value:"1",name:"评测11"},{value:"2",name:"评测22"}]}]},$scope.names=[],$scope.get_tab=function(val){for(var obj=$scope.queryOptions.videolebel,i=0;i<obj.length;i++)obj[i].value==val&&($scope.df=obj[i].data)};$scope.uploader=new FileUploader({url:"upload.php"});$scope.fileNameChanged=function(){},$scope.dataRemove=function(index){$scope.names.splice(index,1)},$scope.$watch("fileToUpload",function(Val){if(void 0!=Val)for(var i=0;i<Val.length;i++){var files=Val[i],arr={saixuan:$scope.queryOptions.videolebel,videoName:Val[i].name.replace(/(.avi|.mov|.mp4)$/,"")},obj={files:files,arr:arr};$scope.names.push(obj)}})}])});