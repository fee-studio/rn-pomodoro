# rn-pomodoro
Pomodoro App powered by react-native.

### TODO LIST

- [x] 信鸽推送4.x版本
- [] 小米渠道集成
- [] 华为、魅族、小米渠道集成测试


### 注意事项

- 阿里iconfont的使用for Android 请[参考这里](https://www.cnblogs.com/ImaY/p/9090311.html)
- python版本的切换与管理请使用：`pyenv -h`


### Skills

- yarn更新依赖包时，package.json同步更新版本信息
    ```
    yarn upgrade-interactive --latest
    ```

### 项目技术栈

- iOS/Android - Objective-C/Swift/Java/Kotlin
    - 基础

- JavaScript - ES2015/ES6
    - [ECMAScript6入门教程](http://es6.ruanyifeng.com/#docs/object)
    - [JavaScript教程](http://www.runoob.com/js/js-tutorial.html)
    - [React/React Native的ES5 ES6写法对照表](http://bbs.reactnative.cn/topic/15/react-react-native-的es5-es6写法对照表)
    - [ES6的十大特性](http://geek.csdn.net/news/detail/239352)

- React - JavaScript/JSX语法/HTML/CSS
    - [React入门实例教程](http://www.ruanyifeng.com/blog/2015/03/react.html)
    - [React官方教程](https://reactjs.org/)

- ReactNative - React
    - [ReactNative中文文档](http://reactnative.cn/docs/0.48/getting-started.html)
    - [ReactNative官方文档](http://facebook.github.io/react-native/docs/getting-started.html)
    - [react-native-guide](https://github.com/reactnativecn/react-native-guide)

- 【进阶】Redux - 组件之间的通信
    - [Redux入门教程](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_one_basic_usages.html)
    - [Redux中文教程](http://www.redux.org.cn/docs/basics/index.html)

- Node/NPM - 项目、包管理
    - [暂无]()

- 热更新
    - [CodePush](http://microsoft.github.io/code-push/index.html#getting_started)
    - []()

- 其他
    - [React Native专题文章](http://www.hangge.com/blog/cache/category_76_1.html)
    - [React Native - Text组件使用详解（样式、属性、方法）](http://www.hangge.com/blog/cache/detail_1486.html)
    - [React Native布局详细指南](http://blog.csdn.net/quanqinyang/article/details/52215641)

### 开发增强

- 参考资料
    - [ReactNative 调用 Android 原生模块](https://juejin.im/entry/58f855585c497d0058e26080)


- 开发素材
    - [图标优先从这里选](http://www.iconfont.cn/collections/detail?spm=a313x.7781069.1998910419.d9df05512&cid=2706)


- 优秀的第三方库
    - [x] [realm](https://github.com/realm/realm-js)
        > 持久化方案，数据库
    - [x] [react-navigation](https://github.com/react-community/react-navigation)
        > 使用最多的导航栏，比官网的要好
    - [x] [react-native-sqlite-storage](https://github.com/andpor/react-native-sqlite-storage)
        > sqlite数据库
    - [x] [react-native-storage](https://github.com/sunnylqm/react-native-storage)
        > 这是一个本地持久存储的封装，可以同时支持 react-native(AsyncStorage)和浏览器(localStorage)。ES6 语法，promise 异步读取，使用 jest 进行了完整的单元测试。
    - [x] [react-native-splash-screen](https://github.com/crazycodeboy/react-native-splash-screen)
        > 启动屏
    - [x] [react-native-image-progress](https://github.com/oblador/react-native-image-progress)
    - [x] [react-native-circular-progress](https://github.com/bgryszko/react-native-circular-progress)
    - [x] [react-native-progress](https://github.com/oblador/react-native-progress)
    - [x] [react-native-image-picker](https://github.com/react-community/react-native-image-picker)
    - [x] [react-native-picker](https://github.com/beefe/react-native-picker)
    - [x] [react-native-easy-toast](https://github.com/crazycodeboy/react-native-easy-toast)
        > Toast组件
    - [x] [react-native-device-info](https://github.com/rebeccahughes/react-native-device-info)
        > 设备的信息
    - [x] [react-native-push-notification](https://github.com/zo0r/react-native-push-notification)
        > 推送
    - [x] [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons)
        > 图标库 阿里iconfont的使用for Android 请[参考这里](https://www.cnblogs.com/ImaY/p/9090311.html)
    - [x] [react-native-modal-datetime-picker](https://github.com/mmazzarolo/react-native-modal-datetime-picker)
    - [x] [react-native-tab-view](https://github.com/react-native-community/react-native-tab-view)
    - [x] [redux-thunk](https://github.com/gaearon/redux-thunk)
    - [x] [redux-logger](https://github.com/evgenyrodionov/redux-logger)
    - [ ] [Ant Design Mobile of React](https://mobile.ant.design/index-cn)
    - [ ]  [NativeBase](https://github.com/GeekyAnts/NativeBase)
        > 一个不错的UI组件库，以后可以试试看


- iOS发布部署流程

   0. js打包```--bundle-output ios/index.jsbundle``` 这里千万不要写默认的```main.jsbundle```, iOS打包的时候打不进去.
   1. add index.jsbundle(/.meta) files -> option **Create groups**
   2. add assets folder -> option **Create folder references**
   3. modify info.plist -> delete **localhost** key item
        ```
        <key>NSExceptionDomains</key>
        <dict>
            <key>localhost</key>
            <dict>
                <key>NSExceptionAllowsInsecureHTTPLoads</key>
                <true/>
            </dict>
        </dict>
        ```
   4. **edit scheme**, modify **Run** TAB's **Build Configuration** to **Release**
    
- Android发布部署流程

    1. Open Android project use Android Studio, Build->Generate Signed Apk, config sign~
    2. [打包APK](http://reactnative.cn/docs/0.50/signed-apk-android.html#content)
        
- [开发自己的react-native组件并发布到npm](https://juejin.im/entry/5b908229f265da0a92238a93)

### iOS注意事项

-

### Android注意事项

- 打渠道包的方式
    1. [x]  [fastlane](https://github.com/fastlane/fastlane)
    2. [] [walle](https://github.com/Meituan-Dianping/walle)
