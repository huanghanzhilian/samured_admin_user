// 发布时候采用不同的roadmap(线路图) ——即使用fis release -d publish时候
var staticsPath = '/admin-user';//静态资源路径
var pagePrePath = '/admin-user';//页面路径

//判断是否为生产模式
var isPublish = ['sandbox','publish'].indexOf(process.title.split(/\s/)[3]) != -1;


//如果是生产模式
if (isPublish) {
    staticsPath = '/_released/resources/static-mana';
    pagePrePath = '/_released/views/static-mana';
}

var MACHINE_MAP = {
    // 沙盒
    sandbox: {
        host:'http://127.0.0.1:8080',
        path:'D:/'
    }
};

//merge合并
fis.config.merge({
    statics: staticsPath,
    pagePrePath: pagePrePath,

    project: {
        exclude: [/\.(tar|rar|psd|jar|bat|sh|md)$/i, /^\/doc\/|\/dep\/est|.*\/\.demo\//i]
    },

    modules: {//模块

        parser: {
            less: 'less'
        },

        lint: {
            js: 'jshint',
            css: 'csslint'
        },

        preprocessor: {
            html: filePreprocessor
        },

        // postprocessor: {
        //     js: filePostprocessor
        // }
    },

    roadmap: {//路线图
        ext: {
            less: 'css'
        },

        path: [
            {
                reg: /^\/dep\/(.*)/i,
                url: '/admin-user/dep/$1',
                release: '${statics}/dep/$1',
                useCompile: false,
            },
            {
                 reg: /^\/manage\/(.*)/i,
                 release: isPublish?false:'/manage/$1'
            },
            {
                reg: /^\/src\/index\.html$/i,
                release: '${pagePrePath}/index.html'
            },

            {
                reg: /^\/src\/login\/login\.html$/i,
                release: '${pagePrePath}/login.html'
            },
            {
                reg: /^\/src\/land\/land\.html$/i,
                release: '${pagePrePath}/land.html'
            },
            {
                reg: /^\/src\/(.*)/i,
                url: '/admin-user/$1',
                release: '${statics}/$1'
            }
        ]
    },

    settings: {
        optimizer: {
            'uglify-js': {
                mangle: false,
                compress: {
                    drop_console: true,
                    drop_debugger: true
                }
            }
        },
        lint: {
            csslint: {
                // 若ie值为false，则忽略所有与IE兼容性相关的校验规则
                ie: false,
                // 要忽略的规则ID列表
                ignore: ['font-sizes', 'outline-none', 'compatible-vendor-prefixes', 'star-property-hack']
            }
        }
    },
    deploy: {
        publish : {
            exclude : /\/doc\/|\/test\/|.*\.test\.json|\/_directive\/tpl\/|\/_common\/component\/|\/_common\/less-config\.css|server\.conf|map\.json/i,
            //from参数省略，表示从发布后的根目录开始上传
            //发布到当前项目的上一级的output目录中
            to : '../'
        }
    }
});

// 8位时间戳，精确到2分钟的发布区分
var timestamp = new Date().getTime().toString().substr(0,8);




// 预处理器插件扩展，对vm文件替换版本戳
function filePreprocessor(content, file) {
    var contentStr;
    contentStr = content.replace(/\${__version__}/g, timestamp);
    return contentStr;
};



// 设置deploy节点
fis.util.map(MACHINE_MAP, function(key, item){
    var hostPath = item['path'] || '',
        hostName = item['host'],
        serverReceiver = hostName + '/fisreceiver.jsp',
    // 设置replace规则
        replaceFrom = /http:\/\/www\.58\.com|http:\/\/static\.58\.com/g,
        replaceTo = function(domain){
            switch(domain){
                case 'http://www.58.com':
                    return hostName;
                    break;
                case 'http://static.58.com':
                    return '';
                    break;
            }
        };

    fis.config.set('deploy.' + key, [{
        //如果配置了receiver，fis会把文件逐个post到接收端上
        receiver : serverReceiver,
        //从产出的结果的static目录下找文件
        from : '/resources/static',
        //上传目录从static下一级开始不包括static目录
        subOnly : true,
        //保存到远端机器的/home/fis/www/static目录下
        //这个参数会跟随post请求一起发送
        to : hostPath + '/resources/static',
        // replace
        replace: {
            from: replaceFrom,
            to: replaceTo
        }
    },{
        //如果配置了receiver，fis会把文件逐个post到接收端上
        receiver : serverReceiver,
        //从产出的结果的static目录下找文件
        from : '/views/static',
        //上传目录从static下一级开始不包括static目录
        subOnly : true,
        //保存到远端机器的/home/fis/www/static目录下
        //这个参数会跟随post请求一起发送
        to : hostPath + '/views/static',
        // replace
        replace: {
            from: replaceFrom,
            to: replaceTo
        }
    }
    ]);
});