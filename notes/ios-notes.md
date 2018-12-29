- Q: React库的管理方法

    React库不要用Pod去管理，会有一些文件找不到，用子项目的方式来添加到Libraries下面，记得把.a文件加到Build Phases -> Link Binary With Libraries下面。
   当然，也可以自动去Link， [参考这里](http://facebook.github.io/react-native/docs/linking-libraries-ios.html#content)

- **crash** -[UIConcreteLocalNotification setAlertTitle:]: unrecognized selector sent to instance 0x7fe5ec40fac0
    
    [react-native-push-notification](https://github.com/zo0r/react-native-push-notification)
    使用这个库的时候报的, setAlertTitle要在 iOS8.2以上才有, **导致先调整APP支持最低 iOS9**. 以后再优化.



- xxx has conflicting settings. xxx is automatically signed for development, but a conflicting code signing identity iPhone Distribution has been manually specified. Set the code signing identity value to "iPhone Developer" in the build settings editor, or switch to manual signing in the project editor.
  Code signing is required for product type 'Application' in SDK 'iOS 10.2'
  
  [参考: Go to Your project -> Build Settings -> Code Signing Identity and **put everything to iOs developer.**](https://stackoverflow.com/questions/40824727/i-get-conflicting-provisioning-settings-error-when-i-try-to-archive-to-submit-an)
  
- 
