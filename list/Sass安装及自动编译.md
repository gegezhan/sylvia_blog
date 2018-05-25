# Sass 使用及自动编译（intellij idea/webstorm）
1.`sass`基于`Ruby`语言开发而成，因此安装`sass`前需要[安装Ruby](http://rubyinstaller.org/downloads)。（注:mac下自带Ruby无需在安装Ruby!）

window下安装SASS首先需要安装`Ruby`，先从官网[下载Ruby](http://rubyinstaller.org/downloads)并安装。安装过程中请注意勾选`Add Ruby executables to your PATH`添加到系统环境变量。

安装完成后，运行`CMD`输入`ruby -v`，测试是否安装成功，成功则显示版本，如下图：
![](http://upload-images.jianshu.io/upload_images/8879462-c6f4b3c3da66108f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

2.更换`gem`源为 https://rubygems.org/
`//1.删除原gem源  gem sources --remove https://rubygems.org/`
`//2.添加国内淘宝源  gem sources -a https://ruby.taobao.org/`
`//3.打印是否替换成功  gem sources -l`
`//4.更换成功后打印如下  *** CURRENT SOURCES ***  https://ruby.taobao.org/  `

3.全局安装 `sass` 和 `compass` ，执行 `gem install sass` 和 `gem install compass`，如下：
![](http://upload-images.jianshu.io/upload_images/8879462-9e2ffefcb5af19c7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](http://upload-images.jianshu.io/upload_images/8879462-eba5b27bb9187a74.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

4.确认 `sass` 和 `compass`安装成功：命令行输入：`sass --version`  `compass -v`验证
![](http://upload-images.jianshu.io/upload_images/8879462-e02c0583631de320.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](http://upload-images.jianshu.io/upload_images/8879462-0237ca8cead28f8d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

5.此处以 intellij idea 为例，使用其自动编译工具。
1）打开  intellij idea ，File => settings => Plugins ， 查看是否有 File Watchers 插件，没有的话，点击下方 Install JetBrains plugins 去安装。
![](http://upload-images.jianshu.io/upload_images/8879462-4aa3ef6ecc915676.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
2）安装成功后，列表显示出此插件。
![](http://upload-images.jianshu.io/upload_images/8879462-d087186cec9ec1d8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
3）settings => Tools => File Watchers ,点击右侧加号，添加 SCSS ，点击 OK。
![](http://upload-images.jianshu.io/upload_images/8879462-f5307b9a377cb1af.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
4）在弹出的 New Watcher => Watcher Setting => Program 处指向 Ruby 的安装地址，点击OK，配置完成。
![](http://upload-images.jianshu.io/upload_images/8879462-dc991a2ca200fdd6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

6.此时，再新建 scss 文件，会同时新建一个同名的 css 文件 和 map，直接引用 css文件即可。
![](http://upload-images.jianshu.io/upload_images/8879462-3ff1bcbdb702927f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

`Sass`安装参考：https://www.sass.hk/install/


















