1.
Q: 使用WebStorm直接Debug react-native项目的配置方法

A: [参考这里](https://blog.jetbrains.com/webstorm/2016/12/developing-mobile-apps-with-react-native-in-webstorm/)

2.
Q: 有一个 react-native-debugger 调试器

A: [传送门](https://github.com/jhen0409/react-native-debugger)

3.
Q: (报错)Unhandled JS Exception: Missing Realm constructor. Did you run "react-native link realm"? Please see https://realm.io/docs/react-native/latest/#missing-realm-constructor for troubleshooting

A: 暂无解，不要用WebStorm自己的调试器(与Realm冲突)，要用 Chrome 或者 react-native-debugger

4.
Q: react native this.setState will not re-render child component

A: [参考](https://stackoverflow.com/questions/30679927/react-native-this-setstate-will-not-re-render-child-component)

5.
Q: (报错)
```
Warning: PropTypes has been moved to a separate package. Accessing React.PropTypes is no longer supported and will be removed completely in React 16. Use the prop-types package on npm instead.
Warning: checkPropTypes has been moved to a separate package. Accessing React.checkPropTypes is no longer supported and will be removed completely in React 16. Use the prop-types package on npm instead.
Warning: React.createClass is no longer supported. Use a plain JavaScript class instead. If you're not yet ready to migrate, create-react-class is available on npm as a drop-in replacement.
```
A: [答案](https://stackoverflow.com/a/46380918/8799673)

6.
Q: (技巧) navigation bar 上面右边按钮的调用实例方法 / Best pattern for a 'Save' button in the header

A: [答案](https://github.com/react-community/react-navigation/issues/145#issuecomment-337826964)

7.
Q: React Native, absolute positioning horizontal centre. 用绝对定位实现水平居中的方法

A: [方案](https://stackoverflow.com/questions/37317568/react-native-absolute-positioning-horizontal-centre)

8.
Q: 当 "Debug JS Remotely" 并且用 "iOS simulator" 时，realm添加数据后，listener不会实时返回新数据。真机不会有问题。而且，不调试时也没有问题。

A: 暂无解

9.
Q: (报错) Native module cannot be null.

A: 有可能你写了这样的import语句: import * as Alert from "react-native";

10.
Q: Cannot read property undefined of undefined

A: [答案](https://github.com/react-community/react-navigation/issues/1919)

11. [debugger-ui 出错](http://bbs.reactnative.cn/topic/4038/debugger-ui-%E5%87%BA%E9%94%99/2)

12.