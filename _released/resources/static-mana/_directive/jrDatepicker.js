define(["app"],function(app){app.registerDirective("jrDatepicker",["$filter",function($filter){return{restrict:"E",replace:!0,template:'<p class="input-group datepicker datepick2" ng-click="datepicker($event)" ng-class="{open:opened}">\r\n    <span class="input-group-addon">{{title}}:</span>\r\n    <input type="text" class="form-control" placeholder="{{placeholder}}" datepicker-popup="{{datepickerFormat}}" ng-click="" ng-model="_time" is-open="opened" readonly />\r\n    <span class="input-group-btn">\r\n    </span>\r\n</p>',scope:{title:"@",placeholder:"@",format:"@",time:"="},link:function($scope){$scope.datepickerFormat=$scope.format||"yyyy-MM-dd",$scope._time="string"==typeof $scope.time?new Date($scope.time.replace(/-/g,"/")):$scope.time,$scope.datepicker=function(){$scope.opened=!0},$scope.$watch("_time",function(){$scope.time=$filter("date")($scope._time,$scope.datepickerFormat)}),$scope.$watch("time",function(){$scope._time=$scope.time,$scope.time=$filter("date")($scope._time,$scope.datepickerFormat)})}}}])});