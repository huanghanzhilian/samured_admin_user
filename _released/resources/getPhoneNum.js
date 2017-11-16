/*
 author:caoke
 time:2017/3/20
 说明:通过4g网络获取用户的手机号码
 demo:
 $.getPhoneNum({
 //成功回调
 success:function(data){
 alert(JSON.stringify(data))
 },
 //网络错误及失败回调
 error:function(data){
 alert(JSON.stringify(data))
 }
 })
 * */
(function($){
    $.getPhoneNum=function(config){
        var config= $.extend({success:function(){},error:function(){}},config);
        var sign = config.data.sign;
        var appId = config.data.appId;
        //把客户端信息发送过去
        $.ajax({
            url:"http://www.meiyuefu.com/getphone",
            data:{
                appId:appId,
                sign:sign
            },
            dataType:"jsonp",
            complete: function () {
                _sync(5)
            }
        })
        //轮询结果，成功返回successCallback，失败继续轮询5次
        function _sync(num){
            setTimeout(function(){
                $.ajax({
                    url:"http://www.meiyuefu.com/getphone/query",
                    dataType:"jsonp",
                    data:{
                        appId:appId,
                        sign:sign
                    },
                    success:function(data){
                        if (data.success) {
                            config.success(data)
                        }else{
                            if(num>0){
                                _sync(--num)
                            }else{
                                config.error(data)
                            }
                        }
                    },
                    error:config.error
                })
            },1000)
        }
    }
})(typeof Zepto!="undefined"?Zepto:$)