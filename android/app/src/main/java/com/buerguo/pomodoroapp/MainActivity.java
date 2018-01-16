package com.buerguo.pomodoroapp;

import android.os.Bundle;
import android.util.Log;

import com.facebook.react.ReactActivity;
import com.tencent.stat.MtaSDkException;
import com.tencent.stat.StatService;

import org.devio.rn.splashscreen.SplashScreen;

public class MainActivity extends ReactActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
//        SplashScreen.show(this);  // 有 bug
        super.onCreate(savedInstanceState);

        // androidManifest.xml指定本activity最先启动
        // 因此，MTA的初始化工作需要在本onCreate中进行
        // 在startStatService之前调用StatConfig配置类接口，使得MTA配置及时生
        String appkey = "amtaandroid0";
        // 初始化并启动MTA
        try {
            // 第三个参数必须为：com.tencent.stat.common.StatConstants.VERSION
            StatService.startStatService(this, appkey,
                    com.tencent.stat.common.StatConstants.VERSION);
            Log.d("MTA", "MTA初始化成功");
        } catch (MtaSDkException e) {
            // MTA初始化失败
            Log.d("MTA", "MTA初始化失败" + e);
        }

    }

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "PomodoroApp";
    }
}
