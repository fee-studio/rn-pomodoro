1. Q: (报错)小米手机会这样：Failed to establish session

A: [参考这里](https://github.com/facebook/react-native/issues/6499)

2. Q: (报错) Error type 3. Activity class {com.awesome_project/ com.awesome_project.MainActivity} does not exist in react native (Android device)

A: [答案](https://stackoverflow.com/questions/35131769/error-type-3-activity-class-com-awesome-project-com-awesome-project-mainactiv)

3. Q: Android应用，在真机上运行时可能会遇到白屏的情况

A: 请找到并开启悬浮窗权限。比如miui系统的设置在[此处](https://jingyan.baidu.com/article/f25ef25466c0fc482d1b824d.html)。

4. Q: (报错如下)安装启动后就闪退。
```
java.lang.RuntimeException: Unable to load script from assets 'index.android.bundle'.
Make sure your bundle is packaged correctly or you're running a packager server.
```
A: react-native升级到0.50.x以上，原来的index.ios.js/index.android.js合并为index.js,后来打包的时候，想着为了统一，我把ios的bundle文件改为index.jsbundle，把android的bundle文件改为index.jsbundle。但是源码默认要找index.android.bundle，所以，相应的MainActivity.java中要重写相应的方法。

5. （报错）[参考](https://github.com/facebook/react-native/issues/6875)
```$javascript
* What went wrong:
Execution failed for task ':app:recordFilesBeforeBundleCommandDebug'.
> A problem occurred starting process 'command 'node''
```
   
