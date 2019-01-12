package com.buerguo.pomodoroapp;

import android.app.Application;
import android.content.Context;
import android.text.TextUtils;
import android.util.Log;

import com.BV.LinearGradient.LinearGradientPackage;
import com.beefe.picker.PickerViewPackage;
import com.buerguo.pomodoroapp.ShortcutBadge.ShortcutBadgePackage;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.oblador.vectoricons.VectorIconsPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.tencent.android.otherPush.StubAppUtils;
import com.tencent.android.tpush.XGIOperateCallback;
import com.tencent.android.tpush.XGPushConfig;
import com.tencent.android.tpush.XGPushManager;
import com.tencent.bugly.crashreport.CrashReport;

import org.devio.rn.splashscreen.SplashScreenReactPackage;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import io.realm.react.RealmReactPackage;

//import com.microsoft.appcenter.reactnative.crashes.AppCenterReactNativeCrashesPackage;
//import com.microsoft.appcenter.reactnative.analytics.AppCenterReactNativeAnalyticsPackage;
//import com.microsoft.appcenter.reactnative.appcenter.AppCenterReactNativePackage;

public class MainApplication extends Application implements ReactApplication {

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

        /**
         * VIP code-push下才需要复写getJSBundleFile()方法，不支持code-push的话不需要复写这个方法。
         */

        // todo code-push下的这个有问题
        // 2. Override the getJSBundleFile method in order to let
        // the CodePush runtime determine where to get the JS
        // bundle location from on each app start
//        @Override
//        protected String getJSBundleFile() {
////            return CodePush.getJSBundleFile();
//            return "index.jsbundle";
//        }

        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
//            new AppCenterReactNativeCrashesPackage(MainApplication.this, getResources().getString(R.string.appcenterCrashes_whenToSendCrashes)),
//            new AppCenterReactNativeAnalyticsPackage(MainApplication.this, getResources().getString(R.string.appcenterAnalytics_whenToEnableAnalytics)),
//            new AppCenterReactNativePackage(MainApplication.this),
//            new ReactNativeDocumentPicker(),
                    new MainReactPackage(),
                    new LinearGradientPackage(),
                    new ReactNativePushNotificationPackage(),
                    new RealmReactPackage(),
                    new VectorIconsPackage(),
                    new SplashScreenReactPackage(),
                    new PickerViewPackage(),
                    new RNDeviceInfo(),
                    new RNGestureHandlerPackage(),
                    new ShortcutBadgePackage()
//  todo 暂时停用                  new CodePush(getResources().getString(R.string.reactNativeCodePush_androidDeploymentKey), getApplicationContext(), BuildConfig.DEBUG),

            );
        }

        //* 离线打包需要的
        @Override
        protected String getJSMainModuleName() {
            return "index";
        }

        @Override
        protected String getBundleAssetName() {
            return "index.jsbundle";
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        SoLoader.init(this, /* native exopackage */ false);

        // 信鸽推送
        if (BuildConfig.DEBUG) {
            XGPushConfig.enableDebug(this, true);
            XGPushConfig.setHuaweiDebug(true);
        }
        XGPushConfig.enableOtherPush(getApplicationContext(), true);
        // 华为的app key在gradle里面配置的
        XGPushConfig.setMiPushAppId(getApplicationContext(), "APPID"); // todo...
        XGPushConfig.setMiPushAppKey(getApplicationContext(), "APPKEY");
        XGPushConfig.setMzPushAppId(this, "APPID");
        XGPushConfig.setMzPushAppKey(this, "APPKEY");

        XGPushManager.registerPush(this, new XGIOperateCallback() {
            @Override
            public void onSuccess(Object data, int flag) {
                // token在设备卸载重装的时候有可能会变
                Log.d("TPush", "注册成功，设备token为：" + data);
            }

            @Override
            public void onFail(Object data, int errCode, String msg) {
                Log.d("TPush", "注册失败，错误码：" + errCode + ",错误信息：" + msg);
            }
        });

        // bugly
        Context context = getApplicationContext();
        // 获取当前包名
        String packageName = context.getPackageName();
        // 获取当前进程名
        String processName = getProcessName(android.os.Process.myPid());
        CrashReport.UserStrategy strategy = new CrashReport.UserStrategy(this);
        strategy.setUploadProcess(processName == null || processName.equals(packageName));
        strategy.setAppChannel("temp_channel");  // 设置渠道 // todo ...
        strategy.setAppVersion("1.0.0");      // App的版本
        CrashReport.initCrashReport(getApplicationContext(), "0d5f2c89e9", false, strategy);
    }

    @Override
    protected void attachBaseContext(Context base) {
        super.attachBaseContext(base);

        StubAppUtils.attachBaseContext(base);
    }

    /**
     * 获取进程号对应的进程名
     *
     * @param pid 进程号
     * @return 进程名
     */
    private static String getProcessName(int pid) {
        BufferedReader reader = null;
        try {
            reader = new BufferedReader(new FileReader("/proc/" + pid + "/cmdline"));
            String processName = reader.readLine();
            if (!TextUtils.isEmpty(processName)) {
                processName = processName.trim();
            }
            return processName;
        } catch (Throwable throwable) {
            throwable.printStackTrace();
        } finally {
            try {
                if (reader != null) {
                    reader.close();
                }
            } catch (IOException exception) {
                exception.printStackTrace();
            }
        }
        return null;
    }
}
