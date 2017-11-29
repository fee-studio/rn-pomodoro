1. 使用WebStorm直接Debug react-native项目的配置方法

    [参考这里](https://blog.jetbrains.com/webstorm/2016/12/developing-mobile-apps-with-react-native-in-webstorm/)

    还要注意一点,需要在WebStorm配置Environment:
    ```
    REACT_DEBUGGER=node /Applications/WebStorm.app/Contents/plugins/JavaScriptDebugger/proxy/launcher.js --port 9527 --type ReactNative
    ```

2. 又一个 react-native-debugger 调试器

    [传送门](https://github.com/jhen0409/react-native-debugger)
    ```
    REACT_DEBUGGER=open -g 'rndebugger://set-debugger-loc?port=8001'
    ```
3. (报错)Unhandled JS Exception: Missing Realm constructor. Did you run "react-native link realm"? Please see https://realm.io/docs/react-native/latest/#missing-realm-constructor for troubleshooting

    暂无解，不要用WebStorm自己的调试器(与Realm冲突)，要用 Chrome 或者 react-native-debugger

4. react native this.setState will not re-render child component

    [参考](https://stackoverflow.com/questions/30679927/react-native-this-setstate-will-not-re-render-child-component)

5. (报错)
    ```
    Warning: PropTypes has been moved to a separate package. Accessing React.PropTypes is no longer supported and will be removed completely in React 16. Use the prop-types package on npm instead.
    Warning: checkPropTypes has been moved to a separate package. Accessing React.checkPropTypes is no longer supported and will be removed completely in React 16. Use the prop-types package on npm instead.
    Warning: React.createClass is no longer supported. Use a plain JavaScript class instead. If you're not yet ready to migrate, create-react-class is available on npm as a drop-in replacement.
    ```
    [答案](https://stackoverflow.com/a/46380918/8799673)

6. (技巧) navigation bar 上面右边按钮的调用实例方法 / Best pattern for a 'Save' button in the header

    [答案](https://github.com/react-community/react-navigation/issues/145#issuecomment-337826964)

7. React Native, absolute positioning horizontal centre. 用绝对定位实现水平居中的方法

    [方案](https://stackoverflow.com/questions/37317568/react-native-absolute-positioning-horizontal-centre)

8. 当 "Debug JS Remotely" 并且用 "iOS simulator" 时，realm添加数据后，listener不会实时返回新数据。真机不会有问题。而且，不调试时也没有问题。

    暂无解

9. (报错) Native module cannot be null.

    有可能你写了这样的import语句: import * as Alert from "react-native";

10. Cannot read property undefined of undefined

    [答案](https://github.com/react-community/react-navigation/issues/1919)

11. [debugger-ui 出错](http://bbs.reactnative.cn/topic/4038/debugger-ui-%E5%87%BA%E9%94%99/2)

12. (未解决)realm监听的问题，添加完数据，监听到是上一条的数据。真机上没有问题。issue看[realm github issue](https://github.com/realm/realm-js/issues/927)

13. [How to set canOverrideExistingModule=true](https://stackoverflow.com/questions/41846452/how-to-set-canoverrideexistingmodule-true)

14. realm-sync-cocoa文件在第一次运行时，下载不下来的问题 http 403，报错如下：
    ```C
    PhaseScriptExecution Download\ Core /Users/efeng/Library/Developer/Xcode/DerivedData/PomodoroApp-dmbwahuxokardrepbybbetfebqhf/Build/Intermediates.noindex/RealmJS.build/Debug-iphonesimulator/RealmJS.build/Script-F63FF2C51C12462600B3B8E0.sh
        cd /Users/efeng/workspace/Pomodoro/code/rn-pomodoro/node_modules/realm/src
        /bin/sh -c /Users/efeng/Library/Developer/Xcode/DerivedData/PomodoroApp-dmbwahuxokardrepbybbetfebqhf/Build/Intermediates.noindex/RealmJS.build/Debug-iphonesimulator/RealmJS.build/Script-F63FF2C51C12462600B3B8E0.sh

    Resolved requirements: { SYNC_SERVER_FOLDER: 'sync',
      SYNC_ARCHIVE: 'realm-sync-cocoa-2.1.7.tar.xz',
      SYNC_ARCHIVE_ROOT: 'core' }
    Target directory has a differing lockfile, overwriting.
    Error: Error downloading https://static.realm.io/downloads/sync/realm-sync-cocoa-2.1.7.tar.xz - received status 403 Forbidden
        at fetch.then (/Users/efeng/workspace/Pomodoro/code/rn-pomodoro/node_modules/realm/scripts/download-realm.js:67:19)
        at <anonymous>
        at process._tickCallback (internal/process/next_tick.js:188:7)
    Command /bin/sh failed with exit code 1
    ```
    因为这个错误里面有403的问题，应该是国内被墙的原因。后来在客户端、Terminal端都配置了VPN还是下载不下来，
    故此放弃了直接下载的方法。

    node ../scripts/download-realm.js ios --sync

    解决办法：
    ```
    1. 在上面的出错的信息中找到不能下载的链接：https://static.realm.io/downloads/sync/realm-sync-cocoa-2.1.7.tar.xz
    2. 用safari下载下来。
    3. cd ~/Downloads   // 默认safari下载的文件在Download目录
    4. xz -d realm-sync-cocoa-2.1.7.tar.xz  // 解压

    5. tar zxvf realm-sync-cocoa-2.1.7.tar // 解压
    6. 把core下面的所有文件都放在项目下的/node_modules/realm/vendor/realm-ios下面。注意版本号要一致。
    OR
    5. mv realm-sync-cocoa-2.1.7.tar ${TMPDIR}/_realm-sync-cocoa-2.1.7.tar  //  移动到这里来
    6. tar zxvf _realm-sync-cocoa-2.1.7.tar -C realm-sync-cocoa-2.1.7.tar // 解压到realm-sync-cocoa-2.1.7.tar这个目录，很重要！！！要带着tar后缀名
    6.1. 在上面的出错的信息中找到抛异常的位置，注释掉,成功后再还原回来。
        // if (response.status !== 200) {
        //     throw new Error(`Error downloading ${url} - received status ${response.status} ${response.statusText}`);
        // }

    7. 打开xCode -> clean -> run
    8. Good Luck
    ```
     灵感来源于：
     [1](https://github.com/realm/realm-js/issues/1223)
     [2](https://github.com/realm/realm-cocoa/issues/2713)

15. [使用 fastlane 发布 react-native APP / Shipping React Native apps with Fastlane](https://carloscuesta.me/blog/shipping-react-native-apps-with-fastlane/)

16.













