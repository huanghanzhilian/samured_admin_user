define(["app"],function(app){app.registerFactory("paramList",["$http",function($http){return{get:function(paramstr){return $http({method:"get",url:"/rs/paramlist",params:{params:paramstr}})}}}])});