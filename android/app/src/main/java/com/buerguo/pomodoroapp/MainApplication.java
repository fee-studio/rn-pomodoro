package com.buerguo.pomodoroapp;

import android.app.Application;

import com.beefe.picker.PickerViewPackage;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.oblador.vectoricons.VectorIconsPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;

import org.devio.rn.splashscreen.SplashScreenReactPackage;

import java.util.Arrays;
import java.util.List;

import io.realm.react.RealmReactPackage;

//import com.microsoft.appcenter.reactnative.crashes.AppCenterReactNativeCrashesPackage;
//import com.microsoft.appcenter.reactnative.analytics.AppCenterReactNativeAnalyticsPackage;
//import com.microsoft.appcenter.reactnative.appcenter.AppCenterReactNativePackage;

public class MainApplication extends Application implements ReactApplication {

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

        @Override
        protected String getJSBundleFile() {
//  todo 暂时停用   return CodePush.getJSBundleFile();
            return "index.bundle";
        }
    

        // todo code-push下的这个有问题
        // 2. Override the getJSBundleFile method in order to let
        // the CodePush runtime determine where to get the JS
        // bundle location from on each app start
//        @Override
//        protected String getJSBundleFile() {
////            return CodePush.getJSBundleFile();
//            return "index.bundle";
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
//  todo 暂时停用                  new CodePush(getResources().getString(R.string.reactNativeCodePush_androidDeploymentKey), getApplicationContext(), BuildConfig.DEBUG),
                    new ReactNativePushNotificationPackage(),
                    new RealmReactPackage(),
                    new VectorIconsPackage(),
                    new SplashScreenReactPackage(),
                    new PickerViewPackage(),
                    new MtaPackage(),
                    new RNDeviceInfo(),
                    new RNGestureHandlerPackage()

            );
        }

        //* 离线打包需要的
        @Override
        protected String getJSMainModuleName() {
            return "index";
        }

        @Override
        protected String getBundleAssetName() {
            return "index.bundle";
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
    }
}
