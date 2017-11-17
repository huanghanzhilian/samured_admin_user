# 使用技术

AngularJS + jr8 + java +less


# 项目运行


```
安装java jdk,下载地址
http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html
输入java -v，显示版本号，安装成功    java -version


安装jr8,执行命令
npm install jr8 -g
npm install fis-postpackager-simple -g

jr8 server start(启动项目/默认为8080端口)
或者制定端口
jr8 server start -p 8081
jr8 release -wc(执行热加载)
```



# 说明

>  如果对您有帮助，您可以点右上角 "Star" 支持一下 谢谢！ ^_^

>  或者您可以 "follow" 一下，我会不断开源更多的有趣的项目

>  开发环境 window 10  Chrome 56  nodejs 6.10.0


>  如有问题请直接在 Issues 中提，或者您发现问题并有非常好的解决方案，欢迎 PR

>  项目交流群：476190214(QQ)

>  此项目总结了一些技术文档，可以去我的博客看看。[地址在这里](http://huanghanlian.com/)




# 效果演示

未发布，请等候



# 项目布局

```
.
├── api                                               //模拟数据
├── dep                                               //依赖的库
├── fis-conf.js                                       //jr8 构建生产与发布配置
├── publish.bat                                       //生产环境发布脚本
├── release.bat                                       //开发环境脚本
├── sec                                               //源码所存放的目录
│   ├── data                                          //存放假数据
│   ├── image                                         //图片存放目录
│   ├── script                                        //js存放目录
│   │   ├── config                                    //启动项目的配置文件目录 app.js启动时候读取配置信息
│   │   ├── controller                                //控制器目录
│   │   ├── directive                                 //指令目录
│   │   ├── filter                                    //过滤器目录
│   │   ├── service                                   //服务目录
│   │   ├── app.js                                    //启动程序入口文件
│   ├── style                                         //存放样式目录
│   ├── view                                          //存放html文件  html片段
├── ├── 404.html                                      //404页面 页面入口
├── ├── index.html                                    //页面入口
├── test                                              //存放单元测试和集成测试代码
├── .eslintrc                                         //校验js语法风格是否符合配置文件的要求
├── .gitignore                                        //git发布忽略文件
├── bower.json                                        //bower的配置文件
├── gulpfile.js                                       //gulp配置文件
├── package.json                                      //node插件配置文件
.
```