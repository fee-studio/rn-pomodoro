/**
 * Created by efeng on 16/01/2018.
 */

package com.buerguo.pomodoroapp;

import android.content.Context;
import android.widget.Toast;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.tencent.stat.StatService;

public class MtaModule extends ReactContextBaseJavaModule {

    public MtaModule(ReactApplicationContext reactContext) {
        super(reactContext);

    }

    @Override
    public String getName() {
        return "RNMTA";
    }

    //  页面统计 - 使用下面的函数统计某个页面的访问情况
    @ReactMethod
    public void trackPageViewBegin(String pageName) {
        StatService.trackBeginPage(getReactApplicationContext(), pageName);
    }

    @ReactMethod
    public void trackPageViewEnd(String pageName) {
        StatService.trackEndPage(getReactApplicationContext(), pageName);
    }

}
