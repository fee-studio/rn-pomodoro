/**
 * Created by efeng on 18/01/2018.
 */

package com.buerguo.pomodoroapp;

import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;

import com.facebook.react.ReactActivity;


public class SplashActivity extends ReactActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.launch_screen);

        Handler handler = new Handler();
        handler.postDelayed(new Runnable() {
            @Override
            public void run() {
                Intent intent = new Intent(SplashActivity.this, MainActivity.class);
                startActivity(intent);
                finish();
            }
        }, 3000);
    }

}
