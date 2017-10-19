## ===== react-native =====
##### Q: 使用WebStorm直接Debug react-native项目的配置方法
A: [参考这里](https://blog.jetbrains.com/webstorm/2016/12/developing-mobile-apps-with-react-native-in-webstorm/)

##### Q: 有一个 react-native-debugger 调试器
A: [传送门](https://github.com/jhen0409/react-native-debugger)

##### Q: (报错)Unhandled JS Exception: Missing Realm constructor. Did you run "react-native link realm"? Please see https://realm.io/docs/react-native/latest/#missing-realm-constructor for troubleshooting
A: 不要用WebStorm自己的调试器(与Realm冲突)，要用 Chrome 或者 react-native-debugger

##### Q: react native this.setState will not re-render child component
A: [参考](https://stackoverflow.com/questions/30679927/react-native-this-setstate-will-not-re-render-child-component)

##### Q: (报错)
```
Warning: PropTypes has been moved to a separate package. Accessing React.PropTypes is no longer supported and will be removed completely in React 16. Use the prop-types package on npm instead.
Warning: checkPropTypes has been moved to a separate package. Accessing React.checkPropTypes is no longer supported and will be removed completely in React 16. Use the prop-types package on npm instead.
Warning: React.createClass is no longer supported. Use a plain JavaScript class instead. If you're not yet ready to migrate, create-react-class is available on npm as a drop-in replacement.
```

A: [答案](https://stackoverflow.com/a/46380918/8799673)

##### Q: (技巧) navigation bar 上面右边按钮的调用实例方法 / Best pattern for a 'Save' button in the header
A: [答案](https://github.com/react-community/react-navigation/issues/145#issuecomment-337826964)

##### Q: React Native absolute positioning horizontal centre
A: [方案](https://stackoverflow.com/questions/37317568/react-native-absolute-positioning-horizontal-centre)

##### Q:
A:

##### Q:
A:

##### Q:
A:

##### Q:
A:


## ===== iOS =====

##### Q: React库的管理方法
A: React库不要用Pod去管理，会有一些文件找不到，用子项目的方式来添加到Libraries下面，记得把.a文件加到Build Phases -> Link Binary With Libraries下面。
   当然，也可以自动去Link， [参考这里](http://facebook.github.io/react-native/docs/linking-libraries-ios.html#content)

##### Q:
A:

##### Q:
A:





## ===== Android =====

##### Q: (报错)小米手机会这样：Failed to establish session
A: [参考这里](https://github.com/facebook/react-native/issues/6499)

##### Q: (报错) Error type 3. Activity class {com.awesome_project/ com.awesome_project.MainActivity} does not exist in react native (Android device)
A: [答案](https://stackoverflow.com/questions/35131769/error-type-3-activity-class-com-awesome-project-com-awesome-project-mainactiv)

##### Q:
A:

##### Q:
A:

##### Q:
A:
