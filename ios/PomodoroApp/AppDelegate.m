/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"
#import <CodePush/CodePush.h>
#import "MTA.h"
#import "MTAConfig.h"
//#import <AppCenterReactNativeCrashes/AppCenterReactNativeCrashes.h>
//#import <AppCenterReactNativeAnalytics/AppCenterReactNativeAnalytics.h>
//#import <AppCenterReactNative/AppCenterReactNative.h>

#import "SplashScreen.h"  // here

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import "RCTPushNotificationManager.h"

#import <React/RCTLog.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    RCTSetLogThreshold(RCTLogLevelInfo);

  //    [AppCenterReactNative register];  // Initialize AppCenter
  //    [AppCenterReactNativeCrashes registerWithAutomaticProcessing];  // Initialize AppCenter crashes
  //    [AppCenterReactNativeAnalytics registerWithInitiallyEnabled:true];  // Initialize AppCenter analytics

    [MTA startWithAppkey:@"I99GVWC6RQ5Y"];
  
    NSURL *jsCodeLocation;
  
#ifdef DEBUG
    #ifdef DEBUG
        jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:@"index"];
    #else
        jsCodeLocation = [CodePush bundleURL];
    #endif
#else
    jsCodeLocation = [CodePush bundleURLForResource:@"index"];
#endif

    RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                        moduleName:@"PomodoroApp"
                                                 initialProperties:nil
                                                     launchOptions:launchOptions];
    rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

    self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
    UIViewController *rootViewController = [UIViewController new];
    rootViewController.view = rootView;
    self.window.rootViewController = rootViewController;
    [self.window makeKeyAndVisible];
  
    [SplashScreen show];  // here
    return YES;
}

// 开始打点 使用时长统计
- (void)applicationDidBecomeActive:(UIApplication *)application {
  [MTA trackActiveBegin];
}

// 结束打点
- (void)applicationWillResignActive:(UIApplication *)application {
  [MTA trackActiveEnd];
}

#pragma mark - Push Notification

// Required to register for notifications
- (void)application:(UIApplication *)application didRegisterUserNotificationSettings:(UIUserNotificationSettings *)notificationSettings {
    [RCTPushNotificationManager didRegisterUserNotificationSettings:notificationSettings];
}

// Required for the register event.
- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken {
    [RCTPushNotificationManager didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];
}

// Required for the notification event. You must call the completion handler after handling the remote notification.
- (void)   application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo
fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler {
    [RCTPushNotificationManager didReceiveRemoteNotification:userInfo fetchCompletionHandler:completionHandler];
}

// Required for the registrationError event.
- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error {
    [RCTPushNotificationManager didFailToRegisterForRemoteNotificationsWithError:error];
}

// Required for the localNotification event.
- (void)application:(UIApplication *)application didReceiveLocalNotification:(UILocalNotification *)notification {
    [RCTPushNotificationManager didReceiveLocalNotification:notification];
}


@end
