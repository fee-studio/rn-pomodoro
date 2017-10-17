## ===== react-native =====
##### Q: 使用WebStorm直接Debug react-native项目的配置方法
A: [参考这里](https://blog.jetbrains.com/webstorm/2016/12/developing-mobile-apps-with-react-native-in-webstorm/)

##### Q: 有一个 react-native-debugger 调试器
A: [传送门](https://github.com/jhen0409/react-native-debugger)

##### Q: (报错)Unhandled JS Exception: Missing Realm constructor. Did you run "react-native link realm"? Please see https://realm.io/docs/react-native/latest/#missing-realm-constructor for troubleshooting
A: 不要用WebStorm自己的调试器(与Realm冲突)，要用 Chrome 或者 react-native-debugger

##### Q: react native this.setState will not re-render child component
A: [参考](https://stackoverflow.com/questions/30679927/react-native-this-setstate-will-not-re-render-child-component)

##### Q:
A:


## ===== iOS =====

##### Q: React库的管理方法
A: React库不要用Pod去管理，会有一些文件找不到，用子项目的方式来添加到Libraries下面，记得把.a文件加到Build Phases -> Link Binary With Libraries下面。
   当然，也可以自动去Link， [参考这里](http://facebook.github.io/react-native/docs/linking-libraries-ios.html#content)

##### Q: React Native absolute positioning horizontal centre
A: [方案](https://stackoverflow.com/questions/37317568/react-native-absolute-positioning-horizontal-centre)

##### Q:
A:

##### Q:
A:





## ===== Android =====

##### Q: (报错) Failed to establish session
A: [参考这里](https://github.com/facebook/react-native/issues/6499)

##### Q: (报错) Error type 3. Activity class {com.awesome_project/ com.awesome_project.MainActivity} does not exist in react native (Android device)
A: [答案](https://stackoverflow.com/questions/35131769/error-type-3-activity-class-com-awesome-project-com-awesome-project-mainactiv)

##### Q:
A:

##### Q:
A:

##### Q:
A:
